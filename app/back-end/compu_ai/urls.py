from django.urls import path
from .views import (StatisticsView)

urlpatterns = [
   path('statistics', StatisticsView.as_view(), name='statistics'),
]
