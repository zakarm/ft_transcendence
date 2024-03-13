from django.urls import path, include
from .views import *

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignIn.as_view(), name="sign-in"),
    path("sign-out", SignUpView.as_view(), name="sign-out"),
    path('github', GithubLogin.as_view(), name='github'),
    path('github/auth', GitHubAuthRedirect.as_view(), name='github/auth'),
    path('github/exchange', GitHubAuthExchange.as_view(), name='github/exchange'),
]