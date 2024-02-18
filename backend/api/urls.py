from django.urls import path
from .views import register, user_login, user_logout, predict, add_medicine, update_inventory, get_user_data

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('predict/', predict, name='predict'),
    path('add_medicine/', add_medicine, name='add_medicine'),
    path('update_inventory/', update_inventory, name='update_inventory'),
    path('get_user_data/', get_user_data, name='get_user_data')
]
