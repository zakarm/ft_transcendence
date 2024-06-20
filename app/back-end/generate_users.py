import os
import django
import sys
import logging

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()

from django.db import IntegrityError
from authentication.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# Configure logging to write to data.log
logging.basicConfig(filename="data.log", level=logging.ERROR)

# Define user data for 8 users
users_data = [
    {
        "email": "user1@example.com",
        "password": "password123",
        "first_name": "First1",
        "last_name": "Last1",
        "username": "user1",
    },
    {
        "email": "user2@example.com",
        "password": "password123",
        "first_name": "First2",
        "last_name": "Last2",
        "username": "user2",
    },
    {
        "email": "user3@example.com",
        "password": "password123",
        "first_name": "First3",
        "last_name": "Last3",
        "username": "user3",
    },
    {
        "email": "user4@example.com",
        "password": "password123",
        "first_name": "First4",
        "last_name": "Last4",
        "username": "user4",
    },
    {
        "email": "user5@example.com",
        "password": "password123",
        "first_name": "First5",
        "last_name": "Last5",
        "username": "user5",
    },
    {
        "email": "user6@example.com",
        "password": "password123",
        "first_name": "First6",
        "last_name": "Last6",
        "username": "user6",
    },
    {
        "email": "user7@example.com",
        "password": "password123",
        "first_name": "First7",
        "last_name": "Last7",
        "username": "user7",
    },
    {
        "email": "user8@example.com",
        "password": "password123",
        "first_name": "First8",
        "last_name": "Last8",
        "username": "user8",
    },
]


# Function to create a user or generate tokens for an existing user
def create_user_and_generate_token(user_data):
    try:
        user = User.objects.create_user(
            email=user_data["email"],
            username=user_data["username"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            password=user_data["password"],
        )
    except IntegrityError:
        # User with this email already exists, get the existing user
        user = User.objects.get(email=user_data["email"])

    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


# Create users and collect their tokens
tokens = []
for user_data in users_data:
    token_data = create_user_and_generate_token(user_data)
    tokens.append(token_data)

# Write the tokens to a file
with open("data.log", "w") as log_file:
    for idx, token in enumerate(tokens):
        log_file.write(f"User {idx+1} Tokens:\n")
        log_file.write(f"Access: {token['access']}\n")
        log_file.write(f"Refresh: {token['refresh']}\n\n")

print("Tokens have been written to data.log")
