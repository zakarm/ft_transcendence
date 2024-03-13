from rest_framework import serializers
from .models import Users
from django.contrib.auth import authenticate
import requests
from requests.exceptions import RequestException


class UsersSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        extra_kwargs = {'password': {'required': True}, 'id': {'read_only': True}, 'email': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Users.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserSignInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("email", "password")
        extra_kwargs = {'password': {'required': True}, 'id': {'read_only': True}, 'email': {'write_only': True}}

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class GithubAuthSerializer(serializers.Serializer):
    token = serializers.CharField()
    class Meta:
        fields = ('token',)
        extra_kwargs = {'token': {'required': True}}

    def validate(self, data):
        token = data.get('token')
        headers = {'Authorization': f'token {token}'}
        
        try:
            response = requests.get('https://api.github.com/user', headers=headers)
            response.raise_for_status()
            user_info = response.json()
            username = user_info.get('login')
            if not username:
                raise serializers.ValidationError("GitHub username not found in response")

            email_response = requests.get('https://api.github.com/user/emails', headers=headers)
            email_response.raise_for_status()
            email_info = email_response.json()
            email = next((email['email'] for email in email_info if email['primary']), None)
            if not email:
                email = next((email['email'] for email in email_info), None)
            if not email:
                raise serializers.ValidationError("Email not provided by GitHub")

            user, created = Users.objects.get_or_create(username=username)
            if created:
                user.email = email
                user.save()

            return data
        except requests.exceptions.RequestException as e:
            raise serializers.ValidationError("Failed to fetch user data from GitHub")
