from django.db import models

class User(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name