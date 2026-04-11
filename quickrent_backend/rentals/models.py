from django.db import models
from django.conf import settings


class Rental(models.Model):
    STATUS_CHOICES = [
        ("pending",   "Pending"),
        ("active",    "Active"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    item        = models.ForeignKey("items.Item",             on_delete=models.PROTECT, related_name="rentals")
    renter      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name="rentals")
    start_date  = models.DateField()
    end_date    = models.DateField()
    days        = models.IntegerField()
    rent_total  = models.DecimalField(max_digits=10, decimal_places=2)
    platform_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deposit     = models.DecimalField(max_digits=10, decimal_places=2)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    receipt_id  = models.CharField(max_length=20, unique=True)
    message     = models.TextField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.receipt_id} — {self.renter.name} rents {self.item.title}"

    def save(self, *args, **kwargs):
        if not self.receipt_id:
            import time
            self.receipt_id = "QR" + str(int(time.time()))[-8:]
        super().save(*args, **kwargs)