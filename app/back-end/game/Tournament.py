import random
from .room import RoomObject


class Tournament:
    def __init__(self, tournament_id):
        self.tournament_id = tournament_id
        self.players = []
        self.games = {
            "quarter_final": {
                "match1": RoomObject(),
                "match2": RoomObject(),
                "match3": RoomObject(),
                "match4": RoomObject(),
            },
            "semi_final": {"match1": RoomObject(), "match2": RoomObject()},
            "final": {"match1": RoomObject()},
        }

        self.winners = {
            "quarter_final": {
                "match1": None,
                "match2": None,
                "match3": None,
                "match4": None,
            },
            "semi_final": {"match1": None, "match2": None},
            "final": {"match1": None},
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

    def clear_losers(self):
        self.players = [
            player for player in self.players if player["data"] not in self.winners
        ]

    def set_winners(self, round, match, user):
        self.winners[round][match] = user

    def generate_quatre_final_players(self):
        random.shuffle(self.players)
        self.data["quarter_final"]["match1"]["user1"] = self.players[0]["data"]
        self.data["quarter_final"]["match1"]["user2"] = self.players[1]["data"]
        self.data["quarter_final"]["match2"]["user1"] = self.players[2]["data"]
        self.data["quarter_final"]["match2"]["user2"] = self.players[3]["data"]
        self.data["quarter_final"]["match3"]["user1"] = self.players[4]["data"]
        self.data["quarter_final"]["match3"]["user2"] = self.players[5]["data"]
        self.data["quarter_final"]["match4"]["user1"] = self.players[6]["data"]
        self.data["quarter_final"]["match4"]["user2"] = self.players[7]["data"]
        # add players to the games
        self.games["quarter_final"]["match1"].add_user(
            self.players[0]["channel"],
            self.players[0]["email"],
            self.players[0]["object"],
        )
        self.games["quarter_final"]["match1"].add_user(
            self.players[1]["channel"],
            self.players[1]["email"],
            self.players[1]["object"],
        )
        self.games["quarter_final"]["match2"].add_user(
            self.players[2]["channel"],
            self.players[2]["email"],
            self.players[2]["object"],
        )
        self.games["quarter_final"]["match2"].add_user(
            self.players[3]["channel"],
            self.players[3]["email"],
            self.players[3]["object"],
        )
        self.games["quarter_final"]["match3"].add_user(
            self.players[4]["channel"],
            self.players[4]["email"],
            self.players[4]["object"],
        )
        self.games["quarter_final"]["match3"].add_user(
            self.players[5]["channel"],
            self.players[5]["email"],
            self.players[5]["object"],
        )
        self.games["quarter_final"]["match4"].add_user(
            self.players[6]["channel"],
            self.players[6]["email"],
            self.players[6]["object"],
        )
        self.games["quarter_final"]["match4"].add_user(
            self.players[7]["channel"],
            self.players[7]["email"],
            self.players[7]["object"],
        )

    def promote_quarter_final_winners(self):
        self.winners["semi_final"]["match1"]["user1"] = self.winners["quarter_final"][
            "match1"
        ]
        self.winners["semi_final"]["match1"]["user2"] = self.winners["quarter_final"][
            "match2"
        ]
        self.winners["semi_final"]["match2"]["user1"] = self.winners["quarter_final"][
            "match3"
        ]
        self.winners["semi_final"]["match2"]["user2"] = self.winners["quarter_final"][
            "match4"
        ]
        # add players to the games
        self.games["semi_final"]["match1"].add_user(
            self.players[0]["channel"],
            self.players[0]["email"],
            self.players[0]["object"],
        )
        self.games["semi_final"]["match1"].add_user(
            self.players[1]["channel"],
            self.players[1]["email"],
            self.players[1]["object"],
        )
        self.games["semi_final"]["match2"].add_user(
            self.players[2]["channel"],
            self.players[2]["email"],
            self.players[2]["object"],
        )
        self.games["semi_final"]["match2"].add_user(
            self.players[3]["channel"],
            self.players[3]["email"],
            self.players[3]["object"],
        )

    def promote_semi_final_winners(self):
        self.winners["final"]["match1"]["user1"] = self.winners["semi_final"]["match1"]
        self.winners["final"]["match1"]["user2"] = self.winners["semi_final"]["match2"]
        # add players to the games
        self.games["final"]["match1"].add_user(
            self.players[0]["channel"],
            self.players[0]["email"],
            self.players[0]["object"],
        )
        self.games["final"]["match1"].add_user(
            self.players[1]["channel"],
            self.players[1]["email"],
            self.players[1]["object"],
        )

    def promote_semi_final_winners(self):
        self.winners["final"]["match1"]["user1"] = self.winners["semi_final"]["match1"]
        self.winners["final"]["match1"]["user2"] = self.winners["semi_final"]["match2"]

    def update_data_score(self, match, user, score):
        self.data[match][user]["score"] = score
