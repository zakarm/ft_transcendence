# dashboards/consumers.py
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import sys

class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self,):
        self.accept()
    
    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        print(f"Received message: {text_data}", file = sys.stderr)
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
        except json.JSONDecodeError:
            message = text_data

        await self.send(text_data=json.dumps({
            'message': message
        }))