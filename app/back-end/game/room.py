import sys


class RoomObject:
    def __init__(self):
        self.game_started = False
        self.game_state = "waiting"
        self.ball_radius = 0.1
        self.paddle_width = 0.2
        self.paddle_height = 0.2
        self.paddle_depth = 1
        self.paddle1_speed = 0
        self.paddle2_speed = 0
        self.paddle1_position = {"x": -4.8, "z": 0}
        self.paddle2_position = {"x": 4.8, "z": 0}
        self.ball_position = {"x": 0, "z": 0}
        self.ball_velocity = {"velocity_x": 0, "velocity_z": 0}
        self.Original_users = {
            "user1": {"joined": 0, "user_id": "", "index": 1, "channel_name": ""},
            "user2": {"joined": 0, "user_id": "", "index": 2, "channel_name": ""},
        }
        # self.users = []
        self.index = 1
        self.score = {"user1": 0, "user2": 0}

    def set_game_state(self, state):
        self.game_state = state

    def start_game(self):
        self.game_started = True

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

    def get_game_state(self):
        return self.game_started

    def is_user_joined(self, user_id):
        if (
            self.Original_users["user1"]["user_id"] == user_id
            or self.Original_users["user2"]["user_id"] == user_id
        ):
            return True
        return False

    def reconecting_user(self, channel_name, user_id):
        if self.Original_users["user1"]["user_id"] == user_id:
            self.Original_users["user1"]["channel_name"] = channel_name
        elif self.Original_users["user2"]["user_id"] == user_id:
            self.Original_users["user2"]["channel_name"] = channel_name

    def add_user(self, channel_name, user_id):
        if self.Original_users["user1"]["joined"] == 0:
            self.Original_users["user1"]["channel_name"] = channel_name
            self.Original_users["user1"]["user_id"] = user_id
            self.Original_users["user1"]["joined"] = 1
        elif self.Original_users["user2"]["joined"] == 0:
            self.Original_users["user2"]["channel_name"] = channel_name
            self.Original_users["user2"]["user_id"] = user_id
            self.Original_users["user2"]["joined"] = 1

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
        # self.ball_velocity["velocity_x"] *= 1.00005
        # self.ball_velocity["velocity_z"] *= 1.00005

    def ball_reset(self):
        self.ball_position["x"] = 0
        self.ball_position["z"] = 0
        self.ball_velocity["velocity_x"] = 0
        self.ball_velocity["velocity_z"] = 0

    def get_updated_ball(self):
        return self.ball_position, self.ball_velocity

    def remove_user(self, channel_name):
        self.users = [
            user for user in self.users if user["channel_name"] != channel_name
        ]

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

    def is_out_of_bounds(self):
        return self.ball_position["x"] < -5 or self.ball_position["x"] > 5

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

    def is_empty(self):
        return not self.users

    def is_started(self):
        return self.game_started
