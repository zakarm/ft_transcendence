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

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ft_transcendence.settings')
django.setup()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JWTAuthMiddlewareStack( 
            URLRouter
            (
                dashboard_routing.websocket_urlpatterns
                +
                game_routing.websocket_urlpatterns
                +
                chat_routing.websocket_urlpatterns
            )
    )
})
