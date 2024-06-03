from django.urls import path
from .views import (TournamentsDataView,
                    AchievementsDataViews)

urlpatterns = [
    path('tournaments', TournamentsDataView.as_view(), name='tournaments'),
     path('achievements', AchievementsDataViews.as_view(), name='achievements'),
]
