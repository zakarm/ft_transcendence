"""
URL configuration for ft_transcendence project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# from django.contrib import admin
# from django.urls import path, include
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
#     TokenVerifyView,
# )
# from drf_spectacular.views import (
#     SpectacularAPIView,
#     SpectacularRedocView,
#     SpectacularSwaggerView,
# )

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", include("authentication.urls")),
#     path("api/", include("dashboards.urls")),
#     path("api/", include("game.urls")),
#     path("api/", include("game.urls")),
#     path("api/", include("compu_ai.urls")),
#     path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
#     path("api/refresh", TokenRefreshView.as_view(), name="token_refresh"),
#     path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
#     path( "api/schema/swagger/", SpectacularSwaggerView.as_view(url_name="schema"),  name="swagger" ),
#     path( "api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"),  name="redoc" ),
#     path("", include("django_prometheus.urls")),
#     path("api/", include("chat.urls")),
# ]

from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    # TokenVerifyView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from django.http import JsonResponse

def default_handler(request, *args, **kwargs):
    return JsonResponse({"error": ["Not found"]}, status=404)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("authentication.urls")),
    path("api/", include("dashboards.urls")),
    path("api/", include("game.urls")),
    path("api/", include("compu_ai.urls")),
    path("api/", include("chat.urls")),
    path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    # path("api/verify", TokenVerifyView.as_view(), name="token_verify" ),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger"),
    path( "api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("", include("django_prometheus.urls")),
    # re_path(r"^.*$", default_handler),
    re_path(r'^(?!admin).*$', default_handler),
]
