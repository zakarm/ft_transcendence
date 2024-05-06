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
        if self.scope["user"].is_authenticated:
            self.user = await get_user(self.scope["user"].id)
            await update_user_online(self.scope['user'].id)
            await self.accept()
            await  self.channel_layer.group_add("users", self.channel_name)
            await self.channel_layer.group_send(
                "users",
                {
                    "type": "user_status",
                    "id": self.user.id,
                    "user": self.user.username,
                    "is_online": True,
                }
            )
        else:
            await self.close()

    async def disconnect(self, close_code):
        await update_user_offline(self.scope['user'].id)
        await self.channel_layer.group_send(
            "users",
            {
                "type": "user_status",
                "id": self.user.id,
                "user": self.user.username,
                "is_online": False,
            },
        )
        await self.channel_layer.group_discard(f"users", self.channel_name)

    async def user_status(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_status",
            "id": event["id"],
            "user": event["user"],
            # "image_url": event["image_url"],
            "is_online": event["is_online"]
        }))

    async def receive(self, text_data):
        user = self.scope['user']
        if user:
            pass
        else:
            await self.close()