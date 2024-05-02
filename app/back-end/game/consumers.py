from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import UntypedToken
from urllib.parse import parse_qs
from jwt import decode
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import sys

from django.contrib.auth import get_user_model

User = get_user_model()


@database_sync_to_async
def get_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return AnonymousUser()


async def validate_token(token):
    try:
        UntypedToken(token)
        decode_data = decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decode_data["user_id"]
    except Exception as e:
        print(f"Token is invalid: {e}", file=sys.stderr)
        return None


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        query_string = parse_qs(self.scope["query_string"].decode())
        token = query_string.get("token")
        if not token:
            await self.close()
        else:
            user_id = await validate_token(token[0])
            if user_id is None:
                await self.close()
            else:
                self.scope["user"] = await get_user(user_id=user_id)
                print("-" * 50, file=sys.stderr)
                print(f"User: {self.scope['user']}", file=sys.stderr)
                await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        print(f"Received message: {text_data}", file=sys.stderr)
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
        except json.JSONDecodeError:
            message = text_data

        await self.send(text_data=json.dumps({"message": message}))
