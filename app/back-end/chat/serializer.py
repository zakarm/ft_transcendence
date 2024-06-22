from rest_framework import serializers
from .models import Messages
from dashboards.models import Friendship
from django.db.models import F, Q
from authentication.models import User

class MessageSerializer(serializers.ModelSerializer):
    chat_id = serializers.SerializerMethodField()
    class Meta:
        model = Messages
        fields = '__all__'
    
    def get_chat_id(self, obj):
        chat_id = Friendship.objects.filter(Q(user_from = obj.user_one, user_to = obj.user_two) | 
                                            Q(user_from = obj.user_two, user_to = obj.user_one))
        return chat_id[0].freindship_id if chat_id else None
    
class UserMessageSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('username', 'messages')
    
    def get_messages(self, obj):
        messages = Messages.objects.filter(Q(user_one = obj) | Q(user_two = obj))
        serializer = MessageSerializer(messages ,many = True)
        return serializer.data
