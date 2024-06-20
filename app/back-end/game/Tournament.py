import random
from .room import RoomObject

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
            "quarter_final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
                "match2": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
                "match3": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
                "match4": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
            },
            "semi_final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
                "match2": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
            },
            "final": {
                "match1": {
                    "user1": {"name": "", "photoUrl": "", "score": 0},
                    "user2": {"name": "", "photoUrl": "", "score": 0},
                },
            },
        }

    def is_tournament_ready(self):
        return len(self.players) == 8

    def add_player(self, player):
        self.players.append(player)

    def generate_quatre_final_players(self):
        for i in range(4):
            match_key = f"match{i+1}"
            player1 = self.players[2 * i]
            player2 = self.players[2 * i + 1]

            # Assign players to quarter-final matches
            self.data["quarter_final"][match_key]["user1"] = player1["data"]
            self.data["quarter_final"][match_key]["user2"] = player2["data"]

            # Add players to the game rooms
            self.games["quarter_final"][match_key]["room"].add_user(
                player1["channel"], player1["email"], player1["object"]
            )
            self.games["quarter_final"][match_key]["room"].add_user(
                player2["channel"], player2["email"], player2["object"]
            )
            self.set_player_match_id(
                player1["email"], self.games["quarter_final"][match_key]["room_id"]
            )
            self.set_player_match_id(
                player2["email"], self.games["quarter_final"][match_key]["room_id"]
            )

    def set_player_match_id(self, email, match_id):
        for player in self.players:
            if player["email"] == email:
                player["match_id"] = match_id

    def get_player_by_name(self, name):
        for player in self.players:
            if player["data"]["name"] == name:
                return player

    def get_players_channel(self, match_id):
        _players = []
        for player in self.players:
            if player["match_id"] == match_id:
                _players.append(player["channel"])
        return _players

    def get_room_game(self, room_id):
        for key in self.games:
            for match in self.games[key]:
                if self.games[key][match]["room_id"] == room_id:
                    return self.games[key][match]["room"]

    def promote_quarter_final_winner(self, match, user):
        match_key = f"match{1 if match <= 2 else 2}"
        match_key_ = f"match{match}"
        if self.data["semi_final"][match_key]["user1"]["name"] == "":
            user_key = f"user1"
        else:
            user_key = f"user2"
        user_key_ = f"user{user}"
        self.data["semi_final"][match_key][user_key] = self.data["quarter_final"][
            match_key_
        ][user_key_]
        player = self.get_player_by_name(
            self.data["quarter_final"][match_key_][user_key_]["name"]
        )
        self.games["semi_final"][match_key]["room"].add_user(
            player["channel"], player["email"], player["object"]
        )
        self.set_player_match_id(
            player["email"], self.games["semi_final"][match_key]["room_id"]
        )

    # def update_data_score(self, round, match, user, score):
    #     self.data[round][match][user]["score"] = score
