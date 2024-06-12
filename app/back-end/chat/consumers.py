# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from authentication.models import User
from .models import Messages


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope["user"].is_authenticated:
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"chat_{self.room_name}"

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )

            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        chat_id = text_data_json["chat_id"]
        message = text_data_json["message"]
        user = text_data_json["user"]
        timestamp = text_data_json["timestamp"]

        # receiver = self.scope['user']
        # recipient = User.objects.get(username=user)
        # message = Messages.objects.create(
        #     user_one=receiver,
        #     user_two=recipient,
        #     message_content=message,
        #     message_date=timestamp
        # )

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message, "user": user, "timestamp": timestamp, "chat_id": chat_id}
        )

    # Receive message from room group
    def chat_message(self, event):
        chat_id = event["chat_id"]
        message = event["message"]
        user = event["user"]
        timestamp = event["timestamp"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message, "user": user, "timestamp": timestamp, "chat_id": chat_id}))
        