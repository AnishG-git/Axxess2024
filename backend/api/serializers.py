from rest_framework import serializers
from .models import AppUser, DailyScore, Medicine

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number', 'dob', 'pack_history', 'sex']

class DailyScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyScore
        fields = ['score', 'date']

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'medicine_name', 'count']