from django.contrib import admin
from .models import Users
from django.contrib.auth.models import BaseUserManager

# class CustomUserAdmin(BaseUserManager):
#     list_display = ('email', 'first_name', 'last_name', 'is_staff')
#     search_fields = ('email', 'first_name', 'last_name')
#     readonly_fields = ('email', 'password',)
#     ordering = ('email',)

# admin.site.register(Users, CustomUserAdmin)
