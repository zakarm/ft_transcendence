import re

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema

from authentication.models import User
from .models import GameTable
from .serializer import (
    GameSettingsSerializer,
    TournamentCreationSerializer,
    UserTournamentsSerializer,
    UserAchievementsSerializer,
)


class TournamentsDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Retrieve tournament data",
        responses={
            200: UserTournamentsSerializer(),
            401: OpenApiTypes.OBJECT,
        },
        tags=["Tournaments"],
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
        request=None,
        responses={
            200: UserAchievementsSerializer(many=False),
            401: OpenApiTypes.OBJECT,
        },
        tags=["Achievements"],
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
        request=TournamentCreationSerializer,
        responses={
            200: {
                "description": "Tournament created",
                "content": {"application/json": {}},
            },
            400: {"description": "Bad request", "content": {"application/json": {}}},
            401: OpenApiTypes.OBJECT,
        },
        tags=["Tournaments"],
    )
    def post(self, request):
        context_ = {"request": request}
        serializer = TournamentCreationSerializer(data=request.data, context=context_)
        if serializer.is_valid():
            serializer.save()
            res_message = {"success": "Tournament created"}
            return Response(res_message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameSettingsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Retrieve game settings for the authenticated user.",
        responses={
            200: GameSettingsSerializer,
            401: OpenApiTypes.OBJECT,
        },
        tags=["Settings"],
    )
    def get(self, request):
        user = request.user
        serializer = GameSettingsSerializer(instance=user)
        return Response(serializer.data)

    @extend_schema(
        description="Update game settings for the authenticated user.",
        request=GameSettingsSerializer,
        responses={
            200: {"description": "Settings updated successfully"},
            401: OpenApiTypes.OBJECT,
        },
        tags=["Settings"],
    )
    def put(self, request):
        user = request.user
        serializer = GameSettingsSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            data = User.objects.get(id=user.id)
            data.first_name = request.data.get("first_name", data.first_name)
            data.last_name = request.data.get("last_name", data.last_name)
            data.username = request.data.get("username", data.username)
            data.display_name = request.data.get("display_name", data.display_name)
            data.image_url = request.data.get("image_url", data.image_url)
            data.email = request.data.get("email", data.email)
            data.quote = request.data.get("quote", data.quote)
            data.intro = request.data.get("intro", data.intro)
            data.is_2fa_enabled = request.data.get(
                "is_2fa_enabled", data.is_2fa_enabled
            )
            country = request.data.get("country")
            if country:
                if country == None or country == "":
                    return Response(
                        {"country": {"Country cannot be empty"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif len(country) < 3:
                    return Response(
                        {"country": {"Country name must be at least 3 characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif len(country) > 49:
                    return Response(
                        {"country": {"Country name must be at most 49 characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif not re.match("^[a-zA-Z- ]+$", country):
                    return Response(
                        {"country": {"Country name must contain only alphabetic characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                data.location = country
            
            city = request.data.get("city")
            if city:
                if city ==  None or city == "":
                    return Response(
                        {"city": {"City cannot be empty"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif len(city) < 3:
                    return Response(
                        {"city": {"City name must be at least 3 characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif len(city) > 49:
                    return Response(
                        {"city": {"City name must be at most 49 characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                elif not re.match("^[a-zA-Z- ]+$", city):
                    return Response(
                        {"city": {"City name must contain only alphabetic characters"}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if '/' in data.location:
                    data.location = data.location.split('/')[0]
                data.location += "/" + city
                
            data.save()
            game, _ = GameTable.objects.get_or_create(
                user=user,
                defaults={
                    "table_color": "#161625",
                    "ball_color": "#ffffff",
                    "paddle_color": "#ff4655",
                    "game_difficulty": 1,
                    "table_position": "6,8,0",
                },
            )
            game.table_color = request.data.get("table_color", game.table_color)
            game.ball_color = request.data.get("ball_color", game.ball_color)
            game.paddle_color = request.data.get("paddle_color", game.paddle_color)
            game.game_difficulty = request.data.get("game_difficulty", game.game_difficulty)
            game.table_position = request.data.get( "current_table_view", game.table_position)
            game.save()
            return Response({"success": "Settings updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
