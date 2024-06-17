from rest_framework import serializers
from .models import Messages
from authentication.models import User

# class MessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Messages
#         fields = '__all__'
#     pass

# class UserMessageSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ('username', 'id', 'messages')