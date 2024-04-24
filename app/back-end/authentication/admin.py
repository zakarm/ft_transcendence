"""Module providing a User class."""
from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    "Class for user display in admin page"
    list_display = ('id', 'email', 'username','first_name', 'last_name', 'is_staff', 'is_active',
                    'date_joined', 'is_superuser', 'last_login', 'image_url',
                    'cover_url', 'location')
    search_fields = ('id', 'email', 'username','first_name', 'last_name', 'is_staff', 'is_active',
                     'date_joined', 'is_superuser', 'last_login',
                     'image_url', 'cover_url', 'location')
    readonly_fields = ('id', 'date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(User, UserAdmin)
