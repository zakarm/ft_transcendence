from django.urls import re_path
from . import consumers
from dashboards.jwt_middleware_auth import JwtAthenticationMiddleware

websocket_urlpatterns = [
    re_path(r'ws/data/$', JwtAthenticationMiddleware(consumers.GameConsumer.as_asgi())),
]
