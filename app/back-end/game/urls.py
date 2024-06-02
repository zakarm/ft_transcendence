from django.urls import path
from .views import TournamentsDataView

urlpatterns = [
    path('tournaments', TournamentsDataView.as_view(), name='tournaments'),
]
