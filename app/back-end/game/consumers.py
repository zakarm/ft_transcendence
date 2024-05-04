# Standard library imports
import asyncio
import json
import random
import sys

# Third-party imports
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone

# Local application/library specific imports
from .room import RoomObject

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

    # -----------------------> 0. get_room <-----------------------
    def get_room(self):
        return self.rooms[self.room_name]

    # -----------------------> 1. broadcast_message <-----------------------
    async def broadcast_message(self, message):
        try:
            await self.channel_layer.group_send(
                self.room_name, {"type": "message", "message": message}
            )
        except Exception as e:
            print(f"An error occurred in broadcast_message: {e}")

    # -----------------------> 2. message <-----------------------
    async def message(self, event):
        try:
            message = event["message"]
            await self.send(
                text_data=json.dumps({"message": message, "time": current_time()})
            )
        except Exception as e:
            print(f"An error occurred in message: {e}")

    # -----------------------> 3. connect <-----------------------
    async def connect(self):
        try:
            if self.scope["user"].is_authenticated:
                await self.accept()
                print(f"Connected to {self.channel_name}", file=sys.stderr)
                self.user = await get_user(user_id=self.scope["user"].id)
                print(f"User: {self.user}", file=sys.stderr)
                self.room_name, self.room = await self.find_or_create_room(self.user)
                print(f"Room_name: {self.room_name}", file=sys.stderr)
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

    # -----------------------> 4. disconnect <-----------------------
    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard(self.room_name, self.channel_name)
        pass

    # -----------------------> 5. receive <-----------------------
    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
            print(f"Received message: {message}")
        except Exception as e:
            print(f"An error occurred in receive: {e}")

    # -----------------------> 6. start_game <-----------------------
    async def start_game(self):
        try:
            await asyncio.sleep(5)
            await self.broadcast_message(f"action: load_game")
            await asyncio.sleep(5)
            await self.broadcast_message(f"action: start_game")
            await self.init_pos()
            room = self.get_room()
            while True:
                room.ball_update()
                room.ball_intersect()
                room.paddle_update()
                if room.is_paddle_move(1):
                    message = f"action: paddle_update, paddle: 1, paddle_position_z : {room.paddle1_position['z']}"
                    await self.broadcast_message(message)
                if room.is_paddle_move(2):
                    message = f"action: paddle_update, paddle: 2, paddle_position_z : {room.paddle2_position['z']}"
                    await self.broadcast_message(message)
                if room.is_out_of_bounds():
                    room.update_score()
                    message = f"action: score, user1score: {room.getScores()['user1']}, user2score: {room.getScores()['user2']}"
                    await self.broadcast_message(message)
                    if room.is_winner():
                        room.end_game()
                        winner, loser = room.get_winner()
                        message = f"action: end_game, winner: {winner}, loser: {loser}"
                        await self.broadcast_message(message)
                        break
                    room.paddle_reset()
                    ball_pos_z, ball_velo_x, ball_velo_z = await self.reset()
                    message = f"action: reset, ball_position_x: {0}, ball_position_z: {ball_pos_z}, ball_velocity_x: {ball_velo_x}, ball_velocity_z: {ball_velo_z}"
                    await self.broadcast_message(message)
                else:
                    ball_position, ball_velocity = room.get_updated_ball()
                    message = f"action: update,  ball_position_x: {ball_position['x']}, ball_position_z: {ball_position['z']}, ball_velocity_x: {ball_velocity['velocity_x']}, ball_velocity_z: {ball_velocity['velocity_x']}"
                    await self.broadcast_message(message)
                await asyncio.sleep(1 / 60)
        except Exception as e:
            print(f"An error occurred in connect: {e}")

    # -----------------------> 7. init_pos <-----------------------
    async def init_pos(self):
        try:
            room = self.get_room()
            ball_position_z = random.uniform(-2.2, 2.2)
            ball_velocity_x = 0.05 * random.choice([-1, 1])
            ball_velocity_z = 0.05 * random.choice([-1, 1])
            room.set_ball_position(0, ball_position_z)
            room.set_ball_velocity(ball_velocity_x, ball_velocity_z)
            room.start_game()
            return ball_position_z, ball_velocity_x, ball_velocity_z
        except Exception as e:
            print(f"An error occurred in init_pos: {e}")

    # -----------------------> 8. reset <-----------------------
    async def reset(self):
        try:
            room = self.get_room()
            ball_position_z = random.uniform(-2.2, 2.2)
            if room.ball_position["x"] < 0:
                ball_velocity_x = 0.05
            else:
                ball_velocity_x = -0.05
            ball_velocity_z = 0.05 * random.choice([-1, 1])
            room.set_ball_position(0, ball_position_z)
            room.set_ball_velocity(ball_velocity_x, ball_velocity_z)
            return ball_position_z, ball_velocity_x, ball_velocity_z
        except Exception as e:
            print(f"An error occurred in reset: {e}")

    # -----------------------> 5. find_or_create_room <-----------------------
    async def find_or_create_room(self, user_id):
        try:
            for room_name, room in self.rooms.items():
                if room.is_started() == True and room.is_user_joined(user_id):
                    room.reconecting_user(self.channel_name, user_id)
                    await self.message({"message": "action: reconected"})
                    return room_name, room
                elif room.is_started() == False and not room.is_user_joined(user_id):
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
        except Exception as e:
            print(f"An error occurred in find_or_create_room: {e}")
