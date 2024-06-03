from django.urls import path
from .views import (TournamentsDataView,
                    AchievementsDataViews,
                    CreateTournament)

urlpatterns = [
    path('tournaments', TournamentsDataView.as_view(), name='tournaments'),
    path('achievements', AchievementsDataViews.as_view(), name='achievements'),
    path('achievements', AchievementsDataViews.as_view(), name='create-'),
]
