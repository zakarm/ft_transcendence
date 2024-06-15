import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from django.contrib.auth.models import AnonymousUser
from django.db.models import F, Q

from authentication.models import User
from dashboards.models import Friendship


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

@database_sync_to_async
def update_user_status(user_id, online):
    if online:
        return User.objects.filter(id=user_id).update(is_online=F('is_online') + 1)
    else:
        user = User.objects.get(id=user_id)
        if user.is_online > 0:
            return User.objects.filter(id=user_id).update(is_online=F('is_online') - 1)
        return None

@database_sync_to_async
def get_friends(user):
    return list(Friendship.objects.filter(Q(user_from=user) | Q(user_to=user)).select_related('user_from', 'user_to'))


class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_authenticated:
            self.user = await get_user(self.scope["user"].id)
            await self.accept()
            
            self.group_name = f'user_{self.user.id}'
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            
            await self.update_user_online_status(True)
        else:
            await self.close()

    async def disconnect(self, close_code):
        if self.scope["user"].is_authenticated:
            await self.update_user_online_status(False)
            
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def update_user_online_status(self, is_online):
        if is_online:
            await update_user_status(self.user.id, True)
            await self.notify_friends(True)
        else:
            await update_user_status(self.user.id, False)
            await self.notify_friends(False)

    async def notify_friends(self, is_online):
        friends = await get_friends(self.user)
        for friendship in friends:
            friend = friendship.user_to if friendship.user_from == self.user else friendship.user_from
            group_name = f'user_{friend.id}'
            await self.channel_layer.group_send(
                group_name,
                {
                    'type': 'user_status',
                    'id': self.user.id,
                    'username': self.user.username,
                    'is_online': is_online,
                    'image_url': self.user.image_url or ''
                }
            )

    async def user_status(self, event):
        await self.send(text_data=json.dumps({
            'type': 'user_status',
            'id': event['id'],
            'username': event['username'],
            'is_online': event['is_online'],
            'image_url': event['image_url']
        }))

    async def send_notification(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'notification_id': event['notification_id'],
            'count': event['count']
        }))
