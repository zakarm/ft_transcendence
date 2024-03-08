from rest_framework import serializers
from .models import Users

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': True}, 'user_id': {'read_only': True}}

    def create(self, validated_data):
        user = Users.objects.create(**validated_data)
        user.save()
        return user