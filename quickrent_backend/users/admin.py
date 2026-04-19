from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    list_display    = ("email", "name", "role", "phone", "city", "is_active", "joined_at")
    list_filter     = ("role", "is_active", "is_staff")
    search_fields   = ("email", "name", "phone")
    ordering        = ("-joined_at",)
    readonly_fields = ("joined_at",)

    fieldsets = (
        (None,          {"fields": ("email", "password")}),
        ("Personal",    {"fields": ("name", "phone", "city", "avatar_url", "google_id")}),
        ("Role",        {"fields": ("role",)}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Dates",       {"fields": ("joined_at",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields":  ("email", "name", "password1", "password2", "role"),
        }),
    )