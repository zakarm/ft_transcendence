from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import sys
from .room import RoomObject
from django.utils import timezone
from django.contrib.auth import get_user_model
import asyncio
import random

User = get_user_model()


def current_time():
    current_time = timezone.localtime(timezone.now())
    formatted_time = current_time.strftime("%H:%M:%S")
    return formatted_time


@database_sync_to_async
def get_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except User.DoesNotExist:
        return AnonymousUser()


class GameConsumer(AsyncWebsocketConsumer):
    Rooms_index = 0
    rooms = {}

    async def get_room(self):
        return self.rooms[self.room_name]

    # -----------------------> 1. broadcast_message <-----------------------
    async def broadcast_message(self, message):
        try:
            print(f"Broadcasting message: {message}", file=sys.stderr)
            await self.channel_layer.group_send(
                self.room_name, {"type": "message", "message": message}
            )
        except Exception as e:
            print(f"An error occurred in broadcast_message: {e}")

    async def message(self, event):
        try:
            print(f"Received message: {event['message']}", file=sys.stderr)
            message = event["message"]
            await self.send(
                text_data=json.dumps({"message": message, "time": current_time()})
            )
        except Exception as e:
            print(f"An error occurred in message: {e}")

    # -----------------------> 2. connect <-----------------------

    async def connect(self):
        try:
            print("-" * 50, file=sys.stderr)
            if self.scope["user"].is_authenticated:
                await self.accept()
                self.user = await get_user(user_id=self.scope["user"].id)
                self.room_name, self.room = await self.find_or_create_room(self.user)
                await self.channel_layer.group_add(self.room_name, self.channel_name)
                index = self.room.get_user_index(self.user)
                message = f"action: connection_ack, index: {index}, User: {self.user}, Room_name: {self.room_name}"
                await self.message({"message": message})
                if self.room.is_ready():
                    user1, user2 = self.room.get_original_users()
                    message = f"action: opponents, user1: {user1}, user2: {user2}"
                    await self.broadcast_message(message)
                    if self.room.is_started() == False:
                        asyncio.ensure_future(self.start_game())
            else:
                await self.close()
        except Exception as e:
            print(f"An error occurred in connect: {e}")

    async def start_game(self):
        try:
            i = 0
            await asyncio.sleep(5)
            await self.broadcast_message(f"action: load_game")
            await asyncio.sleep(5)
            await self.broadcast_message(f"action: start_game")
            await self.init_pos()
            while True:
                i += 1
                message = f"i = {i}"
                await self.broadcast_message(message)
                await asyncio.sleep(1)

        except Exception as e:
            print(f"An error occurred in connect: {e}")

    async def init_pos(self):
        room = await self.get_room()
        ball_position_z = random.uniform(-2.2, 2.2)
        ball_velocity_x = 0.05 * random.choice([-1, 1])
        ball_velocity_z = 0.05 * random.choice([-1, 1])
        room.set_ball_position(0, ball_position_z)
        room.set_ball_velocity(ball_velocity_x, ball_velocity_z)
        room.start_game()
        room.set_game_state("playing")
        return ball_position_z, ball_velocity_x, ball_velocity_z

    # -----------------------> 3. disconnect <-----------------------
    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard(self.room_name, self.channel_name)
        pass

    # -----------------------> 4. receive <-----------------------
    async def receive(self, text_data):
        print(f"Received message: {text_data}", file=sys.stderr)
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
        except json.JSONDecodeError:
            message = text_data
        await self.message({"message": message})

    # -----------------------> 5. find_or_create_room <-----------------------
    async def find_or_create_room(self, user_id):
        for room_name, room in self.rooms.items():
            if room.get_game_state() == True and room.is_user_joined(user_id):
                room.reconecting_user(self.channel_name, user_id)
                await self.message({"message": "action: reconected"})
                return room_name, room
            elif room.get_game_state() == False and not room.is_user_joined(user_id):
                room.add_user(self.channel_name, user_id)
                await self.message({"message": "action : joined"})
                return room_name, room
        self.Rooms_index += 1
        new_room_name = f"room_{self.Rooms_index}"
        new_room = RoomObject()
        new_room.add_user(self.channel_name, user_id)
        await self.message({"message": "action: created + joined"})
        self.rooms[new_room_name] = new_room
        return new_room_name, new_room
