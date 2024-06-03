from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime
from .models import Tournaments
from rest_framework import status
from authentication.models import User
from .serializer import (TournamentsSerializer,
                         UserTournamentsSerializer,
                         UserAchievementsSerializer)
from django.utils import timezone

class TournamentsDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        all_tournaments = Tournaments.objects.all()
        ongoing_tournaments = all_tournaments.filter(tournament_end__isnull=True)
        completed_tournaments = all_tournaments.filter(tournament_end__isnull=False)
        my_tournaments = all_tournaments.filter(crated_by_me=True)

        data = {
            "All": TournamentsSerializer(all_tournaments, many=True).data,
            "Ongoing": TournamentsSerializer(ongoing_tournaments, many=True).data,
            "Completed": TournamentsSerializer(completed_tournaments, many=True).data,
            "My Tournament": TournamentsSerializer(my_tournaments, many=True).data,
        }

        return Response(data)

class AchievementsDataViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserAchievementsSerializer(instance=user)
        return Response(serializer.data)

class CreateTournament(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            user_data = User.objects.get(id=user.id)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        username = request.get('username')
        tournament_name = request.get('tournament_name')
        image_url  = request.get('tournament_image')
        game_difficulty = request.get('game_difficulty')
        tour = Tournaments.objects.create(tournament_name = tournament_name, image_url = image_url,
                                   game_difficulty = game_difficulty, tournament_start = datetime.now(),
                                   crated_by_me=True, player_tournament = username)
        tour.save()
        