"""Module providing rest serializers"""
from rest_framework import serializers
from authentication.models import User
from game.models import Match
from .utils import *
import sys

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

class MainDashboardSerializer(serializers.ModelSerializer):
    """Serializer class for main dashboard"""
    matches_as_user_one = MatchSerializer(many=True, read_only=True)
    matches_as_user_two = MatchSerializer(many=True, read_only=True)

    class Meta:
        """Meta class for MainDashboard serializer"""
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'matches_as_user_one', 'matches_as_user_two')

    def get_matches_as_user_one(self, obj):
        return obj.match_set.filter(user_one=obj)

    def get_matches_as_user_two(self, obj):
        return obj.match_set.filter(user_two=obj)

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer class for Profile"""
    total_games = serializers.SerializerMethodField()
    win_games = serializers.SerializerMethodField()
    lose_games = serializers.SerializerMethodField()
    monthly_stats = serializers.SerializerMethodField()

    class Meta:
        """Meta class for Profile serializer"""
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'intro', 'quote', 'rank', 'level', 'score', 'location', 'total_games', 'win_games', 'lose_games', 'monthly_stats')

    def get_total_games(self, obj):
        """Calculate the total number of games played by the user."""
        return get_total_games(obj)

    def get_win_games(self, obj):
        """Calculate the total number of games win."""
        return get_win_games(obj)

    def get_lose_games(self, obj):
        """Calculate the total number of games lose."""
        return get_lose_games(obj)

    def get_monthly_stats(self, obj):
        """Calculate the total number of games win and lose in past 6 months."""
        return get_monthly_game_stats(obj)

    def to_representation(self, instance):
        """Customize the serialized data representation."""
        data = super().to_representation(instance)
        return data