from rest_framework import serializers
from django.db.models import Q, F
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from dashboards.serializer import (MatchSerializer,
                                   UserSerializer)
from .models import (Tournaments,
                     Tournamentsmatches,
                     Match,
                     Achievements,
                     UserAchievements
                    )
from authentication.models import User

class TournamentsmatchesSerializer(serializers.ModelSerializer):
    match = MatchSerializer()
    class Meta:
        model = Tournamentsmatches
        fields = '__all__'

class TournamentsSerializer(serializers.ModelSerializer):
    participantsJoined = serializers.SerializerMethodField()

    class Meta:
        model = Tournaments
        fields = '__all__'

    def get_participantsJoined(self, obj):
        matches = Match.objects.filter(
            match_id__in=Tournamentsmatches.objects.filter(tournament=obj).values_list('match', flat=True)
        )
        participants = set(matches.values_list('user_one', 'user_two').distinct())
        return len(participants)

class UserTournamentsSerializer(serializers.ModelSerializer):
    all_tournaments = serializers.SerializerMethodField()
    ongoing_tournaments = serializers.SerializerMethodField()
    completed_tournaments = serializers.SerializerMethodField()
    my_tournaments = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'all_tournaments',
                  'ongoing_tournaments', 'completed_tournaments', 'my_tournaments')

    def get_all_tournaments(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        tournaments = Tournaments.objects.filter(
            tournament_id__in=Tournamentsmatches.objects.filter(match__in=matches).values_list('tournament_id', flat=True)
        )
        serializer = TournamentsSerializer(tournaments, many=True)
        return serializer.data

    def get_ongoing_tournaments(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        tournaments = Tournaments.objects.filter(
            tournament_end__isnull=True,
            tournament_id__in=Tournamentsmatches.objects.filter(match__in=matches).values_list('tournament_id', flat=True)
        )
        serializer = TournamentsSerializer(tournaments, many=True)
        return serializer.data

    def get_completed_tournaments(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        tournaments = Tournaments.objects.filter(
            tournament_end__isnull=False,
            tournament_id__in=Tournamentsmatches.objects.filter(match__in=matches).values_list('tournament_id', flat=True)
        )
        serializer = TournamentsSerializer(tournaments, many=True)
        return serializer.data

    def get_my_tournaments(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        tournaments = Tournaments.objects.filter(
            crated_by_me=True,
            tournament_id__in=Tournamentsmatches.objects.filter(match__in=matches).values_list('tournament_id', flat=True)
        )
        serializer = TournamentsSerializer(tournaments, many=True)
        return serializer.data

class TournamentCreationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30)
    tournament_name = serializers.CharField(max_length=30)
    tournament_image = serializers.URLField(required=False, allow_blank=True, max_length=350)
    game_difficulty = serializers.IntegerField()

    def validate_username(self, value):
        if Tournaments.objects.filter(player_username=value).exists():
            raise serializers.ValidationError("User with this username already exists.")
        return value

    def validate_tournament_name(self, value):
        if Tournaments.objects.filter(tournament_name=value).exists():
            raise serializers.ValidationError("Tournament with this name already exists.")
        return value
    
    def validate_game_difficulty(self, value):
        if value not in [1, 2, 3]:
            raise serializers.ValidationError("Game difficulty accept only [1, 2, 3] values.")
        return value
    
    def create(self, validated_data):
        return Tournaments.objects.create(
            tournament_name=validated_data['tournament_name'],
            image_url=validated_data['tournament_image'],
            game_difficulty=validated_data['game_difficulty'],
            tournament_start=datetime.now(),
            crated_by_me=True,
            player_username=validated_data['username']
        )

class UserAchievementsSerializer(serializers.ModelSerializer):
    tournament = serializers.SerializerMethodField()
    match = serializers.SerializerMethodField()
    ai = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'id', 'tournament', 'match', 'ai')

    def get_achievement(self, obj, type, names):
        achievements = {}
        for name in names:
            achievements[name] = UserAchievements.objects.filter(
                user=obj, achievement__achievement_type=type, achievement__achievement_name=name
            ).exists()
        return achievements

    def get_tournament(self, obj):
        return self.get_achievement(obj, 'tournament', ['early', 'triple', 'front'])

    def get_match(self, obj):
        return self.get_achievement(obj, 'match', ['speedy', 'last', 'king'])

    def get_ai(self, obj):
        return self.get_achievement(obj, 'ai', ['challenger', 'rivalry', 'legend'])