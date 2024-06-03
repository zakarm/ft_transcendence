from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Tournaments
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