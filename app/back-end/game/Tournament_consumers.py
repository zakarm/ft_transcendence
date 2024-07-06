# Standard library imports
import asyncio
import json
import random
import sys
from datetime import datetime

# Third-party imports
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from django.db import transaction

# Local application/library specific imports
from .Tournament import Tournament
from .models import Match, GameTable, Tournaments as TournamentModel, Tournamentsmatches

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
    except Exception as e:
        print(f"An error occurred in get_user: {e}", file=sys.stderr)


@database_sync_to_async
def get_tournament_(tournament_id):
    try:
        tournament = TournamentModel.objects.get(tournament_id=tournament_id)
        return tournament
    except TournamentModel.DoesNotExist:
        return None
    except Exception as e:
        print(f"An error occurred in get_tournament_: {e}", file=sys.stderr)


@database_sync_to_async
def set_user_rank():
    try:
        users = User.objects.all().order_by("-level")
        for index, user in enumerate(users):
            user.rank = index + 1
            user.save()
    except User.DoesNotExist:
        return AnonymousUser()
    except Exception as e:
        print(f"An error occurred in set_user_rank: {e}", file=sys.stderr)


@database_sync_to_async
def set_user_xp(data):
    try:
        user = User.objects.get(id=data["id"])
        user.level = data["level"]
        user.score = data["score"]
        user.xp = data["xp"]
        user.save()
    except User.DoesNotExist:
        return AnonymousUser()
    except Exception as e:
        print(f"An error occurred in set_user_xp: {e}", file=sys.stderr)


@database_sync_to_async
def set_tournament_end_date(tournament_id):
    try:
        tournament = TournamentModel.objects.get(tournament_id=tournament_id)
        tournament.tournament_end = datetime.now()
        tournament.save()
    except TournamentModel.DoesNotExist:
        pass
    except Exception as e:
        print(f"An error occurred in set_tournament_end_date: {e}", file=sys.stderr)


@database_sync_to_async
def increment_participants(tournament_id):
    try:
        tournament = TournamentModel.objects.get(tournament_id=tournament_id)
        if tournament.participantsJoined == 8:
            return
        tournament.participantsJoined += 1
        tournament.save()
    except TournamentModel.DoesNotExist:
        pass
    except Exception as e:
        print(f"An error occurred in increment_participants: {e}", file=sys.stderr)


@database_sync_to_async
def set_Tournamentsmatches(tournament, match, round):
    try:
        Tournamentsmatches.objects.create(
            tournament=tournament,
            match=match,
            tournament_round=round,
        )
    except Exception as e:
        print(f"An error occurred in set_Tournamentsmatches: {e}", file=sys.stderr)


def delete_tournament(tournament_id):
    try:
        with transaction.atomic():
            tournament = TournamentModel.objects.get(tournament_id=tournament_id)
            t_matches = Tournamentsmatches.objects.filter(tournament=tournament)
            match_ids = t_matches.values_list("match_id", flat=True)
            t_matches.delete()
            Match.objects.filter(match_id__in=match_ids).delete()
            tournament.delete()
    except TournamentModel.DoesNotExist:
        pass
    except Exception as e:
        print(f"An error occurred in delete_tournament: {e}", file=sys.stderr)


@database_sync_to_async
def get_game_data(user):
    try:
        game_data = GameTable.objects.get(user=user.id)
        return game_data
    except GameTable.DoesNotExist:
        game_data = GameTable.objects.create(
            user=user,
            table_color="#161625",
            ball_color="#ffffff",
            paddle_color="#ff4655",
            game_difficulty=1,
            table_position="6,8,0",
        )
        return game_data
    except Exception as e:
        print(f"An error occurred in get_game_data: {e}", file=sys.stderr)


@database_sync_to_async
def add_match(
    user_one,
    user_two,
    score_user_one,
    score_user_two,
    match_start,
    match_end,
    tackle_user_one,
    tackle_user_two,
):
    try:
        match = Match.objects.create(
            user_one=user_one,
            user_two=user_two,
            score_user_one=score_user_one,
            score_user_two=score_user_two,
            match_start=match_start,
            match_end=match_end,
            tackle_user_one=tackle_user_one,
            tackle_user_two=tackle_user_two,
        )
        return match
    except Exception as e:
        print(f"An error occurred in add_match: {e}", file=sys.stderr)


