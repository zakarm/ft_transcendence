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
                     GameTable,
                     UserAchievements
                    )
from authentication.models import User
import sys

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


"""
first_name: 'Mushigarou',
last_name: 'HobaHoba',
nickname: 'saba',
email: 'hey@hey.com',
country: 'Morocco',
city: '',
image: 'profile.jpeg',
new_password: '',
repeat_password: '',
is_two_fact: false,
two_fact_secret: '',
table_color: '#161625',
ball_color: '#ffffff',
paddle_color: '#ff4655',
table_position: 'default',
current_table_view: '6,8,0',
game_difficulty: '2',
"""

class GameTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameTable
        fields = '__all__'

class GameSettingsSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    game_table = serializers.SerializerMethodField()
    new_password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'image_url', 'is_2fa_enabled', 'two_fa_secret_key',
                  'email', 'country', 'city', 'game_table', 'new_password')
    
    def validate_email(self, value):
        user = self.instance
        if User.objects.filter(email=value).exclude(id=user.id).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value
    
    def get_city(self, obj):
        if obj.location:
            if '/' in obj.location:
                return obj.location.split('/')[1]
            else :
                return "NaN"
        else: return "NaN"

    def get_country(self, obj):
        if obj.location:
            if '/' in obj.location:
                return obj.location.split('/')[0]
            else :
                return obj.location
        else: return "NaN"
    
    def get_game_table(self, obj):
        game_table = GameTable.objects.filter(user=obj).first()
        if game_table:
            return GameTableSerializer(instance=game_table).data
        else:
            return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        game_table_representation = representation.pop('game_table', {})
        if game_table_representation:
            for key, value in game_table_representation.items():
                representation[key] = value
        return representation
