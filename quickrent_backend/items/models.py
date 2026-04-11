from django.db import models
from django.conf import settings


class Item(models.Model):
    CATEGORY_CHOICES = [
        ("Electronics",          "Electronics"),
        ("Vehicles",             "Vehicles"),
        ("Party & Events",       "Party & Events"),
        ("Sports & Outdoor",     "Sports & Outdoor"),
        ("Tools & Equipment",    "Tools & Equipment"),
        ("Furniture & Appliances", "Furniture & Appliances"),
    ]
    CONDITION_CHOICES = [
        ("Brand New", "Brand New"),
        ("Excellent", "Excellent"),
        ("Good",      "Good"),
        ("Fair",      "Fair"),
    ]

    owner        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="items")
    title        = models.CharField(max_length=200)
    category     = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description  = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    deposit      = models.DecimalField(max_digits=10, decimal_places=2)
    city         = models.CharField(max_length=100)
    condition    = models.CharField(max_length=20, choices=CONDITION_CHOICES, default="Good")
    is_available = models.BooleanField(default=True)
    rented_till  = models.DateField(null=True, blank=True)
    rent_count   = models.IntegerField(default=0)
    rating       = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    available_from = models.DateField(null=True, blank=True)
    available_till = models.DateField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} — {self.owner.name}"


class ItemImage(models.Model):
    item        = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="images")
    image       = models.ImageField(upload_to="items/")   # Cloudinary handles the actual upload
    image_url   = models.URLField(max_length=500, blank=True)  # Cloudinary public URL stored here
    order       = models.IntegerField(default=1)           # 1–4
    is_cover    = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Image {self.order} for {self.item.title}"


class Wishlist(models.Model):
    user       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wishlist")
    item       = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="wishlisted_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "item")

    def __str__(self):
        return f"{self.user.name} → {self.item.title}"