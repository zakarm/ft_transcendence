from django.urls import path
from .views import (MainDashboardView,
                    ProfileView,
                    ProfileIdView,
                    FriendsView,
                    UserSearchView,
                    RemoveFriendshipView,
                    AcceptFriendshipView,
                    AddFriendshipView,
                    BlockFriendshipView,
                    UnblockFriendshipView,
                    BlockedFriendsView,
                    NotificationsView,
                    GameHistoryReportView,
                    NotificationDetailView
                   )

urlpatterns = [
   path('dashboard', MainDashboardView.as_view(), name='dashboard'),
   path('profile', ProfileView.as_view(), name='profile'),
   path('profile/<str:username>', ProfileIdView.as_view(), name='profile_with_id'),
   path('friends', FriendsView.as_view(), name='friends'),
   path('user-search', UserSearchView.as_view(), name='user-search'),
   path('friends-remove', RemoveFriendshipView.as_view(), name="friends-remove"),
   path('friends-accept', AcceptFriendshipView.as_view(), name="friends-accept"),
   path('friends-add', AddFriendshipView.as_view(), name="friends-add"),
   path('friends-block', BlockFriendshipView.as_view(), name="friends-block"),
   path('friends-unblock', UnblockFriendshipView.as_view(), name="friends-unblock"),
   path('blocked-friends', BlockedFriendsView.as_view(), name="friends-unblock"),
   path('game-stats-report', GameHistoryReportView.as_view(), name="game-stats-report"),
   path('notifications', NotificationsView.as_view(), name="notifications"),
   path('notification-delete/<int:notification_id>', NotificationDetailView.as_view(), name='notification-delete'),
]
