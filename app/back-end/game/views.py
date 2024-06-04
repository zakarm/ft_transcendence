from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime
from .models import Tournaments
from rest_framework import status
from authentication.models import User
from .serializer import (TournamentsSerializer,
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
        serializer = TournamentCreationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Tournament created'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)