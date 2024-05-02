from django.contrib.auth.models import AnonymousUser
from django.conf import settings
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import UntypedToken
from urllib.parse import parse_qs
from jwt import decode
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import sys
from .room import RoomObject

from django.contrib.auth import get_user_model

User = get_user_model()


@database_sync_to_async
def get_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return AnonymousUser()


async def validate_token(token):
    try:
        UntypedToken(token)
        decode_data = decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decode_data["user_id"]
    except Exception as e:
        print(f"Token is invalid: {e}", file=sys.stderr)
        return None


class GameConsumer(AsyncWebsocketConsumer):
    Rooms_index = 0
    rooms = {}

    def get_room(self):
        return self.rooms[self.room_name]

    # -----------------------> 1. broadcast_message <-----------------------
    async def broadcast_message(self, message):
        try:
            print(f"Broadcasting message: {message}", file=sys.stderr)
            await self.channel_layer.group_send(
                self.room_name, {"type": "bmessage", "message": message}
            )
        except Exception as e:
            print(f"An error occurred in broadcast_message: {e}")

    async def bmessage(self, event):
        try:
            print(f"Received message: {event['message']}", file=sys.stderr)
            message = event["message"]
            await self.send(text_data=json.dumps({"message": message}))
        except Exception as e:
            print(f"An error occurred in bmessage: {e}")

    # -----------------------> 2. broadcast_message <-----------------------

    async def connect(self):
        try:
            query_string = parse_qs(self.scope["query_string"].decode())
            token = query_string.get("token")
            if not token:
                await self.close()
            else:
                user_id = await validate_token(token[0])
                if user_id is None:
                    await self.close()
                else:
                    await self.accept()
                    print("-" * 50, file=sys.stderr)
                    self.scope["user"] = await get_user(user_id=user_id)
                    print(f"->User: {self.scope['user']}", file=sys.stderr)
                    self.room_name, self.room = await self.find_or_create_room(
                        self.scope["user"]
                    )
                    print(f"->Room: {self.room_name}", file=sys.stderr)
                    await self.channel_layer.group_add(
                        self.room_name, self.channel_name
                    )
                    index = self.room.get_user_index(self.scope["user"])
                    user1, user2 = self.room.get_original_users()
                    message = (
                        f"index:{index}, User1:->[ {user1} ]<-, User2:->[{user2}]<-"
                    )
                    await self.send(text_data=json.dumps({"message": message}))
                    if self.room.is_ready():
                        self.room.start_game()
                        print(f"Room {self.room_name} is full", file=sys.stderr)
                        await self.broadcast_message("Game started")
        except Exception as e:
            print(f"An error occurred in connect: {e}")

    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard(self.room_name, self.channel_name)
        pass

    async def receive(self, text_data):
        print(f"Received message: {text_data}", file=sys.stderr)
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
        except json.JSONDecodeError:
            message = text_data

        await self.send(text_data=json.dumps({"message": message}))

    async def find_or_create_room(self, user_id):
        for room_name, room in self.rooms.items():
            if room.get_game_state() == True and room.is_user_joined(user_id):
                room.reconecting_user(self.channel_name, user_id)
                await self.send(text_data=json.dumps({"message": "reconected"}))
                return room_name, room
            elif room.get_game_state() == False and not room.is_user_joined(user_id):
                room.add_user(self.channel_name, user_id)
                await self.send(text_data=json.dumps({"message": "joined"}))
                return room_name, room
        self.Rooms_index += 1
        new_room_name = f"room_{self.Rooms_index}"
        new_room = RoomObject()
        new_room.add_user(self.channel_name, user_id)
        await self.send(text_data=json.dumps({"message": "created + joined"}))
        self.rooms[new_room_name] = new_room
        return new_room_name, new_room
