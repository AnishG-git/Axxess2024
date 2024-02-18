from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import AppUser

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
    atrialfib = data.get('atrialfib')
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
            atrialfib=atrialfib,
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

