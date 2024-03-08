from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password

class UsersSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': True}, 'user_id': {'read_only': True}}

    def create(self, validated_data):
        user = Users.objects.create(**validated_data)
        user.password = make_password(validated_data['password'])
        user.save()
        return user

class UsersSignInSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['nick_name', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        