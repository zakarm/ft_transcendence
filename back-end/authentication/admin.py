from django.contrib import admin
from .models import User
from django.contrib.auth.models import BaseUserManager


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'last_login', 'image_url', 'cover_url')
    search_fields = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'last_login', 'image_url', 'cover_url')
    readonly_fields = ('id', 'date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(User, UserAdmin)