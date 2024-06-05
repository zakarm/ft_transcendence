from rest_framework import serializers
from authentication.models import User
from game.models import Match, UserAchievements, Achievements
from django.db.models import Count, F, Q, Avg
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from datetime import datetime
import numpy as np
import pandas as pd
from prophet import Prophet
import sys
from django.utils import timezone
import random
from datetime import timedelta

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = '__all__'

class StatisticsSerializer(serializers.ModelSerializer):
    top_player = serializers.SerializerMethodField()
    avg_score = serializers.SerializerMethodField()
    last_achiev = serializers.SerializerMethodField()
    future_predictions = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'top_player', 'avg_score', 'last_achiev', 'future_predictions')
    
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
        print(last_achievement.achievement_id, file=sys.stderr)
        if last_achievement:
            return AchievementSerializer(instance=Achievements.objects.get(achievement_id=last_achievement.achievement_id)).data
        else :
            return None


    
    def get_future_predictions(self, obj):
        for _ in range(100):
            # Generate a random start date from now to 6 months in the past
            match_start = timezone.now() - timedelta(days=random.randint(0, 30*6))
            match_end = match_start + timedelta(hours=random.randint(1, 3))
            user_one_score = random.randint(0, 7)
            user_two_score = random.randint(0, 7) if user_one_score < 7 else 7
            match = Match.objects.create(
                user_one_id=1,  # Replace with the actual user ID
                user_two_id=2,  # Replace with the actual user ID
                score_user_one=user_one_score,
                score_user_two=user_two_score,
                match_start=match_start.strftime("%Y-%m-%d %H:%M:%S"),
                match_end=match_end.strftime("%Y-%m-%d %H:%M:%S"),
                tackle_user_one=random.randint(0, 10),
                tackle_user_two=random.randint(0, 10)
            )
            match.save()
        # Filter matches for the specified user
        user_matches = Match.objects.filter(Q(user_one=obj) | Q(user_two=obj))

        if user_matches.exists():
            # Prepare the data for Prophet
            data = []
            for match in user_matches:
                if match.user_one == obj:
                    data.append({'ds': match.match_start, 'y': match.score_user_one})
                else:
                    data.append({'ds': match.match_start, 'y': match.score_user_two})

            df = pd.DataFrame(data)

            # Ensure the 'ds' column is in datetime format and remove timezone
            df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)

            print(df, file = sys.stderr)
            # Initialize and fit the model
            model = Prophet()
            model.fit(df)

            # Create a dataframe with future dates
            future_dates = pd.DataFrame({
                'ds': pd.to_datetime(['2024-06-13', '2024-06-14'])
            })

            # Make predictions
            forecast = model.predict(future_dates)
            
            # Clamp the predictions to be within the range [0, 7]
            future_predictions_with_dates = [
                {
                    "date": row['ds'].strftime('%Y-%m-%d'),
                    "predicted_score": row['yhat']
                }
                for _, row in forecast.iterrows()
            ]

            return future_predictions_with_dates

        return None
