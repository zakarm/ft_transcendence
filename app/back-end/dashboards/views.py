from rest_framework.views import APIView
# from rest_
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import (MainDashboardSerializer,
                         ProfileSerializer,
                         FriendsSerializer,
                         UserSerializer,
                         BlockedFriendsSerializer,
                         NotificationUserSerializer,
                         GameHistorySerializer)
from .models import Friendship, Notification
from authentication.models import User
from rest_framework import status
from rest_framework.generics import GenericAPIView
from django.db.models import F, Q
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.contrib.auth.models import AnonymousUser

 
class MainDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = MainDashboardSerializer

    def get(self, request):
        user = request.user
        serializer_data = self.serializer_class(instance=user)
        return Response(serializer_data.data)


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get(self, request):
        user = request.user
        serializer_data = self.serializer_class(instance=user)
        return Response(serializer_data.data)


class ProfileIdView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
            serializer_data = self.serializer_class(instance=user)
            return Response(serializer_data.data)
        except User.objects.model.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class FriendsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(instance=user)
        return Response(serializer.data)

class UserSearchView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def post(self, request):
        user = request.data['username_search']
        queryset = User.objects.filter(username__startswith=user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class RemoveFriendshipView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def post(self, request):
        user_from = request.user
        username = request.data.get('username')

        try:
            user_remove = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friendship = Friendship.objects.get(Q(user_from=user_from, user_to=user_remove)|
                                                Q(user_from=user_remove, user_to=user_from))
            if friendship.u_one_is_blocked_u_two == True or friendship.u_two_is_blocked_u_one == True:
                return Response({'error': 'Friendship blocked'}, status=status.HTTP_400_BAD_REQUEST)
            friendship.delete()
            return Response({'success': 'Friendship removed'}, status=status.HTTP_200_OK)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class AcceptFriendshipView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def post(self, request):
        user_from = request.user
        username = request.data.get('username')
        try:
            user_accept = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friendship = Friendship.objects.get(Q(user_from=user_from, user_to=user_accept)|
                                                Q(user_from=user_accept, user_to=user_from))
            if friendship.is_accepted == True:
                return Response({'error': 'Friendship already accepted'}, status=status.HTTP_400_BAD_REQUEST)
            elif friendship.u_one_is_blocked_u_two == True or friendship.u_two_is_blocked_u_one == True:
                return Response({'error': 'Friendship blocked'}, status=status.HTTP_400_BAD_REQUEST)
            friendship.is_accepted = True;
            friendship.save()
            return Response({'success': 'Friendship accepted'}, status=status.HTTP_200_OK)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class AddFriendshipView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def post(self, request):
        user_from = request.user
        username = request.data.get('username')
        try:
            user_add = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        if user_from.id == user_add.id:
            return Response({'error': 'wach nta wa7id t ajoute rassk?'}, status=status.HTTP_400_BAD_REQUEST)
        elif Friendship.objects.filter(Q(user_from=user_from, user_to=user_add) |
                                     Q(user_from=user_add, user_to=user_from)).exists():
            return Response({'error': 'Friendship alrady exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:

            friendship = Friendship.objects.create(user_from=user_from, user_to=user_add, 
                                                   is_accepted = False)
            friendship.save()

            notification = Notification.objects.create(user=user_add,
                                                       title='New friend !',
                                                       message=f"{user_from.username} sent you a friend request.",
                                                       image_url=user_from.image_url,
                                                       link = f"http://localhost:3000/profile/{user_from.username}", 
                                                       is_friend_notif = True, 
                                                       action_by = user_from.username)
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"room_{user_add.id}",
                {
                    "type": "send_notification",
                    "notification_id": notification.notification_id,
                    "count": Notification.objects.filter(user = user_add).count(),
                    "is_chat_notif": notification.is_chat_notif,
                    "is_friend_notif": notification.is_friend_notif,
                    "is_tourn_notif": notification.is_tourn_notif,
                    "is_match_notif": notification.is_match_notif,
                },
            )
            return Response({'success': 'Friendship Added'}, status=status.HTTP_200_OK)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

def serialize_user(user):
    if isinstance(user, AnonymousUser):
        return None
    return {
        'id': user.id,
        'username': user.username,
        'image_url': user.image_url,
    }

class BlockFriendshipView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def block_friend(self, friendship, user_from):
        if friendship.user_from == user_from:
            block_flag = 'u_one_is_blocked_u_two'
        else:
            block_flag = 'u_two_is_blocked_u_one'

        if getattr(friendship, block_flag):
            return Response({'error': 'Friend already blocked'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            setattr(friendship, block_flag, True)
            friendship.save()
            return Response({'success': 'Friend blocked'}, status=status.HTTP_200_OK)

    def post(self, request):
        user_from = request.user
        username = request.data.get('username')
        try:
            user_accept = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friendship = Friendship.objects.get(Q(user_from=user_from, user_to=user_accept)|
                                                Q(user_from=user_accept, user_to=user_from))
            return self.block_friend(friendship, user_from)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class UnblockFriendshipView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FriendsSerializer

    def unblock_friend(self, friendship, user_from):
        if friendship.user_from == user_from:
            block_flag = 'u_one_is_blocked_u_two'
        else:
            block_flag = 'u_two_is_blocked_u_one'
        
        if not getattr(friendship, block_flag):
            return Response({'error': 'Friend is not blocked'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            setattr(friendship, block_flag, False)
            friendship.save()
            return Response({'success': 'Friend unblocked'}, status=status.HTTP_200_OK)

    def post(self, request):
        user_from = request.user
        username = request.data.get('username')
        try:
            user_accept = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            friendship = Friendship.objects.get(Q(user_from=user_from, user_to=user_accept)|
                                                Q(user_from=user_accept, user_to=user_from))
            return self.unblock_friend(friendship, user_from)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class BlockedFriendsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BlockedFriendsSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(instance=user)
        return Response(serializer.data)

class NotificationsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationUserSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(instance=user)
        return Response(serializer.data)

class GameHistoryReportView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = GameHistorySerializer

    def post(self, request):
        user = request.user
        period = request.data.get("period")
        context = {"period": period}
        serializer = self.serializer_class(instance=user, context=context)
        return Response(serializer.data)
