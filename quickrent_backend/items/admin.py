from django.contrib import admin
from .models import Item, ItemImage, Wishlist


class ItemImageInline(admin.TabularInline):
    model  = ItemImage
    extra  = 0
    fields = ("image_url", "order", "is_cover")
    readonly_fields = ("uploaded_at",)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display    = ("title", "category", "owner", "city", "price_per_day", "is_available", "rent_count", "created_at")
    list_filter     = ("category", "is_available", "condition", "city")
    search_fields   = ("title", "owner__name", "city")
    ordering        = ("-created_at",)
    inlines         = [ItemImageInline]
    readonly_fields = ("rent_count", "created_at")


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ("user", "item", "created_at")
    readonly_fields = ("created_at",)