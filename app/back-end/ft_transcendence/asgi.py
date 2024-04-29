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
from dashboards.jwt_middleware_auth import JwtAthenticationMiddleware
from dashboards import routing as dashboard_routing
from game import routing as game_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ft_transcendence.settings')
django.setup()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': JwtAthenticationMiddleware(
            URLRouter
            (
                dashboard_routing.websocket_urlpatterns
                +
                game_routing.websocket_urlpatterns
            )
        )
})
