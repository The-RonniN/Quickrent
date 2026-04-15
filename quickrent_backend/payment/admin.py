from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display    = ("rental", "razorpay_order_id", "amount", "method", "status", "verified_at", "created_at")
    list_filter     = ("status", "method")
    search_fields   = ("razorpay_order_id", "razorpay_payment_id", "rental__receipt_id")
    ordering        = ("-created_at",)
    readonly_fields = ("razorpay_order_id", "razorpay_payment_id",
                       "razorpay_signature", "verified_at", "created_at")