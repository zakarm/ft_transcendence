"""
Module providing rest serailizers
"""
import sys
import requests
import pyotp
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db import IntegrityError
from .models import User

class UsersSignUpSerializer(serializers.ModelSerializer):
    """
    Serializer class for UsersSignUp
    """
    class Meta:
        """
        Meta class for UsersSignUp serializer
        """
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'username')
        extra_kwargs = {'password': {'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSignInSerializer(serializers.Serializer):
    """
    Serializer class for UsersSignIn
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        """
        Validate method for UsersSignIn serializer
        """
        user = authenticate(email=data.get('email'), password=data.get('password'))
        if not user:
            raise serializers.ValidationError("Incorrect email or password.")
        user.save()
        if user.is_2fa_enabled:
            user.two_fa_secret_key = pyotp.random_base32()
            user.save()
            url_code = pyotp.totp.TOTP(user.two_fa_secret_key).provisioning_uri(
                name = user.email, issuer_name = "ft_transcendence")
            data['user'] = user
            data['url_code'] = url_code
            return data
        data['user'] = user
        return data

class User2FASerializer(serializers.Serializer):
    """
    Serializer class for User2FA
    """
    otp = serializers.CharField()
    email = serializers.CharField()
    def validate(self, data):
        """
        Validate method for User2FA serializer
        """
        email = data.get('email')
        user = User.objects.get(email = email)
        print(user, file = sys.stderr)
        if not user:
            raise serializers.ValidationError("Invalid email.")
        verifier = pyotp.TOTP(user.two_fa_secret_key)
        if not verifier.verify(data.get('otp')):
            raise serializers.ValidationError("Invalid 2FA code.")
        return user


class SocialAuthSerializer(serializers.Serializer):
    """
    Serializer class for SocialAuth
    """
    def validate(self, data):
        """
        Validate method for SocialAuth serializer
        """
        token = self.context.get('access_token')
        platform = self.context.get('platform')
        headers = {'Authorization': f'Bearer {token}'}
        if platform == 'github':
            try:
                response = requests.get('https://api.github.com/user', 
                                        headers=headers, timeout=10000)
                response.raise_for_status()
                user_info = response.json()
                email_response = requests.get('https://api.github.com/user/emails', 
                                              headers=headers, timeout=10000)
                email_response.raise_for_status()
                email_info = email_response.json()
                email = next((email['email'] for email in email_info if email['primary']), None)
                if not email:
                    email = next((email['email'] for email in email_info), None)
                if not email:
                    raise serializers.ValidationError("Email not provided by GitHub")
                user, created = User.objects.get_or_create(email=email)
                if created:
                    user.email = email
                    if user_info.get('name'):
                        user.first_name = user_info.get('name').split()[0]
                        user.last_name = user_info.get('name').split()[1]
                    user.username = user_info.get('login')
                    user.image_url = user_info.get('avatar_url')
                    user.location = user_info.get('location')
                    user.save()
                data['email'] = email
                return data
            except requests.exceptions.RequestException as e:
                raise serializers.ValidationError(f"Failed to fetch user data from GitHub : {e}")
            except IntegrityError as e:
                raise serializers.ValidationError("Email already exists") from e
        elif platform == 'google':
            try :
                response = requests.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', 
                                        headers=headers,timeout=10000)
                response.raise_for_status()
                user_info = response.json()
                email = user_info['email']
                firstname = user_info['given_name']
                lastname = user_info['family_name']
                image_url = user_info['picture']
                user ,created = User.objects.get_or_create(email=email)
                if created:
                    user.first_name = firstname
                    user.last_name = lastname
                    user.image_url = image_url
                    user.save()
                data['email'] = email
                return data
            except requests.exceptions.RequestException as e:
                raise serializers.ValidationError("Failed to fetch user data from Google")
            except IntegrityError as e:
                raise serializers.ValidationError("Email already exists") from e
        elif platform == "42":
            try:
                print(headers, file=sys.stderr)
                response = requests.get('https://api.intra.42.fr/v2/me', headers=headers, 
                                        timeout=1000)
                response.raise_for_status()
                user_info = response.json()
                email = user_info['email']
                user ,created = User.objects.get_or_create(email=email)
                if created:
                    user.username = user_info['login']
                    user.first_name = user_info['first_name']
                    user.last_name = user_info['last_name']
                    user.image_url = user_info['image']['link']
                    user.location = user_info['campus'][0]['city']
                    user.save()
                data['email'] = email
                return data
            except requests.exceptions.RequestException as e:
                raise serializers.ValidationError("Failed to fetch user data from 42")
            except IntegrityError as e:
                raise serializers.ValidationError("Email already exists") from e
