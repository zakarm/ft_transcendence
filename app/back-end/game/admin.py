from django.contrib import admin
from .models import Match
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    "Class for user display in admin page"
    list_display = ('match_id', 'user_one', 'user_two','score_user_one', 'score_user_two')
    search_fields = ('match_id', 'user_one', 'user_two','score_user_one', 'score_user_two')
    # readonly_fields = ('id', 'date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Match, UserAdmin)
