import os
import django
import logging

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()

from django.db import IntegrityError
from game.models import Achievements

# Configure logging to write to data.log
logging.basicConfig(filename="data.log", level=logging.ERROR)

# List of achievements
achievements_data = [
    {"name": "early", "type": "tournament"},
    {"name": "triple", "type": "tournament"},
    {"name": "front", "type": "tournament"},
    {"name": "speedy", "type": "match"},
    {"name": "last", "type": "match"},
    {"name": "king", "type": "match"},
]


def create_achievement(achievement_data):
    try:
        achievement = Achievements.objects.create(
            achievement_name=achievement_data["name"],
            achievement_type=achievement_data["type"],
        )
        print(f"Achievement '{achievement.achievement_name}' created successfully.")
    except IntegrityError:
        print(f"Achievement {achievement_data['name']} already exists")


# Creating achievements
for achievement_data in achievements_data:
    create_achievement(achievement_data)
