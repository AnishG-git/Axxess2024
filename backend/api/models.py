from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)
    age = models.PositiveIntegerField(null=True, blank=True)
    pack_history = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=100, null=True, blank=True)


# Create your models here.
