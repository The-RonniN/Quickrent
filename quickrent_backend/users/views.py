from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer, UserProfileSerializer


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    ser = RegisterSerializer(data=request.data)
    if ser.is_valid():
        user   = ser.save()
        tokens = get_tokens(user)
        return Response({
            "user":   UserProfileSerializer(user).data,
            "tokens": tokens,
        }, status=status.HTTP_201_CREATED)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    ser = LoginSerializer(data=request.data)
    if ser.is_valid():
        user   = ser.validated_data["user"]
        tokens = get_tokens(user)
        return Response({
            "user":   UserProfileSerializer(user).data,
            "tokens": tokens,
        })
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method == "GET":
        return Response(UserProfileSerializer(request.user).data)

    ser = UserProfileSerializer(request.user, data=request.data, partial=True)
    if ser.is_valid():
        ser.save()
        return Response(ser.data)
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def switch_role(request):
    new_role = request.data.get("role")
    if new_role not in ["renter", "lister"]:
        return Response({"error": "Role must be renter or lister."}, status=400)
    request.user.role = new_role
    request.user.save(update_fields=["role"])
    return Response(UserProfileSerializer(request.user).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        token = RefreshToken(request.data.get("refresh"))
        token.blacklist()
        return Response({"message": "Logged out successfully."})
    except TokenError:
        return Response({"error": "Invalid token."}, status=400)