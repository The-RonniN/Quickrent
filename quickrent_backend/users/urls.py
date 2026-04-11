from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("register/",    views.register,    name="register"),
    path("login/",       views.login,       name="login"),
    path("logout/",      views.logout,      name="logout"),
    path("profile/",     views.profile,     name="profile"),
    path("switch-role/", views.switch_role, name="switch_role"),
    path("refresh/",     TokenRefreshView.as_view(), name="token_refresh"),
]