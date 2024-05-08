class RoomObject:
    def __init__(self):
        # game state
        self.game_started = False
        self.game_ended = False
        self.reconect = False
        self.room_is_full = False

        # ball
        self.ball_radius = 0.1
        self.ball_position = {"x": 0, "z": 0}
        self.ball_velocity = {"velocity_x": 0, "velocity_z": 0}

        # paddle
        self.paddle_width = 0.2
        self.paddle_height = 0.2
        self.paddle_depth = 1
        self.paddle1_speed = 0
        self.paddle2_speed = 0
        self.paddle1_position = {"x": -4.8, "z": 0}
        self.paddle2_position = {"x": 4.8, "z": 0}

        # users
        self.reconect_user = ""
        self.Original_users = {
            "user1": {"joined": 0, "user_id": "", "index": 1, "channel_name": ""},
            "user2": {"joined": 0, "user_id": "", "index": 2, "channel_name": ""},
        }
        self.score = {"user1": 0, "user2": 0}

    # distructor
    def __del__(self):
        print("Room deleted")

    # ------------------------> game <------------------------

    def start_game(self):
        self.game_started = True

    def end_game(self):
        self.game_started = False
        self.reconect = False
        self.game_ended = True

    def is_started(self):
        return self.game_started

    def is_ended(self):
        return self.game_ended

    def is_reconecting(self):
        return self.reconect

    # ------------------------> user <------------------------
    def get_winner(self):
        if self.score["user1"] == 7:
            return (
                self.Original_users["user1"]["user_id"],
                self.Original_users["user2"]["user_id"],
            )
        elif self.score["user2"] == 7:
            return (
                self.Original_users["user2"]["user_id"],
                self.Original_users["user1"]["user_id"],
            )
        return None

    def is_winner(self):
        if self.score["user1"] == 7 or self.score["user2"] == 7:
            return True
        return False

    def update_score(self):
        if self.ball_position["x"] < -5:
            self.score["user1"] += 1
        elif self.ball_position["x"] > 5:
            self.score["user2"] += 1

    def getScores(self):
        return self.score

    def is_ready(self):
        return (
            self.Original_users["user1"]["joined"] == 1
            and self.Original_users["user2"]["joined"] == 1
        )

    def get_user_index(self, user_id):
        if self.Original_users["user1"]["user_id"] == user_id:
            return 1
        elif self.Original_users["user2"]["user_id"] == user_id:
            return 2

    def get_original_users(self):
        return (
            self.Original_users["user1"]["user_id"],
            self.Original_users["user2"]["user_id"],
        )

    def is_user_joined(self, user_id):
        if (
            self.Original_users["user1"]["user_id"] == user_id
            or self.Original_users["user2"]["user_id"] == user_id
        ):
            return True
        return False

    def add_user(self, channel_name, user_id):
        if self.Original_users["user1"]["joined"] == 0:
            self.Original_users["user1"]["channel_name"] = channel_name
            self.Original_users["user1"]["user_id"] = user_id
            self.Original_users["user1"]["joined"] = 1
        elif self.Original_users["user2"]["joined"] == 0:
            self.Original_users["user2"]["channel_name"] = channel_name
            self.Original_users["user2"]["user_id"] = user_id
            self.Original_users["user2"]["joined"] = 1
            self.room_is_full = True

    def reconecting_user(self, channel_name, user_id):
        if self.Original_users["user1"]["user_id"] == user_id:
            self.Original_users["user1"]["channel_name"] = channel_name
        elif self.Original_users["user2"]["user_id"] == user_id:
            self.Original_users["user2"]["channel_name"] = channel_name
        self.reconect = False

    def set_reconect(self, user_id):
        if self.game_ended == False:
            self.reconect_user = user_id
            self.reconect = True

    def get_online_user(self):
        # check if the both users are online
        if self.Original_users["user1"]["user_id"] == self.reconect_user:
            return self.Original_users["user2"]["user_id"]
        if self.Original_users["user2"]["user_id"] == self.reconect_user:
            return self.Original_users["user1"]["user_id"]

    def make_user_winner(self, user_id):
        if self.Original_users["user1"]["user_id"] == user_id:
            self.score["user1"] = 7
        elif self.Original_users["user2"]["user_id"] == user_id:
            self.score["user2"] = 7

    # ------------------------> ball <------------------------
    def set_ball_position(self, x, z):
        self.ball_position["x"] = x
        self.ball_position["z"] = z

    def set_ball_velocity(self, velocity_x, velocity_z):
        self.ball_velocity["velocity_x"] = velocity_x
        self.ball_velocity["velocity_z"] = velocity_z

    def ball_update(self):
        self.ball_position["x"] += self.ball_velocity["velocity_x"]
        self.ball_position["z"] += self.ball_velocity["velocity_z"]
        self.ball_velocity["velocity_x"] *= 1.0005
        self.ball_velocity["velocity_z"] *= 1.0005

    def ball_reset(self):
        self.ball_position["x"] = 0
        self.ball_position["z"] = 0
        self.ball_velocity["velocity_x"] = 0
        self.ball_velocity["velocity_z"] = 0

    def get_updated_ball(self):
        return self.ball_position, self.ball_velocity

    def is_out_of_bounds(self):
        return self.ball_position["x"] < -5 or self.ball_position["x"] > 5

    def ball_intersect(self):
        if (
            self.ball_position["z"] - self.ball_radius
            <= self.paddle1_position["z"] + self.paddle_depth / 2
            and self.ball_position["z"] + self.ball_radius
            >= self.paddle1_position["z"] - self.paddle_depth / 2
            and self.ball_position["x"] - self.ball_radius
            <= self.paddle1_position["x"] + self.paddle_width / 2
        ):
            if (
                self.ball_position["z"] + self.ball_radius
                > self.paddle1_position["z"] + self.paddle_depth / 2
                and self.ball_position["x"]
                < self.paddle1_position["x"] + self.paddle_width / 2
            ):
                self.ball_position["z"] = (
                    self.paddle1_position["z"]
                    + self.paddle_depth / 2
                    + self.ball_radius
                    + 0.05
                )
                self.ball_velocity["velocity_z"] *= -1
            elif (
                self.ball_position["z"] - self.ball_radius
                < self.paddle1_position["z"] - self.paddle_depth / 2
                and self.ball_position["x"]
                < self.paddle1_position["x"] + self.paddle_width / 2
            ):
                self.ball_position["z"] = (
                    self.paddle1_position["z"]
                    - self.paddle_depth / 2
                    - self.ball_radius
                    - 0.05
                )
                self.ball_velocity["velocity_z"] *= -1
            else:
                self.ball_position["x"] = (
                    self.paddle1_position["x"]
                    + self.paddle_width / 2
                    + self.ball_radius
                    + 0.05
                )
                self.ball_velocity["velocity_x"] *= -1
        # Check collision with paddle 2
        if (
            self.ball_position["z"] - self.ball_radius
            <= self.paddle2_position["z"] + self.paddle_depth / 2
            and self.ball_position["z"] + self.ball_radius
            >= self.paddle2_position["z"] - self.paddle_depth / 2
            and self.ball_position["x"] + self.ball_radius
            >= self.paddle2_position["x"] - self.paddle_width / 2
        ):
            if (
                self.ball_position["z"] + self.ball_radius
                > self.paddle2_position["z"] + self.paddle_depth / 2
                and self.ball_position["x"]
                > self.paddle2_position["x"] - self.paddle_width / 2
            ):
                self.ball_position["z"] = (
                    self.paddle2_position["z"]
                    + self.paddle_depth / 2
                    + self.ball_radius
                    + 0.05
                )
                self.ball_velocity["velocity_z"] *= -1
            elif (
                self.ball_position["z"] - self.ball_radius
                < self.paddle2_position["z"] - self.paddle_depth / 2
                and self.ball_position["x"]
                > self.paddle2_position["x"] - self.paddle_width / 2
            ):  # error maybe here
                self.ball_position["z"] = (
                    self.paddle2_position["z"]
                    - self.paddle_depth / 2
                    - self.ball_radius
                    - 0.05
                )
                self.ball_velocity["velocity_z"] *= -1
            else:
                self.ball_position["x"] = (
                    self.paddle2_position["x"]
                    - self.paddle_width / 2
                    - self.ball_radius
                    - 0.05
                )
                self.ball_velocity["velocity_x"] *= -1
        if (
            self.ball_position["z"] - self.ball_radius >= 2.3
            or self.ball_position["z"] + self.ball_radius <= -2.3
        ):
            self.ball_velocity["velocity_z"] *= -1

    # ------------------------> paddle <------------------------
    def paddle_update(self):
        newPosition1 = self.paddle1_position["z"] + self.paddle1_speed
        if newPosition1 < -2.5 + self.paddle_depth / 2:
            self.paddle1_position["z"] = -2.5 + self.paddle_depth / 2
            self.paddle1_speed = 0
        elif newPosition1 > 2.5 - self.paddle_depth / 2:
            self.paddle1_position["z"] = 2.5 - self.paddle_depth / 2
            self.paddle1_speed = 0
        else:
            self.paddle1_position["z"] = newPosition1
        newPosition2 = self.paddle2_position["z"] + self.paddle2_speed
        if newPosition2 < -2.5 + self.paddle_depth / 2:
            self.paddle2_position["z"] = -2.5 + self.paddle_depth / 2
            self.paddle1_speed = 0
        elif newPosition2 > 2.5 - self.paddle_depth / 2:
            self.paddle2_position["z"] = 2.5 - self.paddle_depth / 2
            self.paddle1_speed = 0
        else:
            self.paddle2_position["z"] = newPosition2

    def paddle_reset(self):
        self.paddle1_position["z"] = 0
        self.paddle2_position["z"] = 0
        self.paddle1_speed = 0
        self.paddle2_speed = 0

    def is_paddle_move(self, paddle):
        if paddle == 1:
            return self.paddle1_speed != 0
        elif paddle == 2:
            return self.paddle2_speed != 0

    def set_paddle_speed(self, paddle, speed):
        if paddle == 1:
            self.paddle1_speed = speed
        elif paddle == 2:
            self.paddle2_speed = speed