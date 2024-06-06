from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime
from .models import Tournaments, GameTable
from rest_framework import status
from authentication.models import User
from .serializer import (TournamentsSerializer,
                         GameSettingsSerializer,
                         TournamentCreationSerializer,
                         UserTournamentsSerializer,
                         UserAchievementsSerializer)
from drf_spectacular.utils import extend_schema
from django.utils import timezone

class TournamentsDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Retrieve tournament data",
        responses={
            200: UserTournamentsSerializer(),
            401: "Authentication credentials were not provided"
        },
        tags=["Tournaments"]
    )

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserTournamentsSerializer(instance=user)
        return Response(serializer.data)


class AchievementsDataViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Retrieve user achievements",
        request=None,  # There is no request body for a GET request
        responses={
            200: UserAchievementsSerializer(many=False),
            401: "Authentication credentials were not provided",
        },
        tags=["Achievements"]
    )

    def get(self, request):
        user = request.user
        serializer = UserAchievementsSerializer(instance=user)
        return Response(serializer.data)

class CreateTournament(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Create a new tournament",
        request = TournamentCreationSerializer,
        responses={
            200: {'description': 'Tournament created', 'content': {'application/json': {}}},
            400: {'description': 'Bad request', 'content': {'application/json': {}}}
        },
        tags=["Tournaments"]
    )

    def post(self, request):
        serializer = TournamentCreationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Tournament created'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GameSettingsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Retrieve game settings for the authenticated user.",
        responses={
            200: GameSettingsSerializer,
            401: "Authentication credentials were not provided"
        },
        tags=["Settings"]
    )
    def get(self, request):
        user = request.user
        serializer = GameSettingsSerializer(instance=user)
        return Response(serializer.data)
    
    @extend_schema(
        description="Update game settings for the authenticated user.",
        request=GameSettingsSerializer,
        responses={
            200: {'description': 'Settings updated successfully'},
            400: {'description': 'Bad request', 'content': {'application/json': {}}}
        },
        tags=["Settings"]
    )
    def put(self, request):
        user = request.user
        serializer = GameSettingsSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            user_data = User.objects.get(id=user.id)
            user_data.first_name = request.data.get('first_name', user_data.first_name )
            user_data.last_name = request.data.get('last_name', user_data.last_name )
            user_data.username = request.data.get('nick_name', user_data.username )
            user_data.image_url = request.data.get('image_url', user_data.image_url )
            user_data.is_2fa_enabled = request.data.get('is_2fa_enabled', user_data.is_2fa_enabled )
            user_data.two_fa_secret_key = request.data.get('two_fa_secret_key', user_data.two_fa_secret_key)
            user_data.email = request.data.get('email', user_data.email)
            if request.data.get('country'):
                user_data.location = request.data.get('country')
            if request.data.get('city'):
                user_data.location += '/' + request.data.get('city')
            user_data.save()
            game_table, _ = GameTable.objects.get_or_create(user = user, 
                                                            defaults={'game_difficulty': 1, 
                                                                      'ball_color': '#ffffff',
                                                                      'paddle_color': '#ff4655',
                                                                      'table_color': '#161625'})
            game_table.ball_color = request.data.get('ball_color', game_table.ball_color)
            game_table.paddle_color = request.data.get('paddle_color', game_table.paddle_color)
            game_table.game_difficulty = request.data.get('game_difficulty', game_table.game_difficulty)
            game_table.table_color = request.data.get('table_color', game_table.table_color)
            game_table.save()
            return Response({"success": 'Settings updated'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
