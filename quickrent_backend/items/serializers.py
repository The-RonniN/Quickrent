from rest_framework import serializers
from .models import Item, ItemImage, Wishlist


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ItemImage
        fields = ["id", "image_url", "order", "is_cover"]


class ItemSerializer(serializers.ModelSerializer):
    images     = ItemImageSerializer(many=True, read_only=True)
    owner_name = serializers.CharField(source="owner.name", read_only=True)
    owner_phone = serializers.CharField(source="owner.phone", read_only=True)
    owner_id   = serializers.IntegerField(source="owner.id", read_only=True)

    class Meta:
        model  = Item
        fields = [
            "id", "title", "category", "description",
            "price_per_day", "deposit", "city", "condition",
            "is_available", "rented_till", "rent_count", "rating",
            "available_from", "available_till",
            "owner_id", "owner_name", "owner_phone",
            "images", "created_at",
        ]
        read_only_fields = ["id", "owner_id", "owner_name", "owner_phone", "rent_count", "rating", "created_at", "images"]


class ItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Item
        fields = [
            "title", "category", "description",
            "price_per_day", "deposit", "city", "condition",
            "available_from", "available_till",
        ]

    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        return super().create(validated_data)


class WishlistSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model  = Wishlist
        fields = ["id", "item", "created_at"]