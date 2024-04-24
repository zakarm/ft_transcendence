from django.urls import path, include, re_path
from .views import *

urlpatterns = [
   path('dashboard', MainDashboardView.as_view(), name='dashboard'),
   path('profile', ProfileView.as_view(), name='profile')
]