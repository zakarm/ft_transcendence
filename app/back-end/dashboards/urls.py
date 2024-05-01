from django.urls import path
from .views import (MainDashboardView,
                    ProfileView,
                    ProfileIdView,
                    FriendsView)

urlpatterns = [
   path('dashboard', MainDashboardView.as_view(), name='dashboard'),
   path('profile', ProfileView.as_view(), name='profile'),
   path('profile/<int:id>', ProfileIdView.as_view(), name='profile_with_id'),
   path('friends', FriendsView.as_view(), name='friends')
]
