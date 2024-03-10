from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password

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
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        