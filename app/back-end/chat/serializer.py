from rest_framework import serializers
from .models import Messages
from django.db.models import F, Q
from authentication.models import User

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'

class UserMessageSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'username', 'messages')
    
    def get_messages(self, obj):
        messages = Messages.objects.filter(Q(user_one = obj) | Q(user_two = obj))
        serializer = MessageSerializer(messages ,many = True)
        return serializer.data
