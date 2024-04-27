"""
Module providing urls utils
"""
from django.urls import path, re_path
from .views import (SignIn2Fa, SignInView, SocialAuthExchangeView,
                    SocialAuthRedirectView, SignUpView, SignOutView)

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignInView.as_view(), name="sign-in"),
    path("sign-out", SignOutView.as_view(), name="sign-out"),

    path('two-fa', SignIn2Fa.as_view(), name="two-fa"),
    re_path(r'^social/(?P<platform>(github|42|google))/redirect$',
            SocialAuthRedirectView.as_view(), name='social-redirect'),
    re_path(r'^social/(?P<platform>(github|42|google))/callback$',
            SocialAuthExchangeView.as_view(), name='social-callback'),
]
