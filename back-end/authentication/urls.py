from django.urls import path, include
from .views import *

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignInView.as_view(), name="sign-in"),
    path("sign-out", SignUpView.as_view(), name="sign-out"),
    path('social/<str:platform>', SocialAuthView.as_view(), name='social-auth'),

    path('github/auth', GitHubAuthRedirectView.as_view(), name='github/auth'),
    path('github/callback', GitHubAuthExchangeView.as_view(), name='github/callback'),
    path('google/callback', GoogleAuthExchangeView.as_view(), name="google/callback"),
    path('google/auth', GoogleAuthRedirectView.as_view(), name="google/auth")
]   