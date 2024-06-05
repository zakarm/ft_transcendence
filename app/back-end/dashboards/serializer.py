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
        fields = ('id', 'username', 'image_url', 'is_online')

class FriendshipSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    is_user_from = serializers.SerializerMethodField()
    blocked = serializers.SerializerMethodField()
    class Meta:
        model = Friendship
        fields = ('user', 'freindship_id', 'is_accepted', 'blocked', 'is_user_from')

    def get_user(self, obj):
        if obj.user_from.id == self.context['id']:
            user_data = User.objects.get(id=obj.user_to.id)
        else:
            user_data = User.objects.get(id=obj.user_from.id)

        serializer = UserSerializer(user_data)
        return serializer.data

    def get_blocked(self, obj):
        if obj.user_from.id == self.context['id']:
            blocked = obj.u_one_is_blocked_u_two
        else:
            blocked = obj.u_two_is_blocked_u_one
        return blocked

    def get_is_user_from(self, obj):
        return obj.user_from.id == self.context['id']

class FriendsSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'image_url', 'friends')

    def get_friends(self, obj):
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

    def get_user(self, obj):
        if obj.user_from.id == self.context['id']:
            user_data = User.objects.get(id=obj.user_to.id)
        else:
            user_data = User.objects.get(id=obj.user_from.id)

        serializer = UserSerializer(user_data)
        return serializer.data

    def get_blocked(self, obj):
        if obj.user_from.id == self.context['id']:
            blocked = obj.u_one_is_blocked_u_two
        else:
            blocked = obj.u_two_is_blocked_u_one
        return blocked

    def get_is_user_from(self, obj):
        return obj.user_from.id == self.context['id']

class BlockedFriendsSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'image_url', 'friends')

    def get_friends(self, obj):
        friends_data = Friendship.objects.filter(Q(user_from = obj)| Q(user_to= obj))
        serializer = BlockedFriendshipSerializer(friends_data, many=True,
                                                 context = {'id': obj.id})
        return serializer.data


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('notification_id', 'image_url', 'message', 'title', 'link')

class NotificationUserSerializer(serializers.ModelSerializer):
    notifications = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'notifications')

    def get_notifications(self, obj):
        notifications_data = Notification.objects.filter(user = obj)
        serializer = NotificationSerializer(notifications_data, many = True)
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

    def get_matches_as_user_one(self, obj):
        period = self.context['period']
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

    def get_matches_as_user_two(self, obj):
        period = self.context['period']
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

    def get_minutes_per_day(self, obj):
        return get_minutes_per_day(obj, period=self.context['period'])
