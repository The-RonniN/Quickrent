from django.db import models


class Payment(models.Model):
    STATUS_CHOICES = [
        ("pending",  "Pending"),
        ("paid",     "Paid"),
        ("failed",   "Failed"),
        ("refunded", "Refunded"),
    ]

    rental              = models.OneToOneField(
        "rentals.Rental", on_delete=models.CASCADE, related_name="payment"
    )
    razorpay_order_id   = models.CharField(max_length=100, unique=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    razorpay_signature  = models.CharField(max_length=300, blank=True)
    amount              = models.DecimalField(max_digits=10, decimal_places=2)
    method              = models.CharField(max_length=50, blank=True)  # upi/card/netbanking/wallet
    status              = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    verified_at         = models.DateTimeField(null=True, blank=True)
    created_at          = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rental.receipt_id} — ₹{self.amount} — {self.status}"