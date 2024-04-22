"""Module providing rest views"""
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import MainDashboardSerializer, ProfileSerializer
from game.models import Match
from authentication.models import User
from rest_framework.response import Response
from django.db.models import Prefetch
import sys

class MainDashboardView(APIView):
    """
    This view requires JWT authentication and is only accessible to authenticated users.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handle GET requests to retrieve data for the main dashboard.
        """
        user = request.user
        user_data = User.objects.prefetch_related(
            Prefetch('match_user_one_set', queryset=Match.objects.filter(user_one=user)),
            'match_user_one_set'
        ).get(id=user.id)
        serializer = MainDashboardSerializer(instance=user_data)
        return Response(serializer.data)


class ProfileView(APIView):
    """
    This view requires JWT authentication and is only accessible to authenticated users.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        """
         Handle GET requests to retrieve data for the profile.
        """
        user = request.user
        user_data = User.objects.get(id=user.id)
        serializer_data = ProfileSerializer(instance=user_data)
        data = serializer_data.data
        serializer_data.get_month_data(user_data)
        data['total_games'] = str(serializer_data.get_total_games(user_data))
        data['win'] = str(serializer_data.get_win_games(user_data))
        data['lose'] = str(serializer_data.get_lose_games(user_data))
        data['summary'] = serializer_data.get_month_data(user_data)
        return Response(data)