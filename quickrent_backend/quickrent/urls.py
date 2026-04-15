from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/",          admin.site.urls),
    path("api/auth/",       include("users.urls")),
    path("api/items/",      include("items.urls")),
    path("api/rentals/",    include("rentals.urls")),
    path("api/payments/",   include("payments.urls")),
]