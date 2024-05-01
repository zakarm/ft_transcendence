from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import (MainDashboardSerializer,
                         ProfileSerializer,
                         FriendsSerializer)
from authentication.models import User
from rest_framework import status
import sys
 
class MainDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer_data = MainDashboardSerializer(instance=user)
        return Response(serializer_data.data)


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer_data = ProfileSerializer(instance=user)
        return Response(serializer_data.data)


class ProfileIdView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer_data = ProfileSerializer(instance=user)
            return Response(serializer_data.data)
        except User.objects.model.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class FriendsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = FriendsSerializer(instance=user)
        return Response(serializer.data)
