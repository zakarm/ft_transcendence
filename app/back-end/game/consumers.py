from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import json, sys 
from urllib.parse import parse_qs

class AsyncConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # query_string = parse_qs(self.scope['query_string'].decode())
        # token = query_string.get('token')
        # if not token:
        #     await self.close()
        # else:
        #     try:
        #         UntypedToken(token[0])
        #     except (InvalidToken, TokenError) as e:
        #         await self.close()
        #     else:
        await self.accept()

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
