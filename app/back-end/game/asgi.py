# import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter
from game.routing import websocket_urlpatterns


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": websocket_urlpatterns,
})
