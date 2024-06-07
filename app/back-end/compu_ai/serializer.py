from rest_framework import serializers
from authentication.models import User
from game.models import Match, UserAchievements, Achievements
from django.db.models import Count, F, Q, Avg
from datetime import datetime
from datetime import timedelta
from prophet import Prophet
from django.utils import timezone
from dashboards.serializer import MatchSerializer
from dashboards.utils import (get_lose_games,
                              get_win_games,
                              get_tackles,
                              get_scores,
                              get_win_rate)
import numpy as np
import pandas as pd
import sys
import random

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = '__all__'

class StatisticsSerializer(serializers.ModelSerializer):
    top_player = serializers.SerializerMethodField()
    avg_score = serializers.SerializerMethodField()
    last_achiev = serializers.SerializerMethodField()
    future_predictions = serializers.SerializerMethodField()
    loses = serializers.SerializerMethodField()
    wins = serializers.SerializerMethodField()
    scores = serializers.SerializerMethodField()
    tackles = serializers.SerializerMethodField()
    win_rate = serializers.SerializerMethodField()
    player_matches = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'top_player', 'avg_score', 'last_achiev', 'future_predictions', 
                  'loses', 'wins', 'scores', 'tackles', 'win_rate', 'player_matches')

    def get_top_player(self, obj):
        users_with_wins = User.objects.annotate(
            wins_as_user_one=Count('match_user_one_set', filter=Q(match_user_one_set__score_user_one__gt=F('match_user_one_set__score_user_two'))),
            wins_as_user_two=Count('match_user_two_set', filter=Q(match_user_two_set__score_user_two__gt=F('match_user_two_set__score_user_one')))
        ).annotate(total_wins=F('wins_as_user_one') + F('wins_as_user_two'))

        most_wins_user = users_with_wins.order_by('-total_wins').first().username
        return most_wins_user

    def get_avg_score(self, obj):
        user = User.objects.annotate(
                avg_score_as_user_one=Avg('match_user_one_set__score_user_one'),
                avg_score_as_user_two=Avg('match_user_two_set__score_user_two')
            ).filter(id=obj.id).first()
        if user.avg_score_as_user_one is not None and user.avg_score_as_user_two is not None:
            return (user.avg_score_as_user_one + user.avg_score_as_user_two ) / 2
        elif user.avg_score_as_user_one is None:
            return user.avg_score_as_user_two
        elif user.avg_score_as_user_two is None:
            return user.avg_score_as_user_one
    
    def get_last_achiev(self, obj):
        last_achievement = UserAchievements.objects.filter(user_id=obj.id).order_by('-achive_date').first()
        if last_achievement:
            return AchievementSerializer(instance=Achievements.objects.get(achievement_id=last_achievement.achievement_id)).data
        else :
            return None
    
    def get_loses(self, obj):
        return get_lose_games(obj)

    def get_wins(self, obj):
        return get_win_games(obj)

    def get_tackles(self, obj):
        return get_tackles(obj)

    def get_scores(self, obj):
        return get_scores(obj)
    
    def get_win_rate(self, obj):
        return get_win_rate(obj)

    def get_future_predictions(self, obj):
        user_matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        if user_matches.count() < 2:
            return ({'Not enough match data to generate future predictions'})
        if user_matches.exists():
            data = []
            for match in user_matches:
                if match.user_one == obj:
                    data.append({'ds': match.match_start, 'y': match.score_user_one})
                else:
                    data.append({'ds': match.match_start, 'y': match.score_user_two})

            df = pd.DataFrame(data)
            df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)

            model = Prophet()
            model.fit(df)

            future = model.make_future_dataframe(30)
            forecast = model.predict(future)
            forecast['yhat'] = forecast['yhat'].clip(lower=0, upper=7)
            future_predictions_with_dates = [
                {
                    "date": row['ds'].strftime('%Y-%m-%d'),
                    "predicted_score": row['yhat']
                }
                for _, row in forecast.iterrows()
            ]
            return future_predictions_with_dates
        return None
    
    def get_player_matches(self, obj):
        matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))
        match_data = []
        for match in matches:
            if match.user_one == obj:
                opponent = match.user_two
                player_score = match.score_user_one
                opponent_score = match.score_user_two
            else:
                opponent = match.user_one
                player_score = match.score_user_two
                opponent_score = match.score_user_one
            
            match_data.append({
                'date': match.match_start.strftime('%Y-%m-%d'),
                'player_name': obj.username,
                'opponent_name': opponent.username,
                'player_score': player_score,
                'opponent_score': opponent_score,
                'result': match.get_match_result(obj)
            })
        return match_data