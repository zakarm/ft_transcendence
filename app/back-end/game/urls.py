from django.urls import path
from .views import AllTournamentsView

urlpatterns = [
    path('tournaments', AllTournamentsView.as_view(), name='tournaments'),
]
