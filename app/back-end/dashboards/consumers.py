import sys
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken

class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get the user and authentication data from the scope
        user = self.scope["user"]
        auth_headers = self.scope.get("headers", [])
        auth_header = None
        for header in auth_headers:
            if header[0].decode() == "authorization":
                auth_header = header[1].decode()
                break

        if user.is_authenticated:
            # User is authenticated
            print(f"Authenticated user: {user.username}", file=sys.stderr)
            self.accept()
        elif auth_header:
            # Try to authenticate the user with the provided token
            try:
                token = auth_header.split(" ")[1]
                access_token = AccessToken(token)
                user = access_token.payload["user_id"]
                print(f"Authenticated user: {user}", file=sys.stderr)
                self.accept()
            except Exception as e:
                print(f"Authentication error: {e}", file=sys.stderr)
                self.close()
        else:
            # Anonymous user
            print("Anonymous user", file=sys.stderr)
            self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        print(f"Received message: {text_data}", file=sys.stderr)
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
        except json.JSONDecodeError:
            message = text_data
        await self.send(text_data=json.dumps({'message': message}))
