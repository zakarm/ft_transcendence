import sys
import requests
import pyotp
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db import IntegrityError
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timezone

class UsersSignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=55, min_length=8, allow_blank=False)
    password = serializers.CharField(write_only=True, max_length=100, min_length=8,
                                     required = True)
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'username')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        if not user.username:
            user.username = user.email.split('@')[0]
        user.save()
        return user

class UserSignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=55, min_length=8, allow_blank=False)
    password = serializers.CharField(write_only=True, max_length=100, min_length=8,
                                     required = True)
    def validate(self, data):
        user = authenticate(email=data.get('email'), password=data.get('password'))
        if not user:
            raise serializers.ValidationError({"error": "Unauthorized. Invalid credentials provided."})
        user.save()
        if user.is_2fa_enabled:
            url_code = pyotp.totp.TOTP(user.two_fa_secret_key).provisioning_uri(
                name = user.email, issuer_name = "ft_transcendence")
            data['user'] = user
            data['url_code'] = url_code
            return data
        data['user'] = user
        return data

class User2FASerializer(serializers.Serializer):
    otp = serializers.CharField()
    email = serializers.CharField()
    def validate(self, data):
        email = data.get('email')
        user = User.objects.get(email = email)
        if not user:
            raise serializers.ValidationError("Invalid email.")
        # print(user.two_fa_secret_key, file = sys.stderr)
        verifier = pyotp.TOTP(user.two_fa_secret_key)
        # print(verifier.verify(data.get('otp')), file = sys.stderr)
        server_time = datetime.now()
        print(f"Server time: {server_time}", file=sys.stderr)
        print(f"User email: {user.email}", file=sys.stderr)
        print(f"User 2FA Secret Key: {user.two_fa_secret_key}", file=sys.stderr)
        print(f"OTP provided by user: {data.get('otp')}", file=sys.stderr)
        print(f"Current OTP from TOTP: {verifier.now()}", file=sys.stderr)
        print(f"OTP verification result: {verifier.verify(data.get('otp'))}", file=sys.stderr)

        if not  pyotp.TOTP(user.two_fa_secret_key).verify(data.get('otp'), valid_window=1):
            raise serializers.ValidationError("Invalid 2FA code.")
        return user


class SocialAuthSerializer(serializers.Serializer):
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
                    if user_info.get('name') and ' ' in  user_info.get('name'):
                        user.first_name = user_info.get('name').split()[0]
                        user.last_name = user_info.get('name').split()[1]
                    else :
                        user.first_name = user_info.get('name')
                        user.last_name = ''
                    user.username = user_info.get('login')
                    data_img = user_info.get('avatar_url')
                    user.image_url = data_img if data_img else 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg'
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
                username = user_info['name']
                user ,created = User.objects.get_or_create(email=email)
                if created:
                    user.first_name = firstname
                    user.last_name = lastname
                    user.image_url = image_url
                    user.username = username if username else user.email.split('@')[0]
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
                    user.location = user_info['campus'][0]['country'] + "/" + user_info['campus'][0]['city']
                    user.save()
                data['email'] = email
                return data
            except requests.exceptions.RequestException as e:
                raise serializers.ValidationError("Failed to fetch user data from 42")
            except IntegrityError as e:
                raise serializers.ValidationError("Email already exists") from e
        else :
            return None
