from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import MainDashboardSerializer, ProfileSerializer
from authentication.models import User
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
        print(id, file=sys.stderr)
        user = User.objects.get(id=id)
        serializer_data = ProfileSerializer(instance=user)
        return Response(serializer_data.data)
