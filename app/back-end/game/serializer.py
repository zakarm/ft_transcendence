from rest_framework import serializers
from django.db.models import Q, F
from django.core.exceptions import ObjectDoesNotExist
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
    matches = serializers.SerializerMethodField()
    participantsJoined = serializers.SerializerMethodField()

    class Meta:
        model = Tournaments
        fields = '__all__'

    def get_matches(self, obj):
        matches = Tournamentsmatches.objects.filter(tournament=obj)
        return TournamentsmatchesSerializer(matches, many=True).data

    def get_participantsJoined(self, obj):
        matches = Match.objects.filter(
            match_id__in=Tournamentsmatches.objects.filter(tournament=obj).values_list('match', flat=True)
        )
        participants = set(matches.values_list('user_one', 'user_two').distinct())
        return len(participants)

class UserTournamentsSerializer(serializers.ModelSerializer):
    all_tournaments = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'all_tournaments')

    def get_all_tournaments(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        tournaments = Tournaments.objects.filter(
            tournament_id__in=Tournamentsmatches.objects.filter(match__in=matches).values_list('tournament_id', flat=True)
        )
        serializer = TournamentsSerializer(tournaments, many=True)
        return serializer.data

class UserAchievementsSerializer(serializers.ModelSerializer):
    tournament = serializers.SerializerMethodField()
    match = serializers.SerializerMethodField()
    ai = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'id', 'tournament', 'match', 'ai')
    
    def get_tournament(self, obj):
        type = 'tournament'
        early = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='early')
        triple = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='triple')
        front = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='front')
        tournament = {
            'early': True if early else False,
            'triple': True if triple else False,
            'front': True if front else False,
        }
        return tournament

    def get_match(self, obj):
        type = 'match'
        speedy = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='speedy')
        last = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='last')
        king = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='king')
        match = {
            'speedy': True if speedy else False,
            'last': True if last else False,
            'king': True if king else False,
        }
        return match
    
    def get_ai(self, obj):
        type = 'ai'
        challenger = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='challenger')
        rivalry = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='rivalry')
        legend = UserAchievements.objects.filter(user=obj, achievement__achievement_type=type,
                                                 achievement__achievement_name='legend')
        ai = {
            'challenger': True if challenger else False,
            'rivalry': True if rivalry else False,
            'king': True if legend else False,
        }
        return ai
