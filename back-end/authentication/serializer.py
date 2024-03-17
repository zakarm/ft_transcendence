from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
import requests, sys
from requests.exceptions import RequestException
from django.db import IntegrityError, transaction


class UsersSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        user = authenticate(username=data.get('email'), password=data.get('password'))
        if not user:
            raise serializers.ValidationError("Incorrect email or password.")
        return user


class SocialAuthSerializer(serializers.Serializer):
    token = serializers.CharField()
    def validate(self, data):
        token = data.get('token')
        platform = self.context.get('platform')
        headers = {'Authorization': f'Bearer {token}'}
        if platform == 'github':
            try:
                response = requests.get('https://api.github.com/user', headers=headers)
                response.raise_for_status()
                user_info = response.json()
                email_response = requests.get('https://api.github.com/user/emails', headers=headers)
                email_response.raise_for_status()
                email_info = email_response.json()
                email = next((email['email'] for email in email_info if email['primary']), None)
                if not email:
                    email = next((email['email'] for email in email_info), None)
                if not email:
                    raise serializers.ValidationError("Email not provided by GitHub")
                if User.objects.filter(email=email).exists():
                    raise serializers.ValidationError("Email already exist")
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
                raise serializers.ValidationError("Failed to fetch user data from GitHub")
            except IntegrityError:
                raise serializers.ValidationError("Email already exists")
        elif platform == 'google':
            try :
                response = requests.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', headers=headers)
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
            except IntegrityError:
                raise serializers.ValidationError("Email already exists")
        elif platform == "42":
            try:
                print(headers, file=sys.stderr)
                response = requests.get('https://api.intra.42.fr/v2/me', headers=headers)
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
            except IntegrityError:
                raise serializers.ValidationError("Email already exists")
