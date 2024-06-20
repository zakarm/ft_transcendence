# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from authentication.models import User
from dashboards.models import Friendship, Notification
from channels.layers import get_channel_layer
from .models import Messages
from django.conf import settings
import sys

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope["user"].is_authenticated:
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"chat_{self.room_name}"
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        chat_id = text_data_json["chat_id"]
        message = text_data_json["message"]
        sender = text_data_json["sender"]
        receiver = text_data_json["receiver"]
        timestamp = text_data_json["timestamp"]

        print(f"chat_id: {chat_id}", file = sys.stderr)
        print(f"message: {message}", file = sys.stderr)
        print(f"sender: {sender}", file = sys.stderr)
        print(f"receiver: {receiver}", file = sys.stderr)
        print(f"timestamp: {timestamp}", file = sys.stderr)

        receiver_obj = User.objects.get(username = receiver)
        sender_obj = User.objects.get(username = sender)

        # friendship = Friendship.objects.filter(user_from=sender_obj, user_to=receiver_obj).first()
        # if not friendship or not friendship.is_accepted or friendship.u_one_is_blocked_u_two:
        #     self.send(text_data=json.dumps({"error": "You are not friends with the receiver or you have blocked the receiver."}))
        #     return

        Messages.objects.create(
            user_one=sender_obj,
            user_two=receiver_obj,
            message_content=message,
            message_date=timestamp
        )

        notification = Notification.objects.create(
            user=receiver_obj,
            title = "New message !",
            message = f"from {sender_obj.username}: {message}",
            image_url=sender_obj.image_url,
             link=f"{settings.FRONTEND_HOST}/profile/{sender_obj.username}",
            is_chat_notif=True,
            action_by = sender_obj.username,
        )

        # channel_layer = get_channel_layer()
        async_to_sync(self.channel_layer.group_send)(
            f"user_{receiver_obj.id}",
            {
                "type": "send_notification",
                    "notification_id": notification.notification_id,
                    "count": Notification.objects.filter(user = receiver_obj).count(),
                    "is_chat_notif": notification.is_chat_notif,
                    "is_friend_notif": notification.is_friend_notif,
                    "is_tourn_notif": notification.is_tourn_notif,
                    "is_match_notif": notification.is_match_notif,
            },
        )

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message, "sender": sender, "receiver": receiver, "timestamp": timestamp, "chat_id": chat_id}
        )

    def chat_message(self, event):
        chat_id = event["chat_id"]
        message = event["message"]
        sender = event["sender"]
        receiver = event["receiver"]
        timestamp = event["timestamp"]
        self.send(text_data=json.dumps({"message": message, "sender": sender, "receiver": receiver, "timestamp": timestamp, "chat_id": chat_id}))
        