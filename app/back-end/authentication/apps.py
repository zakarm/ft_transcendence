"""
This module contains the configuration class for the authentication app in Django.
It sets the default auto field and the name of the app.
"""
from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    """
    This is the configuration class for the authentication app.
    It sets the default auto field and the name of the app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'
