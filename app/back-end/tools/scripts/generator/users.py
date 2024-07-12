import os
import django
import sys
import logging
from pathlib import Path

current_dir = Path(__file__).resolve().parent
sys.path.append(str(current_dir / "../../../"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()

from django.db import IntegrityError
from authentication.models import User
from rest_framework_simplejwt.tokens import RefreshToken

logging.basicConfig(filename="data.log", level=logging.DEBUG)
if os.path.exists("data.log"):
    with open("data.log", "w"):
        pass

users_data = [
    {
        "email": "user1@email.com",
        "password": "password123",
        "first_name": "First1",
        "last_name": "Last1",
        "username": "user1",
        "display_name": "user1",
    },
    {
        "email": "user2@email.com",
        "password": "password123",
        "first_name": "First2",
        "last_name": "Last2",
        "username": "user2",
        "display_name": "user2",
    },
    {
        "email": "user3@email.com",
        "password": "password123",
        "first_name": "First3",
        "last_name": "Last3",
        "username": "user3",
        "display_name": "user3",
    },
    {
        "email": "user4@email.com",
        "password": "password123",
        "first_name": "First4",
        "last_name": "Last4",
        "username": "user4",
        "display_name": "user4",
    },
    {
        "email": "user5@email.com",
        "password": "password123",
        "first_name": "First5",
        "last_name": "Last5",
        "username": "user5",
        "display_name": "user5",
    },
    {
        "email": "user6@email.com",
        "password": "password123",
        "first_name": "First6",
        "last_name": "Last6",
        "username": "user6",
        "display_name": "user6",
    },
    {
        "email": "user7@email.com",
        "password": "password123",
        "first_name": "First7",
        "last_name": "Last7",
        "username": "user7",
        "display_name": "user7",
    },
    {
        "email": "user8@email.com",
        "password": "password123",
        "first_name": "First8",
        "last_name": "Last8",
        "username": "user8",
        "display_name": "user8",
    },
]


def create_user(user_data):
    try:
        user = User.objects.create_user(
            email=user_data["email"],
            username=user_data["username"],
            display_name=user_data["display_name"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            password=user_data["password"],
        )
        print(f"    User '{user.username}' created successfully.")
        refresh = RefreshToken.for_user(user)
        logging.debug(f"User: {user.username}")
        logging.debug(f"Access: {refresh.access_token}")
    except IntegrityError:
        user = User.objects.get(username=user_data["username"])
        refresh = RefreshToken.for_user(user)
        logging.debug(f"User: {user.username}")
        logging.debug(f"Access: {refresh.access_token}")
        print(f"    User {user_data['username']} already exists")


def generator():
    print("Generating users...")
    for user_data in users_data:
        create_user(user_data)
    print("Users created successfully.")
