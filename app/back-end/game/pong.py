import numpy as np
import gym
from gym import spaces

class Pong(gym.Env):
    metadata = {'render.modes': ['human']}

    def __init__(self, room):
        super(Pong, self).__init__()
        self.room = room
        self.action_space = spaces.Discrete(3)
        self.observation_space = spaces.Box(low=-np.inf, high=np.inf, shape=(4,), dtype=np.float32)

    def step(self, action):
        self.room.set_paddle_speed(2, action)
        self.room.ball_update()
        self.room.ball_intersect()
        self.room.paddle_update()

        state = self._get_state()
        reward = self._get_reward()
        done = self.room.is_out_of_bounds()

        return state, reward, done, {}

    def reset(self, **kwargs):
        self.room.paddle_reset()
        self.room.ball_reset()
        return self._get_state()

    def _get_state(self):
        ball_position = self.room.ball_position
        paddle_position = self.room.paddle2_position
        state = np.array([ball_position['x'], ball_position['z'], paddle_position['x'], paddle_position['z']])
        return state

    def _get_reward(self):
        if self.room.is_winner():
            return 1
        elif self.room.is_winner() is False:
            return -1
        else:
            return 0