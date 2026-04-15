from django.urls import path
from . import views

urlpatterns = [
    path("create-order/",            views.create_order,     name="create-order"),
    path("verify/",                  views.verify_payment,   name="verify-payment"),
    path("webhook/",                 views.razorpay_webhook, name="razorpay-webhook"),
    path("<int:rental_id>/receipt/", views.get_receipt,      name="get-receipt"),
]