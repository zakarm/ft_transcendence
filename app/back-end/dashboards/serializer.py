from rest_framework import serializers
from authentication.models import User
from game.models import Match
from .models import Friendship, Notification
from django.db.models import F, Q
from .utils import (get_total_games,
                    get_win_games,
                    get_lose_games,
                    get_monthly_game_stats,
                    get_total_minutes)
from django.utils import timezone
from .reports import (get_minutes_per_day)
from drf_spectacular.utils import extend_schema_field
import sys

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
                  'total_minutes', 'image_url')

    @extend_schema_field(serializers.ListField(child=MatchSerializer()))
    def get_matches_as_user_one(self, obj) -> list:
        matches = Match.objects.filter(user_one=obj)[:10]
        serializer = MatchSerializer(matches, many=True)
        return serializer.data
    
    @extend_schema_field(serializers.ListField(child=MatchSerializer()))
    def get_matches_as_user_two(self, obj) -> list:
        matches = Match.objects.filter(user_two=obj)[:10]
        serializer = MatchSerializer(matches, many=True)
        return serializer.data
    
    @extend_schema_field(serializers.IntegerField())
    def get_total_minutes(self, obj) -> int:
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
    
    @extend_schema_field(serializers.IntegerField())
    def get_total_games(self, obj) -> int:
        return get_total_games(obj)
    
    @extend_schema_field(serializers.IntegerField())
    def get_win_games(self, obj) -> int:
        return get_win_games(obj)
    
    @extend_schema_field(serializers.IntegerField())
    def get_lose_games(self, obj) -> int:
        return get_lose_games(obj)
    
    @extend_schema_field(serializers.JSONField())
    def get_monthly_stats(self, obj) -> dict:
        return get_monthly_game_stats(obj)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'image_url', 'is_online')

class FriendshipSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    is_user_from = serializers.SerializerMethodField()
    blocked = serializers.SerializerMethodField()
    class Meta:
        model = Friendship
        fields = ('user', 'freindship_id', 'is_accepted', 'blocked', 'is_user_from')
    
    @extend_schema_field(UserSerializer())
    def get_user(self, obj) -> list:
        if obj.user_from.id == self.context['id']:
            user_data = User.objects.get(id=obj.user_to.id)
        else:
            user_data = User.objects.get(id=obj.user_from.id)

        serializer = UserSerializer(user_data)
        return serializer.data

    @extend_schema_field(serializers.BooleanField())
    def get_blocked(self, obj) -> bool:
        if obj.user_from.id == self.context['id']:
            blocked = obj.u_one_is_blocked_u_two
        else:
            blocked = obj.u_two_is_blocked_u_one
        return blocked
    
    @extend_schema_field(serializers.BooleanField())
    def get_is_user_from(self, obj) -> bool:
        return obj.user_from.id == self.context['id']

class FriendsSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'image_url', 'friends')
    
    @extend_schema_field(serializers.ListField(child=FriendshipSerializer()))
    def get_friends(self, obj) -> list:
        friends_data = Friendship.objects.filter((Q(user_from = obj)| Q(user_to= obj)) &
                                                 Q(u_one_is_blocked_u_two = False) &
                                                 Q(u_two_is_blocked_u_one = False))
        serializer = FriendshipSerializer(friends_data, many=True, context = {'id': obj.id})
        return serializer.data

class BlockedFriendshipSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    blocked = serializers.SerializerMethodField()
    is_user_from = serializers.SerializerMethodField()

    class Meta:
        model = Friendship
        fields = ('user', 'is_accepted', 'blocked', 'is_user_from')

    @extend_schema_field(UserSerializer())
    def get_user(self, obj) -> dict:
        if obj.user_from.id == self.context['id']:
            user_data = User.objects.get(id=obj.user_to.id)
        else:
            user_data = User.objects.get(id=obj.user_from.id)
        serializer = UserSerializer(user_data)
        return serializer.data

    @extend_schema_field(serializers.BooleanField())
    def get_blocked(self, obj) -> bool:
        if obj.user_from.id == self.context['id']:
            blocked = obj.u_one_is_blocked_u_two
        else:
            blocked = obj.u_two_is_blocked_u_one
        return blocked

    @extend_schema_field(serializers.BooleanField())
    def get_is_user_from(self, obj) -> bool:
        return obj.user_from.id == self.context['id']

class BlockedFriendsSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'image_url', 'friends')
    
    @extend_schema_field(serializers.ListField(child=BlockedFriendshipSerializer()))
    def get_friends(self, obj) -> list:
        friends_data = Friendship.objects.filter(Q(user_from = obj)| Q(user_to= obj))
        serializer = BlockedFriendshipSerializer(friends_data, many=True,
                                                 context = {'id': obj.id})
        return serializer.data


class NotificationSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = '__all__'
    
    @extend_schema_field(serializers.IntegerField())
    def get_count(self, obj) -> int:
        return Notification.objects.filter(user = self.context.get('user')).count()

class NotificationUserSerializer(serializers.ModelSerializer):
    notifications = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'notifications')

    @extend_schema_field(serializers.ListField(child=NotificationSerializer()))
    def get_notifications(self, obj) -> list:
        notifications_data = Notification.objects.filter(user = obj)
        serializer = NotificationSerializer(notifications_data, many = True, context={'user': obj})
        return serializer.data


class GameHistorySerializer(serializers.ModelSerializer):
    matches_as_user_one = serializers.SerializerMethodField()
    matches_as_user_two = serializers.SerializerMethodField()
    minutes_per_day = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'image_url',
                  'matches_as_user_one', 'matches_as_user_two',
                  'minutes_per_day')

    @extend_schema_field(serializers.ListField(child=MatchSerializer()))
    def get_matches_as_user_one(self, obj) -> list:
        period = self.context['period']
        matches = []
        if period == 'day':
            matches = Match.objects.filter(Q(user_one=obj) &
                                           Q(match_start__day=timezone.now().day))
        elif period == 'month':
            matches = Match.objects.filter(Q(user_one=obj) &
                                           Q(match_start__day=timezone.now().month))
        elif period == "year":
            matches = Match.objects.filter(Q(user_one=obj) &
                                           Q(match_start__year=timezone.now().year))
        serializer = MatchSerializer(matches, many=True)
        return serializer.data

    @extend_schema_field(serializers.ListField(child=MatchSerializer()))
    def get_matches_as_user_two(self, obj) -> list:
        period = self.context['period']
        matches = []
        if period == 'day':
            matches = Match.objects.filter(Q(user_two=obj) &
                                           Q(match_start__day=timezone.now().day))
        elif period == 'month':
            matches = Match.objects.filter(Q(user_two=obj) &
                                           Q(match_start__month=timezone.now().month))
        elif period == "year":
            matches = Match.objects.filter(Q(user_two=obj) &
                                           Q(match_start__year=timezone.now().year))
        serializer = MatchSerializer(matches, many=True)
        return serializer.data

    @extend_schema_field(serializers.IntegerField())
    def get_minutes_per_day(self, obj) -> int:
        return get_minutes_per_day(obj, period=self.context['period'])
