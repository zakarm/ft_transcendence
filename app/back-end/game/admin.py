from django.contrib import admin
from .models import (Match,
                     Tournaments,
                     Tournamentsmatches,
                     Achievements,
                     UserAchievements,
                     GameTable)

class UserAdmin(admin.ModelAdmin):
    "Class for user display in admin page"
    list_display = ('match_id', 'user_one', 'user_two','score_user_one', 'score_user_two')
    search_fields = ('match_id', 'user_one', 'user_two','score_user_one', 'score_user_two')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Match, UserAdmin)
admin.site.register(Tournamentsmatches)
admin.site.register(Tournaments)
admin.site.register(Achievements)
admin.site.register(UserAchievements)
admin.site.register(GameTable)