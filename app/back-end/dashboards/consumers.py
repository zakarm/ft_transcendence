import sys
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken
from .serializer import FriendsSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from authentication.models import User
from django.db.models import F, Q
from dashboards.models import Notification, Friendship
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync, sync_to_async

@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

@database_sync_to_async
def update_user_online(user_id):
    try:
        User.objects.filter(id=user_id).update(is_online = F('is_online') + 1)
    except User.DoesNotExist:
        return []

@database_sync_to_async
def update_user_offline(user_id):
    try:
        User.objects.filter(id=user_id).update(is_online = F('is_online') - 1)
    except User.DoesNotExist:
        return []

@database_sync_to_async
def get_friends(user):
    return Friendship.objects.filter(Q(user_from=user) | Q(user_to=user))

class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_authenticated:
            self.user = await get_user(self.scope["user"].id)
            await update_user_online(self.scope['user'].id)
            await self.accept()
            self.group_name = f'room_{self.scope["user"].id}'
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.notify_friends(self.scope["user"].id, True)
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        await update_user_offline(self.scope['user'].id)
        self.group_name = f'room_{self.scope["user"].id}'
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        await self.notify_friends(self.scope["user"].id, False)
    
    async def notify_friends(self, user_id, is_online):
        user = await get_user(self.scope["user"].id)
        friends = await get_friends(user)
        for friendship in friends:
            friend = friendship.user_to if friendship.user_from == self.user else friendship.user_from
            group_name = f'room_{friend.id}'
            await self.channel_layer.group_send(
                group_name,
                {
                    'type': 'send_users_online',
                    'id': self.user.id,
                    'username': self.user.username,
                    'is_online': is_online,
                    'image_url': self.user.image.url if self.user.image_url else ''
                }
            )
    
    async def send_notification(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'notification_id': event['notification_id'],
            'count': event['count']
        }))
    
    async def send_users_online(self, event):
        await self.send(text_data=json.dumps({
            'type': 'users_online',
            'id': event['id'],
            'username': event['username'],
            'is_online': event['is_online'],
            'image_url': event['image_url']
        }))
