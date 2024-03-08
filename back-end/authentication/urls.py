from django.urls import path
from .views import *


urlpatterns = [
    path("sign-up", SignUp.as_view(), name="sign-up"),
    path("sign-in", SignUp.as_view(), name="sign-in"),
    path("sign-out", SignUp.as_view(), name="sign-out"),
]