from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user  = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [("renter", "Renter"), ("lister", "Lister")]

    email      = models.EmailField(unique=True)
    name       = models.CharField(max_length=150)
    phone      = models.CharField(max_length=15, blank=True)
    city       = models.CharField(max_length=100, blank=True)
    role       = models.CharField(max_length=10, choices=ROLE_CHOICES, default="renter")
    avatar_url = models.URLField(max_length=500, blank=True)
    google_id  = models.CharField(max_length=200, blank=True)
    is_active  = models.BooleanField(default=True)
    is_staff   = models.BooleanField(default=False)
    joined_at  = models.DateTimeField(auto_now_add=True)

    objects  = CustomUserManager()
    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return f"{self.name} <{self.email}>"