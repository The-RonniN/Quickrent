import hmac
import hashlib
import razorpay
from django.conf import settings
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from rentals.models import Rental
from .models import Payment
from .serializers import CreateOrderSerializer, VerifyPaymentSerializer, PaymentSerializer
from notifications.tasks import send_booking_email, send_booking_sms

# Razorpay client — KEY_SECRET stays on server, never sent to browser
rzp = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


# ── Step 1: React calls this → gets order_id back ─────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    ser = CreateOrderSerializer(data=request.data)
    if not ser.is_valid():
        return Response(ser.errors, status=400)

    try:
        rental = Rental.objects.get(pk=ser.validated_data["rental_id"])
    except Rental.DoesNotExist:
        return Response({"error": "Rental not found."}, status=404)

    if rental.renter != request.user:
        return Response({"error": "Not your rental."}, status=403)

    if hasattr(rental, "payment") and rental.payment.status == "paid":
        return Response({"error": "Already paid."}, status=400)

    # Create order on Razorpay servers (secret key never leaves Django)
    rzp_order = rzp.order.create({
        "amount":   int(rental.grand_total * 100),  # paise
        "currency": "INR",
        "receipt":  rental.receipt_id,
        "notes": {
            "rental_id": str(rental.id),
            "item":      rental.item.title,
        }
    })

    # Save order_id to database with pending status
    Payment.objects.update_or_create(
        rental=rental,
        defaults={
            "razorpay_order_id": rzp_order["id"],
            "amount":            rental.grand_total,
            "status":            "pending",
        }
    )

    # Return only public data to React — secret key NOT included
    return Response({
        "order_id":   rzp_order["id"],
        "amount":     int(rental.grand_total * 100),
        "currency":   "INR",
        "key_id":     settings.RAZORPAY_KEY_ID,    # public key only
        "receipt_id": rental.receipt_id,
        "rental_id":  rental.id,
    })


# ── Step 2: React calls this after Razorpay popup succeeds ────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    ser = VerifyPaymentSerializer(data=request.data)
    if not ser.is_valid():
        return Response(ser.errors, status=400)

    order_id   = ser.validated_data["razorpay_order_id"]
    payment_id = ser.validated_data["razorpay_payment_id"]
    signature  = ser.validated_data["razorpay_signature"]

    # Verify HMAC-SHA256 signature
    # Razorpay signs: order_id + "|" + payment_id with your secret key
    key      = settings.RAZORPAY_KEY_SECRET.encode("utf-8")
    message  = f"{order_id}|{payment_id}".encode("utf-8")
    expected = hmac.new(key, message, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, signature):
        return Response({"error": "Payment verification failed. Signature mismatch."}, status=400)

    # Signature valid — find payment record
    try:
        payment = Payment.objects.select_related("rental__item", "rental__renter").get(
            razorpay_order_id=order_id
        )
    except Payment.DoesNotExist:
        return Response({"error": "Payment record not found."}, status=404)

    if payment.rental.renter != request.user:
        return Response({"error": "Not authorised."}, status=403)

    # Mark payment as paid
    payment.razorpay_payment_id = payment_id
    payment.razorpay_signature  = signature
    payment.status              = "paid"
    payment.verified_at         = timezone.now()
    payment.save()

    # Mark rental as active
    rental        = payment.rental
    rental.status = "active"
    rental.save(update_fields=["status"])

    # Mark item unavailable until end_date
    item              = rental.item
    item.is_available = False
    item.rented_till  = rental.end_date
    item.rent_count   = item.rent_count + 1
    item.save(update_fields=["is_available", "rented_till", "rent_count"])

    # Send email + SMS in background via Celery
    send_booking_email.delay(rental.id)
    send_booking_sms.delay(rental.id)

    return Response({
        "message":   "Payment verified. Booking confirmed!",
        "receipt_id": rental.receipt_id,
        "status":    "paid",
        "rental": {
            "id":          rental.id,
            "receipt_id":  rental.receipt_id,
            "item_title":  item.title,
            "start_date":  str(rental.start_date),
            "end_date":    str(rental.end_date),
            "days":        rental.days,
            "grand_total": str(rental.grand_total),
        }
    })


# ── Webhook: Razorpay calls this directly as backup ───────────────────────────
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def razorpay_webhook(request):
    sig    = request.headers.get("X-Razorpay-Signature", "")
    body   = request.body
    key    = settings.RAZORPAY_KEY_SECRET.encode("utf-8")
    expected = hmac.new(key, body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, sig):
        return Response({"error": "Invalid webhook signature."}, status=400)

    event = request.data.get("event", "")

    if event == "payment.captured":
        entity   = request.data.get("payload", {}).get("payment", {}).get("entity", {})
        order_id = entity.get("order_id", "")
        try:
            payment = Payment.objects.get(razorpay_order_id=order_id)
            if payment.status != "paid":
                payment.razorpay_payment_id = entity.get("id", "")
                payment.method              = entity.get("method", "")
                payment.status              = "paid"
                payment.verified_at         = timezone.now()
                payment.save()
                rental        = payment.rental
                rental.status = "active"
                rental.save(update_fields=["status"])
                rental.item.is_available = False
                rental.item.rented_till  = rental.end_date
                rental.item.save(update_fields=["is_available", "rented_till"])
        except Payment.DoesNotExist:
            pass

    return Response({"status": "ok"})


# ── Get receipt data for a rental ─────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_receipt(request, rental_id):
    try:
        rental = Rental.objects.select_related(
            "item", "renter", "payment"
        ).get(pk=rental_id)
    except Rental.DoesNotExist:
        return Response({"error": "Not found."}, status=404)

    if rental.renter != request.user and rental.item.owner != request.user:
        return Response({"error": "Not authorised."}, status=403)

    pmt = getattr(rental, "payment", None)
    return Response({
        "receipt_id":     rental.receipt_id,
        "item_title":     rental.item.title,
        "item_category":  rental.item.category,
        "item_city":      rental.item.city,
        "item_condition": rental.item.condition,
        "item_price":     str(rental.item.price_per_day),
        "renter_name":    rental.renter.name,
        "renter_email":   rental.renter.email,
        "renter_phone":   rental.renter.phone,
        "start_date":     str(rental.start_date),
        "end_date":       str(rental.end_date),
        "days":           rental.days,
        "rent_total":     str(rental.rent_total),
        "platform_fee":   str(rental.platform_fee),
        "deposit":        str(rental.deposit),
        "grand_total":    str(rental.grand_total),
        "payment_id":     pmt.razorpay_payment_id if pmt else "N/A",
        "payment_method": pmt.method if pmt else "N/A",
        "payment_status": pmt.status if pmt else "pending",
        "booked_on":      rental.created_at.strftime("%d %B %Y, %I:%M %p"),
    })