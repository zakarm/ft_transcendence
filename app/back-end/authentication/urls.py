"""
Module providing urls utils
"""
from django.urls import path, re_path
from .views import (SignIn2Fa, SignInView, SocialAuthExchangeView,
                    SocialAuthRedirectView, SignUpView, SignOutView, 
                    VerifyTokenView, Control2Fa)

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignInView.as_view(), name="sign-in"),
    path("sign-out", SignOutView.as_view(), name="sign-out"),
    path("control-2fa", Control2Fa.as_view(), name="control-2fa"),
    path('two-fa', SignIn2Fa.as_view(), name="two-fa"),
    path('verify', VerifyTokenView.as_view(), name="verify"),
    re_path(r'^social/(?P<platform>(github|42|google))/redirect$',
            SocialAuthRedirectView.as_view(), name='social-redirect'),
    re_path(r'^social/(?P<platform>(github|42|google))/callback$',
            SocialAuthExchangeView.as_view(), name='social-callback'),
]
