from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    receipt_id  = serializers.CharField(source="rental.receipt_id", read_only=True)
    item_title  = serializers.CharField(source="rental.item.title", read_only=True)
    renter_name = serializers.CharField(source="rental.renter.name", read_only=True)

    class Meta:
        model  = Payment
        fields = [
            "id", "receipt_id", "item_title", "renter_name",
            "razorpay_order_id", "razorpay_payment_id",
            "amount", "method", "status", "verified_at", "created_at",
        ]
        read_only_fields = fields


class CreateOrderSerializer(serializers.Serializer):
    rental_id = serializers.IntegerField()


class VerifyPaymentSerializer(serializers.Serializer):
    razorpay_order_id   = serializers.CharField()
    razorpay_payment_id = serializers.CharField()
    razorpay_signature  = serializers.CharField()