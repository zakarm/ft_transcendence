from .room import RoomObject
import sys


class Tournament:
    def __init__(self, tournament_id):
        self.tournament_id = tournament_id
        self.players = []
        self.games = {
            "quarter_final": {
                "match1": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "quarter_final" + "match1",
                },
                "match2": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "quarter_final" + "match2",
                },
                "match3": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "quarter_final" + "match3",
                },
                "match4": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "quarter_final" + "match4",
                },
            },
            "semi_final": {
                "match1": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "semi_final" + "match1",
                },
                "match2": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "semi_final" + "match2",
                },
            },
            "final": {
                "match1": {
                    "room": RoomObject(),
                    "room_id": self.tournament_id + "final" + "match1",
                }
            },
        }

        self.data = {
            "tournament_name": "",
            "difficulty": "",
            "quarter_final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
                "match2": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
                "match3": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
                "match4": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
            },
            "semi_final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
                "match2": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
            },
            "final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0, "status": True},
                    "user2": {"name": "", "photoUrl": "", "score": 0, "status": True},
                },
            },
        }

    def is_tournament_ready(self):
        try:
            return len(self.players) == 8
        except Exception as e:
            print(f"An error occurred in is_tournament_ready: {e}", file=sys.stderr)

    def add_player(self, player):
        try:
            self.players.append(player)
        except Exception as e:
            print(f"An error occurred in add_player: {e}", file=sys.stderr)

    def set_player_match_id(self, email, match_id):
        try:
            for player in self.players:
                if player["email"] == email:
                    player["match_id"] = match_id
        except Exception as e:
            print(f"An error occurred in set_player_match_id: {e}", file=sys.stderr)

    def get_player_by_name(self, name):
        try:
            for player in self.players:
                if player["data"]["name"] == name:
                    return player
        except Exception as e:
            print(f"An error occurred in get_player_by_name: {e}", file=sys.stderr)

    def get_players_channel(self, match_id):
        try:
            _players = []
            for player in self.players:
                if player["match_id"] == match_id:
                    _players.append(player["channel"])
            return _players
        except Exception as e:
            print(f"An error occurred in get_players_channel: {e}", file=sys.stderr)

    def get_player_by_maych_id(self, match_id):
        try:
            _players = []
            for player in self.players:
                if player["match_id"] == match_id:
                    _players.append(player)
            return _players
        except Exception as e:
            print(f"An error occurred in get_player_by_maych_id: {e}", file=sys.stderr)

    def get_room_game(self, room_id):
        try:
            for key in self.games:
                for match in self.games[key]:
                    if self.games[key][match]["room_id"] == room_id:
                        return self.games[key][match]["room"]
        except Exception as e:
            print(f"An error occurred in get_room_game: {e}", file=sys.stderr)

    def update_rooms_scores(self, room_id, user, score):
        try:
            for key in self.games:
                for match in self.games[key]:
                    if self.games[key][match]["room_id"] == room_id:
                        self.data[key][match][user]["score"] = score
        except Exception as e:
            print(f"An error occurred in update_rooms_scores: {e}", file=sys.stderr)

    def generate_qf_players(self):
        try:
            for i in range(4):
                match_key = f"match{i+1}"
                player1 = self.players[2 * i]
                player2 = self.players[2 * i + 1]
                self.data["quarter_final"][match_key]["user1"] = player1["data"]
                self.data["quarter_final"][match_key]["user2"] = player2["data"]
                game = self.games["quarter_final"][match_key]["room"]
                game.add_user(player1["channel"], player1["email"], player1["object"])
                game.add_user(player2["channel"], player2["email"], player2["object"])
                game_id = self.games["quarter_final"][match_key]["room_id"]
                self.set_player_match_id(player1["email"], game_id)
                self.set_player_match_id(player2["email"], game_id)
        except Exception as e:
            print(f"An error occurred in generate_qf_players: {e}", file=sys.stderr)

    def promote_qf_winner(self, match, user):
        try:
            match_key = f"match{1 if match <= 2 else 2}"
            match_key_ = f"match{match}"
            if self.data["semi_final"][match_key]["user1"]["name"] == "":
                user_key = f"user1"
            else:
                user_key = f"user2"
            user_key_ = f"user{user}"
            winner = self.data["quarter_final"][match_key_][user_key_]
            self.data["semi_final"][match_key][user_key]["name"] = winner["name"]
            self.data["semi_final"][match_key][user_key]["photoUrl"] = winner[
                "photoUrl"
            ]
            self.data["semi_final"][match_key][user_key]["status"] = True
            self.data["semi_final"][match_key][user_key]["score"] = 0
            player = self.get_player_by_name(winner["name"])
            game = self.games["semi_final"][match_key]["room"]
            game.add_user(player["channel"], player["email"], player["object"])
            game_id = self.games["semi_final"][match_key]["room_id"]
            self.set_player_match_id(player["email"], game_id)
        except Exception as e:
            print(f"An error occurred in promote_qf_winner: {e}", file=sys.stderr)

    def get_qf_winner(self, match, user):
        try:
            match_key_ = f"match{match}"
            user_key_ = f"user{user}"
            winner = self.data["quarter_final"][match_key_][user_key_]
            name = winner["name"]
            _channel = self.get_player_by_name(name)["channel"]
            return _channel
        except Exception as e:
            print(f"An error occurred in get_qf_winner: {e}", file=sys.stderr)

    def promote_sf_winner(self, match, user):
        try:
            match_key = f"match{1}"
            match_key_ = f"match{match}"
            if self.data["final"][match_key]["user1"]["name"] == "":
                user_key = f"user1"
            else:
                user_key = f"user2"
            user_key_ = f"user{user}"
            winner = self.data["semi_final"][match_key_][user_key_]
            self.data["final"][match_key][user_key]["name"] = winner["name"]
            self.data["final"][match_key][user_key]["photoUrl"] = winner["photoUrl"]
            self.data["final"][match_key][user_key]["status"] = True
            self.data["final"][match_key][user_key]["score"] = 0
            player = self.get_player_by_name(winner["name"])
            game = self.games["final"][match_key]["room"]
            game.add_user(player["channel"], player["email"], player["object"])
            game_id = self.games["final"][match_key]["room_id"]
            self.set_player_match_id(player["email"], game_id)
        except Exception as e:
            print(f"An error occurred in promote_sf_winner: {e}", file=sys.stderr)

    def get_sf_winner(self, match, user):
        try:
            match_key_ = f"match{match}"
            user_key_ = f"user{user}"
            winner = self.data["semi_final"][match_key_][user_key_]
            name = winner["name"]
            _channel = self.get_player_by_name(name)["channel"]
            return _channel
        except Exception as e:
            print(f"An error occurred in get_sf_winner: {e}", file=sys.stderr)
