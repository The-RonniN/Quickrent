import cloudinary.uploader
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from .models import Item, ItemImage, Wishlist
from .serializers import ItemSerializer, ItemCreateSerializer, ItemImageSerializer, WishlistSerializer


# ── List + Create ─────────────────────────────────────────────────────────────
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticatedOrReadOnly])
def item_list_create(request):
    if request.method == "GET":
        qs = Item.objects.all().select_related("owner").prefetch_related("images")

        # Search
        q = request.GET.get("q", "")
        if q:
            qs = qs.filter(title__icontains=q) | qs.filter(city__icontains=q)

        # Filters
        category = request.GET.get("category")
        city     = request.GET.get("city")
        if category: qs = qs.filter(category=category)
        if city:     qs = qs.filter(city__icontains=city)

        # Sort
        sort = request.GET.get("sort", "newest")
        if sort == "price-low":  qs = qs.order_by("price_per_day")
        elif sort == "price-high": qs = qs.order_by("-price_per_day")
        elif sort == "rating":   qs = qs.order_by("-rating")
        else:                    qs = qs.order_by("-created_at")

        ser = ItemSerializer(qs, many=True)
        return Response(ser.data)

    # POST — create item (lister only)
    if request.user.role != "lister":
        return Response({"error": "Only listers can create items."}, status=403)

    ser = ItemCreateSerializer(data=request.data, context={"request": request})
    if ser.is_valid():
        item = ser.save()
        return Response(ItemSerializer(item).data, status=201)
    return Response(ser.errors, status=400)


# ── Retrieve + Update + Delete ────────────────────────────────────────────────
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response({"error": "Item not found."}, status=404)

    if request.method == "GET":
        return Response(ItemSerializer(item).data)

    if item.owner != request.user:
        return Response({"error": "Not your item."}, status=403)

    if request.method == "PUT":
        ser = ItemCreateSerializer(item, data=request.data, partial=True, context={"request": request})
        if ser.is_valid():
            ser.save()
            return Response(ItemSerializer(item).data)
        return Response(ser.errors, status=400)

    if request.method == "DELETE":
        item.delete()
        return Response({"message": "Item deleted."})


# ── Upload Images (up to 4) to Cloudinary ─────────────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_images(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response({"error": "Item not found."}, status=404)

    if item.owner != request.user:
        return Response({"error": "Not your item."}, status=403)

    current_count = item.images.count()
    files = request.FILES.getlist("images")

    if not files:
        return Response({"error": "No images provided."}, status=400)

    if current_count + len(files) > 4:
        return Response({"error": f"Max 4 images. You have {current_count}, trying to add {len(files)}."}, status=400)

    created = []
    for i, file in enumerate(files):
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file,
            folder="quickrent/items",
            transformation=[{"width": 800, "height": 600, "crop": "fill", "quality": "auto"}]
        )
        order    = current_count + i + 1
        is_cover = (order == 1)
        img = ItemImage.objects.create(
            item      = item,
            image_url = result["secure_url"],
            order     = order,
            is_cover  = is_cover,
        )
        created.append(img)

    return Response(ItemImageSerializer(created, many=True).data, status=201)


# ── Delete a single image ──────────────────────────────────────────────────────
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_image(request, pk, img_pk):
    try:
        item = Item.objects.get(pk=pk)
        img  = ItemImage.objects.get(pk=img_pk, item=item)
    except (Item.DoesNotExist, ItemImage.DoesNotExist):
        return Response({"error": "Not found."}, status=404)

    if item.owner != request.user:
        return Response({"error": "Not your item."}, status=403)

    img.delete()
    # Re-order remaining images
    for idx, remaining in enumerate(item.images.order_by("order"), 1):
        remaining.order    = idx
        remaining.is_cover = (idx == 1)
        remaining.save(update_fields=["order", "is_cover"])

    return Response({"message": "Image deleted."})


# ── My listings ───────────────────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_items(request):
    items = Item.objects.filter(owner=request.user).prefetch_related("images")
    return Response(ItemSerializer(items, many=True).data)


# ── Wishlist toggle ───────────────────────────────────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_wishlist(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response({"error": "Item not found."}, status=404)

    obj, created = Wishlist.objects.get_or_create(user=request.user, item=item)
    if not created:
        obj.delete()
        return Response({"wishlisted": False})
    return Response({"wishlisted": True}, status=201)


# ── Get my wishlist ───────────────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_wishlist(request):
    wl = Wishlist.objects.filter(user=request.user).select_related("item")
    return Response(WishlistSerializer(wl, many=True).data)