from rest_framework import serializers
from .models import Rental
from items.serializers import ItemSerializer


class RentalSerializer(serializers.ModelSerializer):
    item_title     = serializers.CharField(source="item.title",        read_only=True)
    item_category  = serializers.CharField(source="item.category",     read_only=True)
    item_city      = serializers.CharField(source="item.city",         read_only=True)
    item_price     = serializers.DecimalField(source="item.price_per_day", max_digits=10, decimal_places=2, read_only=True)
    renter_name    = serializers.CharField(source="renter.name",       read_only=True)
    renter_email   = serializers.CharField(source="renter.email",      read_only=True)
    renter_phone   = serializers.CharField(source="renter.phone",      read_only=True)

    class Meta:
        model  = Rental
        fields = [
            "id", "receipt_id", "status",
            "item", "item_title", "item_category", "item_city", "item_price",
            "renter", "renter_name", "renter_email", "renter_phone",
            "start_date", "end_date", "days",
            "rent_total", "platform_fee", "deposit", "grand_total",
            "message", "created_at",
        ]
        read_only_fields = ["id", "receipt_id", "renter", "created_at"]


class RentalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Rental
        fields = ["item", "start_date", "end_date", "message"]

    def validate(self, data):
        item = data["item"]
        if not item.is_available:
            raise serializers.ValidationError(f"This item is not available until {item.rented_till}.")
        if data["end_date"] <= data["start_date"]:
            raise serializers.ValidationError("End date must be after start date.")
        return data

    def create(self, validated_data):
        from decimal import Decimal
        item      = validated_data["item"]
        start     = validated_data["start_date"]
        end       = validated_data["end_date"]
        days      = (end - start).days
        rent_total  = Decimal(str(item.price_per_day)) * days
        platform_fee = (rent_total * Decimal("0.02")).quantize(Decimal("0.01"))
        grand_total  = rent_total + platform_fee + Decimal(str(item.deposit))

        rental = Rental.objects.create(
            item         = item,
            renter       = self.context["request"].user,
            start_date   = start,
            end_date     = end,
            days         = days,
            rent_total   = rent_total,
            platform_fee = platform_fee,
            deposit      = item.deposit,
            grand_total  = grand_total,
            message      = validated_data.get("message", ""),
            status       = "pending",
        )
        return rental