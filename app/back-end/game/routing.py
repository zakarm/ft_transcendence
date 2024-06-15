from django.urls import re_path
from . import consumers , consumerai, Tournament_consumers

websocket_urlpatterns = [
    re_path(r"ws/data/$", consumers.GameConsumer.as_asgi()),
    re_path(
        r"ws/pingpong/tournament/(?P<tournament_id>\d+)/$",
        Tournament_consumers.TournamnetGameConsumer.as_asgi(),
    ),
    re_path(r"ws/data/ai/$", consumerai.GameConsumerAi.as_asgi()),
]
