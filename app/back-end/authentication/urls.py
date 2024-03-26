from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignInView.as_view(), name="sign-in"),
    path("sign-out", SignUpView.as_view(), name="sign-out"),

    # re_path(r'^social/(?P<platform>(github|42|google))/auth$', SocialAuthView.as_view(), name='social-auth'),
    re_path(r'^social/(?P<platform>(github|42|google))/redirect$', SocialAuthRedirectView.as_view(), name='social-redirect'),
    re_path(r'^social/(?P<platform>(github|42|google))/callback$', SocialAuthExchangeView.as_view(), name='social-callback'),
]