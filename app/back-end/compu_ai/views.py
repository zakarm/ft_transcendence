from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializer import StatisticsSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class StatisticsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = StatisticsSerializer(instance=user)
        return Response(serializer.data)
