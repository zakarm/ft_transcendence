# chat/urls.py
from django.urls import path
from .views import MessagesView


urlpatterns = [
    path('messages', MessagesView.as_view(), name='messages'),
]
