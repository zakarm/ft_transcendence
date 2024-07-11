import os
import django
import sys
from pathlib import Path

current_dir = Path(__file__).resolve().parent
sys.path.append(str(current_dir / "../../"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
django.setup()

from django.db import IntegrityError
from game.models import Achievements


achievements_data = [
    {"name": "early", "type": "tournament"},
    {"name": "triple", "type": "tournament"},
    {"name": "front", "type": "tournament"},
    {"name": "speedy", "type": "match"},
    {"name": "win20", "type": "match"},
    {"name": "king", "type": "match"},
]


def create_achievement(achievement_data):
    try:
        achievement = Achievements.objects.create(
            achievement_name=achievement_data["name"],
            achievement_type=achievement_data["type"],
        )
        print(f"    Achievement '{achievement.achievement_name}' created successfully.")
    except IntegrityError:
        print(f"    Achievement {achievement_data['name']} already exists")


def generator():
    print("Creating achievements...")
    for achievement_data in achievements_data:
        create_achievement(achievement_data)
    print("Achievements created successfully.")

generator()
