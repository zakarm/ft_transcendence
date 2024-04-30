from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from channels.auth import AuthMiddlewareStack
from jwt import decode
from django.conf import settings


User = get_user_model()

@database_sync_to_async
def get_user(validated_token):
    try:
        user = get_user_model().objects.get(id=validated_token["user_id"])
        return user
    except User.DoesNotExist:
        return AnonymousUser()

class JwtAthenticationMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner
    
    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        if b'authorization' in headers:
            access, token_key = headers[b'authorization'].decode().split()
            if access == "Bearer":
                decode_data = decode(token_key, settings.SECRET_KEY, algorithms=["HS256"])
                scope['user'] = await get_user(validated_token = decode_data)
        return await super().__call__(scope, receive, send)
