from django.urls import re_path
from . import consumers , consumerai

websocket_urlpatterns = [
    re_path(r"ws/data/$", consumers.GameConsumer.as_asgi()),
    re_path(r"ws/data/ai/$", consumerai.GameConsumerAi.as_asgi()),
]
