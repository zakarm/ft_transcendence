from django.urls import path
from .views import MainDashboardView, ProfileView

urlpatterns = [
   path('dashboard', MainDashboardView.as_view(), name='dashboard'),
   path('profile', ProfileView.as_view(), name='profile')
]
