from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task(bind=True, max_retries=3)
def send_booking_email(self, rental_id):
    """Send HTML booking confirmation email to renter + plain text to owner."""
    try:
        from rentals.models import Rental
        rental = Rental.objects.select_related(
            "item", "item__owner", "renter", "payment"
        ).get(pk=rental_id)

        pmt        = getattr(rental, "payment", None)
        payment_id = pmt.razorpay_payment_id if pmt else "N/A"

        # ── Email to renter ─────────────────────────────────────────────────
        rows = [
            ("Item",         rental.item.title),
            ("Category",     rental.item.category),
            ("City",         rental.item.city),
            ("From",         rental.start_date.strftime("%d %B %Y")),
            ("To",           rental.end_date.strftime("%d %B %Y")),
            ("Duration",     f"{rental.days} day{'s' if rental.days > 1 else ''}"),
            ("Rent",         f"&#8377;{rental.rent_total}"),
            ("Platform Fee", f"&#8377;{rental.platform_fee}"),
            ("Deposit",      f"&#8377;{rental.deposit} (refundable)"),
        ]
        table_rows = "".join(
            f'<tr><td style="padding:8px 0;color:#888;font-size:14px;">{k}</td>'
            f'<td style="padding:8px 0;font-weight:600;font-size:14px;text-align:right;">{v}</td></tr>'
            for k, v in rows
        )

        html = f"""
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a1a;">
  <div style="background:#FF6B00;padding:28px 32px;border-radius:12px 12px 0 0;">
    <h1 style="color:#fff;font-size:26px;margin:0;letter-spacing:-1px;">QuickRent</h1>
    <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:13px;">TAP. RENT. MOVE. NOW.</p>
  </div>
  <div style="background:#fff;border:1px solid #f0f0f0;padding:32px;border-radius:0 0 12px 12px;">
    <h2 style="font-size:20px;margin:0 0 8px;">Booking Confirmed! &#10003;</h2>
    <p style="color:#555;margin:0 0 20px;">Hi <strong>{rental.renter.name}</strong>, your rental is confirmed.</p>
    <div style="background:#f7f7f7;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:1px;">Receipt ID</p>
      <p style="margin:0;font-size:22px;font-weight:bold;color:#FF6B00;">{rental.receipt_id}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      {table_rows}
      <tr style="border-top:2px solid #FF6B00;">
        <td style="padding:12px 0;font-weight:bold;font-size:16px;">Total Paid</td>
        <td style="padding:12px 0;font-weight:bold;font-size:16px;text-align:right;color:#FF6B00;">
          &#8377;{rental.grand_total}
        </td>
      </tr>
    </table>
    <div style="background:#fff5ee;border-radius:10px;padding:14px 16px;margin-top:20px;">
      <p style="margin:0;font-size:13px;color:#555;">
        <strong>Owner:</strong> {rental.item.owner.name} &#8212; {rental.item.owner.phone}<br/>
        <strong>Payment ID:</strong> {payment_id}
      </p>
    </div>
    <p style="color:#aaa;font-size:11px;margin-top:24px;text-align:center;">
      QuickRent &#8901; support@quickrent.in
    </p>
  </div>
</body>
</html>"""

        plain = (
            f"Booking Confirmed — {rental.receipt_id}\n\n"
            f"Hi {rental.renter.name},\n"
            f"Item: {rental.item.title}\n"
            f"From: {rental.start_date} To: {rental.end_date} ({rental.days} days)\n"
            f"Total: Rs.{rental.grand_total}\n"
            f"Payment ID: {payment_id}\n\n"
            f"Owner: {rental.item.owner.name} — {rental.item.owner.phone}\n\n"
            f"— QuickRent Team"
        )

        send_mail(
            subject        = f"Booking Confirmed — {rental.receipt_id} | QuickRent",
            message        = plain,
            from_email     = settings.DEFAULT_FROM_EMAIL,
            recipient_list  = [rental.renter.email],
            html_message   = html,
            fail_silently  = False,
        )

        # ── Notify owner ────────────────────────────────────────────────────
        send_mail(
            subject       = f"Your item '{rental.item.title}' was rented — {rental.receipt_id}",
            message       = (
                f"Hi {rental.item.owner.name},\n\n"
                f"Your item '{rental.item.title}' has been rented.\n"
                f"Renter: {rental.renter.name} ({rental.renter.phone})\n"
                f"Period: {rental.start_date} to {rental.end_date} ({rental.days} days)\n"
                f"Amount received: Rs.{rental.rent_total}\n\n"
                f"Receipt: {rental.receipt_id}\n\n— QuickRent"
            ),
            from_email    = settings.DEFAULT_FROM_EMAIL,
            recipient_list = [rental.item.owner.email],
            fail_silently  = True,
        )

    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)


@shared_task(bind=True, max_retries=3)
def send_booking_sms(self, rental_id):
    """Send SMS confirmation via MSG91 to renter and owner."""
    try:
        from rentals.models import Rental
        import urllib.request
        import urllib.parse

        rental   = Rental.objects.select_related("item", "item__owner", "renter").get(pk=rental_id)
        auth_key = getattr(settings, "MSG91_AUTH_KEY", "")

        if not auth_key:
            return  # MSG91 not configured — skip silently

        def send_sms(phone, message):
            if not phone or len(phone.strip()) != 10:
                return
            params = urllib.parse.urlencode({
                "authkey": auth_key,
                "mobiles": "91" + phone.strip(),
                "message": message,
                "sender":  "QKRENT",
                "route":   "4",
            }).encode("utf-8")
            req = urllib.request.Request(
                "https://api.msg91.com/api/sendhttp.php", data=params
            )
            urllib.request.urlopen(req, timeout=10)

        # SMS to renter
        send_sms(
            rental.renter.phone,
            (
                f"QuickRent: Booking confirmed! "
                f"{rental.item.title} from {rental.start_date} to {rental.end_date}. "
                f"Receipt: {rental.receipt_id}. Total: Rs.{rental.grand_total}."
            )
        )

        # SMS to owner
        send_sms(
            rental.item.owner.phone,
            (
                f"QuickRent: Your item '{rental.item.title}' was rented by "
                f"{rental.renter.name} ({rental.renter.phone}). "
                f"Period: {rental.start_date} to {rental.end_date}."
            )
        )

    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)