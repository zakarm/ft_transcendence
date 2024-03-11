from rest_framework import serializers
from .models import Users
from django.contrib.auth import authenticate

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