Room_index = 0
Rooms = {}


def get_room(room_name):
    global Rooms
    try:
        return Rooms[room_name]
    except KeyError:
        print(f"Room {room_name} does not exist", file=sys.stderr)
    except Exception as e:
        print(f"An error occurred in get_room: {e}", file=sys.stderr)


def delete_room(room_name):
    global Rooms
    try:
        del Rooms[room_name]
    except KeyError:
        print(f"Room {room_name} does not exist", file=sys.stderr)
    except Exception as e:
        print(f"An error occurred in delete_room: {e}", file=sys.stderr)


def add_room(room_name, room):
    global Rooms
    try:
        Rooms[room_name] = room
    except Exception as e:
        print(f"An error occurred in add_room: {e}", file=sys.stderr)


def get_rooms_items():
    try:
        return Rooms.items()
    except Exception as e:
        print(f"An error occurred in iterate_rooms: {e}", file=sys.stderr)


def get_room_index():
    global Room_index
    try:
        return Room_index
    except Exception as e:
        print(f"An error occurred in get_room_index: {e}", file=sys.stderr)


def increment_room_index():
    global Room_index
    try:
        Room_index += 1
    except Exception as e:
        print(f"An error occurred in increment_room_index: {e}", file=sys.stderr)


class TournamnetGameConsumer(AsyncWebsocketConsumer):
    # -----------------------> 0. send_direct_message <-----------------------
    async def send_winner_message(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            winner = room.get_winner()
            await self.channel_layer.group_send(
                match_id, {"type": "w_message", "winner": winner}
            )
        except Exception as e:
            print(f"An error occurred in send_direct_message: {e}", file=sys.stderr)

    async def w_message(self, event):
        try:
            status = "winner" if event["winner"] == self.user.email else "loser"
            message = {
                "message": {
                    "action": "end_game",
                    "status": status,
                    "winner": event["winner"],
                },
                "time": current_time(),
            }
            await self.send(text_data=json.dumps(message))
        except Exception as e:
            print(f"An error occurred in message: {e}", file=sys.stderr)

    # -----------------------> 1. broadcast_message <-----------------------
    async def tournamnet_broadcast_message(self, message):
        try:
            data = {"type": "message", "message": message}
            await self.channel_layer.group_send(self.t_name, data)
        except Exception as e:
            print(f"An error occurred in broadcast_message: {e}", file=sys.stderr)

    async def broadcast_message(self, message, match_id):
        try:
            data = {"type": "message", "message": message}
            await self.channel_layer.group_send(match_id, data)
        except Exception as e:
            print(f"An error occurred in broadcast_message: {e}", file=sys.stderr)

    async def send_message_to_channel(self, channel_name, message):
        try:
            data = {"type": "message", "message": message}
            await self.channel_layer.send(channel_name, data)
        except Exception as e:
            print(f"An error occurred in send_message_to_channel: {e}", file=sys.stderr)

    # -----------------------> 2. message <-----------------------
    async def message(self, event):
        try:
            _message = event["message"]
            message = {"message": _message, "time": current_time()}
            await self.send(text_data=json.dumps(message))
        except Exception as e:
            print(f"An error occurred in message: {e}", file=sys.stderr)

    # -----------------------> 3. connect <-----------------------

    async def find_tournamnet(self, user):
        try:
            player = {
                "data": {
                    "name": user.username,
                    "photoUrl": user.image_url,
                    "score": 0,
                    "status": True,
                },
                "channel": self.channel_name,
                "email": user.email,
                "object": user,
                "match_id": None,
            }
            rooms_items = get_rooms_items()
            if self.watch == "true":
                return f"tournament_{self.tournament_id}", None
            for tournament_name, tournament in rooms_items:
                if tournament_name == f"tournament_{self.tournament_id}":
                    if tournament.is_joined(user.email):
                        tournament.reconect_player(player)
                        match_id = tournament.get_match_id(user.email)
                        await self.channel_layer.group_add(match_id, self.channel_name)
                        return tournament_name, tournament
                    elif not tournament.is_ready():
                        if not tournament.is_joined(user.email):
                            tournament.add_player(player)
                            await increment_participants(self.tournament_id)
                            return tournament_name, tournament
                        else:
                            return None, None
                    else:
                        return None, None
            name_ = self.tournament_obj.tournament_name
            difficulty_ = self.tournament_obj.game_difficulty
            new_tournament = Tournament(self.tournament_id, name_, difficulty_)
            new_tournament_name = f"tournament_{self.tournament_id}"
            add_room(new_tournament_name, new_tournament)
            new_tournament.add_player(player)
            await increment_participants(self.tournament_id)
            return new_tournament_name, new_tournament
        except Exception as e:
            print(f"An error occurred in find_tournamnet: {e}", file=sys.stderr)

    async def connect(self):
        try:
            if self.scope["user"].is_authenticated:
                # -------------------------------------------------------
                await self.accept()
                self.tournament = None
                self.tournament_id = self.scope["url_route"]["kwargs"]["tournament_id"]
                self.tournament_obj = await get_tournament_(self.tournament_id)
                if self.tournament_obj is None or self.tournament_obj.tournament_end:
                    if self.tournament_obj is None:
                        message = {"action": "info", "info": "Tournament not found"}
                    else:
                        message = {"action": "info", "info": "Tournament has ended"}
                    await self.send_message_to_channel(self.channel_name, message)
                    return
                query_string = self.scope["query_string"].decode()
                params = dict(param.split("=") for param in query_string.split("&"))
                self.watch = params.get("watch")
                self.user = await get_user(user_id=self.scope["user"].id)
                self.t_name, self.tournament = await self.find_tournamnet(self.user)
                self.spect = self.t_name + "spectator"
                if self.watch == "true":
                    await self.channel_layer.group_add(self.spect, self.channel_name)
                    return
                if self.tournament is None:
                    message = {"action": "info", "message": "Tournament is full"}
                    await self.send_message_to_channel(self.channel_name, message)
                    return
                await self.channel_layer.group_add(self.t_name, self.channel_name)
                if self.tournament.is_ready() and self.tournament.started == False:
                    asyncio.ensure_future(self.tournament_manager())
                    asyncio.ensure_future(self.watch_tournament())
            else:
                await self.close()
        except Exception as e:
            print(f"An error occurred in connect: {e}", file=sys.stderr)

    # -----------------------> 4. disconnect <-----------------------
    async def disconnect(self, close_code):
        try:
            if self.tournament is None:
                return
            match_id = self.tournament.get_match_id(self.user.email)
            room = self.tournament.get_room_game(match_id)
            room.set_reconect(self.user.email)
            if room.get_user2_stat():
                room.end_game()
            # await self.channel_layer.group_discard(self.room_name, self.channel_name)
            pass
        except Exception as e:
            print(f"An error occurred in disconnect: {e}", file=sys.stderr)

    # -----------------------> 5. receive <-----------------------
    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            action = text_data_json.get("action")
            match_id = text_data_json.get("match_id")
            _tournament = get_room(self.t_name)
            room = _tournament.get_room_game(match_id)
            if action:
                if action == "paddle_move":
                    paddle = text_data_json["paddle"]
                    speed = text_data_json["speed"]
                    room.set_paddle_speed(paddle, speed)
                elif action == "paddle_stop":
                    paddle = text_data_json["paddle"]
                    room.set_paddle_speed(paddle, 0)
                elif action == "pause":
                    if room.get_user_pause(self.user.email) < 2:
                        if room.is_paused() != True:
                            room.set_user_pause(self.user.email)
                            room.set_game_pause()
                else:
                    print(f"Invalid action received: {action}", file=sys.stderr)
            else:
                print(f"Received message has no 'action' attribute", file=sys.stderr)
        except Exception as e:
            print(f"An error occurred in receive: {e}", file=sys.stderr)

    async def watch_tournament(self):
        try:
            while self.tournament.ended == False:
                await asyncio.sleep(1)
                message = {
                    "action": "TournamentData",
                    "tournamentdata": self.tournament.data,
                }
                await self.broadcast_message(message, self.spect)
        except Exception as e:
            print(f"An error occurred in watch: {e}", file=sys.stderr)

    async def connction_ack(self, player):
        try:
            player_data = player["data"]
            game_data = await get_game_data(player["object"])
            room = self.tournament.get_room_game(player["match_id"])
            index = room.get_user_index(player["email"])
            message = {
                "action": "connection_ack",
                "index": index,
                "User": player["email"],
                "image_url": player_data["photoUrl"],
                "username": player_data["name"],
                "Room_name": player["match_id"],
                "table_color": game_data.table_color,
                "ball_color": game_data.ball_color,
                "paddle_color": game_data.paddle_color,
                "table_position": game_data.table_position,
            }
            await self.send_message_to_channel(player["channel"], message)
        except Exception as e:
            print(f"An error occurred in connction_ack: {e}", file=sys.stderr)

    async def send_tournament_data(self, match_id):
        try:
            message = {
                "action": "TournamentData",
                "tournamentdata": self.tournament.data,
            }
            await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in send_tournament_data: {e}", file=sys.stderr)

    async def tournament_manager(self):
        try:
            self.tournament.started = True
            self.tournament.generate_qf_players()
            message = {
                "action": "TournamentData",
                "tournamentdata": self.tournament.data,
            }
            await self.tournamnet_broadcast_message(message)
            for player in self.tournament.players:
                await self.connction_ack(player)
            group_name1 = self.tournament_id + "quarter_final" + "match1"
            group_name2 = self.tournament_id + "quarter_final" + "match2"
            group_name3 = self.tournament_id + "quarter_final" + "match3"
            group_name4 = self.tournament_id + "quarter_final" + "match4"
            group_name5 = self.tournament_id + "semi_final" + "match1"
            group_name6 = self.tournament_id + "semi_final" + "match2"
            group_name7 = self.tournament_id + "final" + "match1"
            round1 = "quarter_final"
            round2 = "semi_final"
            round3 = "final"
            task_1 = asyncio.ensure_future(self.start_game(group_name1, round1))
            task_2 = asyncio.ensure_future(self.start_game(group_name2, round1))
            task_3 = asyncio.ensure_future(self.start_game(group_name3, round1))
            task_4 = asyncio.ensure_future(self.start_game(group_name4, round1))
            task_5 = None
            task_6 = None
            task_7 = None

            while True:
                if task_1 and task_1.done():
                    await self.send_tournament_data(group_name1)
                    if task_1 == None:
                        break
                if task_2 and task_2.done():
                    await self.send_tournament_data(group_name2)
                    if task_2 == None:
                        break
                if task_3 and task_3.done():
                    await self.send_tournament_data(group_name3)
                    if task_3 == None:
                        break
                if task_4 and task_4.done():
                    await self.send_tournament_data(group_name4)
                    if task_4 == None:
                        break
                if task_5 and task_5.done():
                    await self.send_tournament_data(group_name5)
                    if task_4 == None:
                        break
                if task_6 and task_6.done():
                    await self.send_tournament_data(group_name6)
                    if task_5 == None:
                        break
                if task_7 and task_7.done():
                    await self.send_tournament_data(group_name7)
                    if task_6 == None:
                        break
                    break

                if task_1 and task_2 and task_1.done() and task_2.done() and not task_5:
                    resault1 = task_1.result()
                    resault2 = task_2.result()
                    _channel1 = self.tournament.get_qf_winner(1, resault1)
                    await self.channel_layer.group_discard(group_name1, _channel1)
                    _channel2 = self.tournament.get_qf_winner(2, resault2)
                    await self.channel_layer.group_discard(group_name2, _channel2)
                    self.tournament.promote_qf_winner(1, resault1)
                    self.tournament.promote_qf_winner(2, resault2)
                    for player in self.tournament.get_player_by_maych_id(group_name5):
                        await self.connction_ack(player)
                    task_5 = asyncio.ensure_future(self.start_game(group_name5, round2))

                if task_3 and task_4 and task_3.done() and task_4.done() and not task_6:
                    resault3 = task_3.result()
                    resault4 = task_4.result()
                    _channel3 = self.tournament.get_qf_winner(3, resault3)
                    await self.channel_layer.group_discard(group_name3, _channel3)
                    _channel4 = self.tournament.get_qf_winner(4, resault4)
                    await self.channel_layer.group_discard(group_name4, _channel4)
                    self.tournament.promote_qf_winner(3, resault3)
                    self.tournament.promote_qf_winner(4, resault4)
                    for player in self.tournament.get_player_by_maych_id(group_name6):
                        await self.connction_ack(player)
                    task_6 = asyncio.ensure_future(self.start_game(group_name6, round2))

                if task_5 and task_6 and task_5.done() and task_6.done() and not task_7:
                    resault5 = task_5.result()
                    resault6 = task_6.result()
                    _channel5 = self.tournament.get_sf_winner(1, resault5)
                    await self.channel_layer.group_discard(group_name5, _channel5)
                    _channel6 = self.tournament.get_sf_winner(2, resault6)
                    await self.channel_layer.group_discard(group_name6, _channel6)
                    self.tournament.promote_sf_winner(1, resault5)
                    self.tournament.promote_sf_winner(2, resault6)
                    for player in self.tournament.get_player_by_maych_id(group_name7):
                        await self.connction_ack(player)
                    task_7 = asyncio.ensure_future(self.start_game(group_name7, round3))

                await asyncio.sleep(1)
            self.tournament.ended = True
            await set_tournament_end_date(self.tournament_id)
            winner = self.tournament.get_final_winner()
            message = {
                "action": "winner",
                "name": winner["data"]["name"],
                "image_url": winner["data"]["photoUrl"],
            }
            await self.tournamnet_broadcast_message(message)

        except Exception as e:
            print(f"An error occurred in tournament_manager: {e}", file=sys.stderr)

    # -----------------------> 6. start_game <-----------------------
    async def opponents(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            user1, user1_data, user2, user2_data = room.get_original_users()
            message = {
                "action": "opponents",
                "user1": user1,
                "user1_image_url": user1_data["user_img"],
                "user1_username": user1_data["username"],
                "user2": user2,
                "user2_image_url": user2_data["user_img"],
                "user2_username": user2_data["username"],
            }
            await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in opponents: {e}", file=sys.stderr)

    async def update_ball_possiton(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            ball_position, ball_velocity = room.get_updated_ball()
            message = {
                "action": "update",
                "ball_position_x": ball_position["x"],
                "ball_position_z": ball_position["z"],
                "ball_velocity_x": ball_velocity["velocity_x"],
                "ball_velocity_z": ball_velocity["velocity_z"],
            }
            await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in update_ball_possiton: {e}", file=sys.stderr)

    async def send_score(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            user1_score = room.getScores()["user1"]
            user2_score = room.getScores()["user2"]
            _tournament.update_rooms_scores(match_id, "user1", user1_score)
            _tournament.update_rooms_scores(match_id, "user2", user2_score)
            message = {
                "action": "score",
                "user1score": user1_score,
                "user2score": user2_score,
            }
            await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in send_score: {e}", file=sys.stderr)

    async def send_padle_position(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            if room.is_paddle_move(1):
                message = {
                    "action": "paddle_update",
                    "paddle": 1,
                    "paddle_position_z": room.paddle1_position["z"],
                }
                await self.broadcast_message(message, match_id)
            if room.is_paddle_move(2):
                message = {
                    "action": "paddle_update",
                    "paddle": 2,
                    "paddle_position_z": room.paddle2_position["z"],
                }
                await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in send_padle_position: {e}", file=sys.stderr)

    async def add_game_to_db(self, match_id, _tournament, round):
        try:
            room = _tournament.get_room_game(match_id)
            match = await add_match(
                room.get_user_id(1),
                room.get_user_id(2),
                room.getScores()["user1"],
                room.getScores()["user2"],
                room.get_start_date(),
                datetime.now(),
                room.get_tackles(1),
                room.get_tackles(2),
            )
            await set_Tournamentsmatches(self.tournament_obj, match, round)
        except Exception as e:
            print(f"An error occurred in add_game_to_db: {e}", file=sys.stderr)

    async def start_game(self, match_id, round):
        try:
            _tournament = get_room(self.t_name)
            _players = _tournament.get_players_channel(match_id)
            for player in _players:
                await self.channel_layer.group_add(match_id, player)
            room = _tournament.get_room_game(match_id)
            await self.opponents(match_id, _tournament)
            await asyncio.sleep(5)
            await self.broadcast_message({"action": "load_game"}, match_id)
            await asyncio.sleep(5)
            await self.broadcast_message({"action": "start_game"}, match_id)
            await asyncio.sleep(2)
            await self.init_pos(match_id, _tournament)
            while True:
                if room.is_ended():
                    await asyncio.sleep(2)
                    return room.get_winner_index()
                if room.is_reconecting():
                    i = 0
                    while room.is_reconecting():
                        if room.is_both_offline():
                            room.end_game()
                            await asyncio.sleep(3)
                            return
                        await asyncio.sleep(1)
                        message = {"action": "reconnecting"}
                        await self.broadcast_message(message, match_id)
                        message = {"action": "countdown", "count": 20 - i}
                        await self.broadcast_message(message, match_id)
                        if (i := i + 1) > 20:
                            room.end_game()
                            room.make_user_winner(room.get_online_user())
                            await self.send_score(match_id, _tournament)
                            await self.add_game_to_db(match_id, _tournament, round)
                            await self.send_winner_message(match_id, _tournament)
                            data = room.calculate_xp()
                            await set_user_xp(data["user1"])
                            await set_user_xp(data["user2"])
                            await set_user_rank()
                            await asyncio.sleep(2)
                            return room.get_winner_index()
                    await self.opponents(match_id, _tournament)
                    await self.broadcast_message({"action": "start_game"}, match_id)
                    await self.send_score(match_id, _tournament)
                    await asyncio.sleep(1)
                    # await self.update_ball_possiton(match_id, _tournament)
                    await asyncio.sleep(5)
                if room.is_paused():
                    await self.broadcast_message({"action": "pause"}, match_id)
                    for i in range(20, 0, -1):
                        message = {"action": "countdown", "count": i}
                        await self.broadcast_message(message, match_id)
                        await asyncio.sleep(1)
                    room.set_game_resume()
                    # await self.opponents()
                    await self.broadcast_message({"action": "start_game"}, match_id)
                    # await self.update_ball_possiton(match_id, _tournament)
                    await asyncio.sleep(5)
                room.ball_update()
                room.ball_intersect()
                room.paddle_update()
                await self.send_padle_position(match_id, _tournament)
                if room.is_out_of_bounds():
                    room.update_score()
                    await self.send_score(match_id, _tournament)
                    if room.is_winner():
                        room.end_game()
                        await self.add_game_to_db(match_id, _tournament, round)
                        await self.send_winner_message(match_id, _tournament)
                        data = room.calculate_xp()
                        await set_user_xp(data["user1"])
                        await set_user_xp(data["user2"])
                        await set_user_rank()
                        await asyncio.sleep(2)
                        return room.get_winner_index()
                    room.paddle_reset()
                    await self.reset(match_id, _tournament)
                    await asyncio.sleep(1)
                else:
                    pass
                    # await self.update_ball_possiton(match_id, _tournament)
                await asyncio.sleep(1 / 60)
        except Exception as e:
            print(f"An error occurred in connect: {e}", file=sys.stderr)

    # -----------------------> 7. init_pos <-----------------------
    async def init_pos(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            ball_position_z = random.uniform(-2.2, 2.2)
            ball_velocity_x = 0.05 * random.choice([-1, 1])
            ball_velocity_z = 0.05 * random.choice([-1, 1])
            room.set_ball_position(0, ball_position_z)
            room.set_ball_velocity(ball_velocity_x, ball_velocity_z)
            room.start_game()
            return ball_position_z, ball_velocity_x, ball_velocity_z
        except Exception as e:
            print(f"An error occurred in init_pos: {e}", file=sys.stderr)

    # -----------------------> 8. reset <-----------------------
    async def reset(self, match_id, _tournament):
        try:
            room = _tournament.get_room_game(match_id)
            ball_position_z = random.uniform(-2.2, 2.2)
            if room.ball_position["x"] < 0:
                ball_velocity_x = 0.05
            else:
                ball_velocity_x = -0.05
            ball_velocity_z = 0.05 * random.choice([-1, 1])
            room.set_ball_position(0, ball_position_z)
            room.set_ball_velocity(ball_velocity_x, ball_velocity_z)
            message = {
                "action": "reset",
                "ball_position_x": 0,
                "ball_position_z": ball_position_z,
                "ball_velocity_x": ball_velocity_x,
                "ball_velocity_z": ball_velocity_z,
            }
            await self.broadcast_message(message, match_id)
        except Exception as e:
            print(f"An error occurred in reset: {e}", file=sys.stderr)
