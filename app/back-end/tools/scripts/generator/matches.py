import os
import django
import sys
import logging
import random
from datetime import datetime, timedelta
from pathlib import Path
from django.utils import timezone

current_dir = Path(__file__).resolve().parent
sys.path.append(str(current_dir / "../../../"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()

from django.db import IntegrityError
from authentication.models import User
from game.models import Match
from rest_framework_simplejwt.tokens import RefreshToken


matches_data = [
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
    {
        "user_one": "user1",
        "user_two": "user2",
        "score_user_one": random.randint(0, 6),
        "score_user_two": 7,
        "match_start": timezone.now() - timedelta(minutes=30),
        "match_end": timezone.now(),
        "tackle_user_one": random.randint(0, 10),
        "tackle_user_two": random.randint(0, 10),
    },
]


def create_match(user_data):
    try:
        match = Match.objects.create(
            user_one=User.objects.get(username=user_data["user_one"]),
            user_two=User.objects.get(username=user_data["user_two"]),
            score_user_one=user_data["score_user_one"],
            score_user_two=user_data["score_user_two"],
            match_start=user_data["match_start"],
            match_end=user_data["match_end"],
            tackle_user_one=user_data["tackle_user_one"],
            tackle_user_two=user_data["tackle_user_two"],
        )
        print(f"    Match {match} created")
    except IntegrityError:
        print(f"    Match {match} already exists")


def generator():
    print("Generating matches")
    for match_data in matches_data:
        create_match(match_data)
    print("Matches created successfully.")
