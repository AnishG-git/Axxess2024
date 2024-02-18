from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)
    dob = models.DateField(null=True, blank=True)
    pack_history = models.IntegerField(null=True, blank=True)
    sex = models.CharField(max_length=100, null=True, blank=True)
    diabetes = models.IntegerField(null=True, blank=True)
    muscular = models.IntegerField(null=True, blank=True)
    hypertension = models.IntegerField(null=True, blank=True)
    atrial_fib = models.IntegerField(null=True, blank=True)
    ihd = models.IntegerField(null=True, blank=True)
    daily_scores = models.ManyToManyField('DailyScore', related_name='patient', blank=True)
    medicines = models.ManyToManyField('Medicine', related_name='patient', blank=True)

class DailyScore(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    score = models.IntegerField()
    date = models.DateField(auto_now_add=True)

class Medicine(models.Model):
    medicine_name = models.CharField(max_length=100)
    count = models.IntegerField(blank=True, null=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)

# Create your models here.
