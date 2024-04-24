"""
Module providing rest views
"""
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import MainDashboardSerializer, ProfileSerializer

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
        serializer_data = MainDashboardSerializer(instance=user)
        return Response(serializer_data.data)


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
        serializer_data = ProfileSerializer(instance=user)
        return Response(serializer_data.data)
