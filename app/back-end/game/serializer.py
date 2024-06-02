from rest_framework import serializers
from .models import Tournaments, Tournamentsmatches, Match
from authentication.models import User

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

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
