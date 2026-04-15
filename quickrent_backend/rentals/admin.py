from django.contrib import admin
from .models import Rental


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display    = ("receipt_id", "item", "renter", "start_date", "end_date", "grand_total", "status", "created_at")
    list_filter     = ("status",)
    search_fields   = ("receipt_id", "renter__name", "renter__email", "item__title")
    ordering        = ("-created_at",)
    readonly_fields = ("receipt_id", "days", "rent_total", "platform_fee", "grand_total", "created_at")