from django.db import models

class Match(models.Model):
    match_id = models.AutoField(primary_key=True)
    user_one = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user_one', related_name='match_user_one_set')
    user_two = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                 db_column='user_two', related_name='match_user_two_set')
    score_user_one = models.IntegerField()
    score_user_two = models.IntegerField()
    match_start = models.DateTimeField()
    match_end = models.DateTimeField()
    tackle_user_one = models.IntegerField()
    tackle_user_two = models.IntegerField()
    class Meta:
        db_table = 'Matches'

class Tournaments(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=30)
    tournament_start = models.DateTimeField()
    tournament_end = models.DateTimeField()
    class Meta:
        db_table = 'Tournaments'

class Tournamentsmatches(models.Model):
    tournament = models.OneToOneField(Tournaments, models.DO_NOTHING, primary_key=True)
    match = models.ForeignKey(Match, models.DO_NOTHING)
    tournament_round = models.CharField(max_length=30)
    class Meta:
        db_table = 'TournamentsMatches'
        unique_together = (('tournament', 'match'),)


# class Achievements(models.Model):
#     achievement_id = models.AutoField(primary_key=True)
#     achiev_name = models.CharField(max_length=45)
#     xp_to_get = models.FloatField()
#     class Meta:
#         managed = False
#         db_table = 'Achievements'

# class Userachievements(models.Model):
#     user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
#     achivement = models.ForeignKey(Achievements, models.DO_NOTHING)
#     achive_date = models.DateTimeField()
#     class Meta:
#         managed = False
#         db_table = 'UserAchievements'
#         unique_together = (('user', 'achivement'),)

class GameTable(models.Model):
    game_table = models.AutoField(primary_key=True)
    user = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user')
    table_color = models.CharField(max_length=10, blank=True)
    ball_color = models.CharField(max_length=10, blank=True)
    paddle_color = models.CharField(max_length=10, blank=True)
    ball_color = models.IntegerField(blank=True)
    class Meta:
        db_table= 'GameTable'
