from datetime import datetime, timedelta
import math
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import AppUser, DailyScore, Medicine
from .serializers import AppUserSerializer, DailyScoreSerializer
import numpy as np
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from collections import OrderedDict
from twilio.rest import Client

account_sid = 'AC29c683297d307f8725400e2ef0ddc326'
auth_token = '7f3415e4c21c190efba48321bd78e7df'
client = Client(account_sid, auth_token)


# signup
@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone_number = data.get('phone_number')
    dob = data.get('dob')
    sex = data.get('sex')
    pack_history = data.get('pack_history')
    diabetes = data.get('diabetes')
    muscular = data.get('muscular')
    hypertension = data.get('hypertension')
    atrial_fib = data.get('atrial_fib')
    ihd = data.get('ihd')
    print(dob)
    if AppUser.objects.filter(email=email).exists():
        return Response({"status": "user already exists, email is not unique"}, status=status.HTTP_409_CONFLICT)
    if AppUser.objects.filter(phone_number=phone_number).exists():
        return Response({"status": "user already exists, phone number is not unique"}, status=status.HTTP_409_CONFLICT)
    try:
        AppUser.objects.create_user(
            username=email,
            email=email, 
            password=password, 
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            dob=dob,
            pack_history=pack_history,
            sex=sex,
            diabetes=diabetes,
            muscular=muscular,
            hypertension=hypertension,
            atrial_fib=atrial_fib,
            ihd=ihd
        )
        return Response({"status": "User created successfully!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# login
@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(f'email: {email}, password: {password}')
    user = authenticate(request, username=email, password=password)
    if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    print(f"{request.user.username} logging out")
    request.auth.delete()  # Invalidates the user's session
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

import random
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict(request):
    data = request.data
    user = request.user
    dob = user.dob
    sex = 1
    pack_history = user.pack_history
    diabetes = user.diabetes
    smoking = user.smoking
    muscular = user.muscular
    hypertension = user.hypertension
    atrial_fib = user.atrial_fib
    ihd = user.ihd
    mwt1 = data.get('mwt1')
    mwt2 = data.get('mwt2')
    fev1 = data.get('fev1')
    fvc = data.get('fvc')
    had = data.get('had')
    sgrq = data.get('sgrq')
    today = datetime.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    FILE_PATH = 'C:\\Users\\anish\\OneDrive\\Desktop\\Axxess2024\\backend\\api\\Axxess_model.pkl'
    model = tf.keras.models.load_model('C:\\Users\\anish\\OneDrive\\Desktop\\Axxess2024\\backend\\api\\Axxess_Model.h5')
    features = [age, pack_history, mwt1, mwt2, fev1, fvc, had, sgrq, sex, smoking, diabetes, muscular, hypertension, atrial_fib, ihd]
    features = [np.array(features)]
    scaler = StandardScaler()
    features = scaler.fit_transform(features)
    prediction = model.predict(features)
    print(prediction)
    prediction = np.argmax(prediction, axis=1)[0]*(mwt1 + mwt2)/20
    print(prediction)
    DailyScore.objects.create(user=user, score=prediction, date=datetime.today())
    # score_serializer = DailyScoreSerializer(user.daily_scores)
    daily_scores = DailyScore.objects.filter(user=user)
    score_serializer = DailyScoreSerializer(daily_scores, many=True)
    score_data = score_serializer.data
    print("\n\n\n\n\n")
    print(score_data)
    date = datetime.today()
    future_score = math.floor(prediction + (mwt1 + mwt2)/20)
    for i in range(0, 3):
        x_factor = random.randint(1, 4)
        op = random.randint(0, 1)
        date += timedelta(1)
        final_date = date.strftime('%Y-%m-%d')
        if op == 1:
            future_score += x_factor
        else:
            future_score -= x_factor
        score_data.append(OrderedDict([("score", future_score), ("date", final_date)]))
    return Response({"status": score_data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_medicine(request):
    user = request.user
    data = request.data
    medicine = data.get('medicine')
    count = data.get('count')
    dosage = data.get('dosage')
    try:
        Medicine.objects.create(user=request.user, medicine_name=medicine, count=count, dosage=dosage)
        return Response({"status": "Medicine added successfully!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_inventory(request):
    user = request.user
    data = request.data
    medicine = data.get('medicine')
    count = data.get('count')
    medicine_obj = Medicine.objects.filter(medicine_name=medicine)
    if medicine_obj.exists():
        try: 
            if int(count) == 0:
                print("count is 0 bro")
                medicine_obj.update(count=0)
                message = client.messages.create(
                    from_='+18444712403',
                    body=f'Dear {user.first_name}, you have run out of {medicine}, be sure to restock - The Pulmo Team :)',
                    to='+18777804236'
                )
                return Response({"status": "Inventory is empty!"}, status=status.HTTP_200_OK)
            medicine_obj.update(count=count)
            return Response({"status": "Inventory updated!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    serializer = AppUserSerializer(user)
    return Response(serializer.data)