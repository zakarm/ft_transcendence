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

async def send_online_notification(self, user_id):
    await self.channel_layer.group_send(
        "online_users",
        {
            "type": "send_online_notification",
            "user_id": user_id,
        }
    )

async def send_online_notification_to_socket(self, event):
    user_id = event["user_id"]
    user = await get_user(user_id)
    await self.send(text_data=json.dumps({
        "type": "online_notification",
        "user": {
            "id": user.id,
            "username": user.username,
            "image_url": user.image_url,
            # Add any other relevant user data
        }
    }))

async def send_online_notification(self, event):
    await self.send_online_notification_to_socket(event)

class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        auth_headers = self.scope.get("headers", [])
        auth_header = None
        for header in auth_headers:
            if header[0].decode() == "access":
                auth_header = header[1].decode()
                break
        if auth_header:
            try:
                access_token = AccessToken(auth_header)
                user_id = access_token.payload["user_id"]
                print(user_id, file = sys.stderr)
                self.user = get_user(user_id)
                self.user_id = user_id
                await self.accept()
                await update_user_online(self.user_id)
                await self.send_online_notification(self.user_id)  # Send online notification
                await self.channel_layer.group_add(
                    "online_users",
                    self.channel_name
                )
            except Exception as e:
                print(f"Authentication error: {e}", file=sys.stderr)
                await self.close()
        else:
            print("Anonymous user", file=sys.stderr)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
        "online_users",
        self.channel_name
        )
        await update_user_offline(self.user_id)

    async def receive(self, text_data):
        if self.user:
            try:
                text_data_json = json.loads(text_data)
                if text_data_json.get("action") == "get_friends":
                    data = await get_friends(self.user_id)
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
