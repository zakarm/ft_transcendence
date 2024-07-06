from django.urls import re_path
from . import consumers, Tournament_consumers

websocket_urlpatterns = [
    re_path(r"ws/pingpong/private/$", consumers.PrivateGameConsumer.as_asgi()),
    re_path(r"ws/pingpong/$", consumers.GameConsumer.as_asgi()),
    re_path(
        r"ws/pingpong/tournament/(?P<tournament_id>\d+)/$",
        Tournament_consumers.TournamnetGameConsumer.as_asgi(),
    ),
]
