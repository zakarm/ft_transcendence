"""
ASGI config for ft_transcendence project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from dashboards import routing as dashboard_routing
from chat import routing as chat_routing
from game import routing as game_routing
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack
from django.urls import re_path
from channels.generic.websocket import AsyncWebsocketConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()


class DefaultConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.close()


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddlewareStack(
            URLRouter(
                dashboard_routing.websocket_urlpatterns
                + game_routing.websocket_urlpatterns
                + chat_routing.websocket_urlpatterns
                + [re_path(r"^.*$", DefaultConsumer.as_asgi())]
            )
        ),
    }
)
