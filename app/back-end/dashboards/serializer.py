from rest_framework import serializers
from authentication.models import User
from game.models import Match
from .models import Friendship
from django.db.models import F, Q
from .utils import (get_total_games,
                    get_win_games,
                    get_lose_games,
                    get_monthly_game_stats,
                    get_total_minutes)

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

class MainDashboardSerializer(serializers.ModelSerializer):
    matches_as_user_one = serializers.SerializerMethodField()
    matches_as_user_two = serializers.SerializerMethodField()
    total_minutes = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'image_url',
                  'matches_as_user_one', 'matches_as_user_two',
                  'total_minutes')

    def get_matches_as_user_one(self, obj):
        matches = Match.objects.filter(user_one=obj)[:10]
        serializer = MatchSerializer(matches, many=True)
        return serializer.data

    def get_matches_as_user_two(self, obj):
        matches = Match.objects.filter(user_two=obj)[:10]
        serializer = MatchSerializer(matches, many=True)
        return serializer.data

    def get_total_minutes(self, obj):
        return get_total_minutes(obj)

class ProfileSerializer(serializers.ModelSerializer):
    total_games = serializers.SerializerMethodField()
    win_games = serializers.SerializerMethodField()
    lose_games = serializers.SerializerMethodField()
    monthly_stats = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                    'intro', 'quote', 'rank', 'level', 'score', 'cover_url',
                    'location', 'total_games', 'win_games', 'image_url',
                    'lose_games', 'monthly_stats')

    def get_total_games(self, obj):
        return get_total_games(obj)

    def get_win_games(self, obj):
        return get_win_games(obj)

    def get_lose_games(self, obj):
        return get_lose_games(obj)

    def get_monthly_stats(self, obj):
        return get_monthly_game_stats(obj)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
    
class FriendshipSerializer(serializers.ModelSerializer):
    user_one = serializers.SerializerMethodField()
    user_two = serializers.SerializerMethodField()
    class Meta:
        model = Friendship
        fields = ('freindship_id', 'user_one', 'user_two', 'is_accepted')
    
    def get_user_one(self, obj):
        user_data = User.objects.get(id = obj.user_from.id)
        serializer = UserSerializer(user_data)
        return serializer.data
    
    def get_user_two(self, obj):
        user_data = User.objects.get(id = obj.user_to.id)
        serializer = UserSerializer(user_data)
        return serializer.data

class FriendsSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'friends')
    
    def get_friends(self, obj):
        friends_data = Friendship.objects.filter(Q(user_from = obj, is_accepted = True)|
                                                 Q(user_to= obj, is_accepted = True))
        serializer_accepted = FriendshipSerializer(friends_data, many=True)
        friends_data = Friendship.objects.filter(Q(user_from = obj, is_accepted = False)|
                                                 Q(user_to= obj, is_accepted = False))
        serializer_pedding = FriendshipSerializer(friends_data, many=True)
        return serializer_accepted.data +  serializer_pedding.data
