from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Rental
from .serializers import RentalSerializer, RentalCreateSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_rental(request):
    ser = RentalCreateSerializer(data=request.data, context={"request": request})
    if ser.is_valid():
        rental = ser.save()
        return Response(RentalSerializer(rental).data, status=201)
    return Response(ser.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_rentals(request):
    rentals = Rental.objects.filter(renter=request.user).select_related("item", "renter")
    return Response(RentalSerializer(rentals, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def received_requests(request):
    # Rentals on items owned by this user
    rentals = Rental.objects.filter(item__owner=request.user).select_related("item", "renter")
    return Response(RentalSerializer(rentals, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def rental_detail(request, pk):
    try:
        rental = Rental.objects.get(pk=pk)
    except Rental.DoesNotExist:
        return Response({"error": "Not found."}, status=404)
    if rental.renter != request.user and rental.item.owner != request.user:
        return Response({"error": "Not authorised."}, status=403)
    return Response(RentalSerializer(rental).data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_status(request, pk):
    try:
        rental = Rental.objects.get(pk=pk)
    except Rental.DoesNotExist:
        return Response({"error": "Not found."}, status=404)
    if rental.item.owner != request.user:
        return Response({"error": "Only the item owner can update status."}, status=403)
    new_status = request.data.get("status")
    if new_status not in ["active", "completed", "cancelled"]:
        return Response({"error": "Invalid status."}, status=400)
    rental.status = new_status
    rental.save(update_fields=["status"])
    return Response(RentalSerializer(rental).data)