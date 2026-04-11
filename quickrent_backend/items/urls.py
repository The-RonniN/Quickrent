from django.urls import path
from . import views

urlpatterns = [
    path("",                              views.item_list_create, name="item-list-create"),
    path("<int:pk>/",                     views.item_detail,      name="item-detail"),
    path("<int:pk>/images/",              views.upload_images,    name="upload-images"),
    path("<int:pk>/images/<int:img_pk>/", views.delete_image,     name="delete-image"),
    path("my/",                           views.my_items,         name="my-items"),
    path("<int:pk>/wishlist/",            views.toggle_wishlist,  name="toggle-wishlist"),
    path("wishlist/",                     views.my_wishlist,      name="my-wishlist"),
]