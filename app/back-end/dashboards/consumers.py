import sys
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken
from .serializer import FriendsSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from authentication.models import User
from django.db.models import F
@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

@database_sync_to_async
def get_friends(user_id):
    return FriendsSerializer(instance=User.objects.get(id=user_id)).data

@database_sync_to_async
def update_user_online(user_id):
    try:
        User.objects.filter(id=user_id).update(is_online = F('is_online') + 1)
    except User.DoesNotExist:
        pass

@database_sync_to_async
def update_user_offline(user_id):
    try:
        User.objects.filter(id=user_id).update(is_online = F('is_online') - 1)
    except User.DoesNotExist:
        pass

class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await update_user_online(self.scope['user'].id)
        await self.accept()

    async def disconnect(self, close_code):
        await update_user_offline(self.scope['user'].id)

    async def receive(self, text_data):
        user = self.scope['user']
        if user:
            try:
                text_data_json = json.loads(text_data)
                if text_data_json.get("action") == "get_friends":
                    data = await get_friends(user.id)
                    await self.send(text_data=json.dumps({
                        "friends": data
                    }))
                else:
                    await self.send(text_data=json.dumps({
                        "error": "Invalid action"
                    }))
            except json.JSONDecodeError:
                await self.send(text_data=json.dumps({
                    "error": "Invalid JSON data"
                }))
        else:
            await self.close()
