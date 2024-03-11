from django.urls import path
from .views import *

urlpatterns = [
    path("sign-up", SignUpView.as_view(), name="sign-up"),
    path("sign-in", SignIn.as_view(), name="sign-in"),
    path("sign-out", SignUpView.as_view(), name="sign-out"),
]