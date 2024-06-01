from rest_framework import serializers
from authentication.models import User
from django.db.models import Q, F
from .models import (Tournaments,
                     Tournamentsmatches,
                     Match)

class TournamentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournaments
        fields = '__all__'

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

