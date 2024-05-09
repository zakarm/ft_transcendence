from django.contrib import admin
from .models import Friendship, Notification

# Register your models here.
admin.site.register(Friendship)
admin.site.register(Notification)
