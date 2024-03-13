from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UsersSignUpSerializer, UserSignInSerializer, GithubAuthSerializer
from .models import Users
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import MissingBackend
from django.conf import settings
from django.shortcuts import redirect
from requests.exceptions import HTTPError
import requests
import os
class SignUpView(APIView):
    serializer_class = UsersSignUpSerializer
    def post(self, request):
        if Users.objects.filter(email=request.data['email']).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_201_CREATED)

class SignIn(APIView):
    serializer_class = UserSignInSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)

# send the access token to the front-end
class GitHubAuthExchange(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return Response({"error": "No code provided"}, status=400)
        data = {
            'client_id': settings.SOCIAL_AUTH_GITHUB_KEY,
            'client_secret': settings.SOCIAL_AUTH_GITHUB_SECRET,
            'code': code,
            'redirect_uri': settings.GITHUB_REDIRECT_URI,
        }
        headers = {'Accept': 'application/json'}
        try:
            response = requests.post('https://github.com/login/oauth/access_token', data=data, headers=headers)
            response.raise_for_status()
        except HTTPError as e:
            return Response({"error": str(e)}, status=400)
        access_token = response.json().get('access_token')
        if not access_token:
            return Response({"error": "No access token returned"}, status=400)
        return Response({"access_token": access_token})


class GitHubAuthRedirect(APIView):
    def get(self, request):
        CLIENT_ID = settings.SOCIAL_AUTH_GITHUB_KEY
        REDIRECT_URI = settings.GITHUB_REDIRECT_URI
        return redirect(f'https://github.com/login/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=user:email')


class GithubLogin(APIView):
    serializer_class = GithubAuthSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data.get('token')
        try:
            backend = load_backend(
                strategy=load_strategy(request),
                name='github',
                redirect_uri=None
            )
            user = backend.do_auth(token)
        except MissingBackend:
            return Response({'error': 'Invalid backend'}, status=status.HTTP_400_BAD_REQUEST)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
