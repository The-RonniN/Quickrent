from django.urls import path
from . import views

urlpatterns = [
    path("",                  views.create_rental,     name="create-rental"),
    path("my/",               views.my_rentals,        name="my-rentals"),
    path("received/",         views.received_requests, name="received-requests"),
    path("<int:pk>/",         views.rental_detail,     name="rental-detail"),
    path("<int:pk>/status/",  views.update_status,     name="update-status"),
]