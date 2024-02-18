from datetime import datetime
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import AppUser
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
import tensorflow as tf

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
    print("loaded pickle")
    # FILE_PATH = 'C:\\Users\\anish\\OneDrive\\Desktop\\Axxess2024\\backend\\api\\Axxess_model.pkl'
    # with open(FILE_PATH, 'rb') as file:
    #     model = pickle.load(file)
    model = tf.keras.models.load_model('/home/tushar/Hackathons/Axxess2024/backend/api/Axxess_Model.h5')
    features = [age, pack_history, mwt1, mwt2, fev1, fvc, had, sgrq, sex, smoking, diabetes, muscular, hypertension, atrial_fib, ihd]
    features = [np.array(features)]
    scaler = StandardScaler()
    features = scaler.fit_transform(features)
    prediction = model.predict(features)
    prediction = np.argmax(prediction, axis=1)
    return Response({"status": prediction}, status=status.HTTP_200_OK)