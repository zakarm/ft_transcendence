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

    def get_winner(self):
        if self.score_user_one > self.score_user_two:
            return self.user_one
        elif self.score_user_two > self.score_user_one:
            return self.user_two
        return None

    def get_match_result(self, player):
        winner = self.get_winner()
        if winner is None:
            return 'Draw'
        elif winner == player:
            return 'WIN'
        return 'LOSS'

class Tournaments(models.Model):
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=30, unique=True)
    tournament_start = models.DateTimeField()
    tournament_end = models.DateTimeField(blank=True, null=True)
    crated_by_me = models.BooleanField(default=False)
    image_url = models.URLField(max_length=350)
    game_difficulty = models.IntegerField()
    class Meta:
        db_table = 'Tournaments'

class Tournamentsmatches(models.Model):
    id = models.AutoField(primary_key=True)
    tournament = models.ForeignKey(Tournaments, models.DO_NOTHING)
    match = models.ForeignKey(Match, models.DO_NOTHING)
    tournament_round = models.CharField(max_length=30)
    class Meta:
        db_table = 'TournamentsMatches'
        unique_together = (('tournament', 'match'),)

class TournamentsUsernames(models.Model):
    tournament = models.OneToOneField(Tournaments, models.DO_NOTHING, primary_key=True)
    user = models.ForeignKey('authentication.User', models.DO_NOTHING)
    user_display_name = models.CharField(max_length=30, unique=True)
    class Meta:
        db_table = 'TournamentsUsernames'
        unique_together = (('tournament', 'user'),)

class Achievements(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    achievement_name = models.CharField(max_length=45)
    achievement_type = models.CharField(max_length=45)
    class Meta:
        db_table = 'Achievements'

class UserAchievements(models.Model):
    user = models.OneToOneField('authentication.User', models.DO_NOTHING, primary_key=True)
    achievement = models.ForeignKey(Achievements, models.DO_NOTHING)
    achive_date = models.DateTimeField()
    class Meta:
        db_table = 'UserAchievements'
        unique_together = (('user', 'achievement'),)

class GameTable(models.Model):
    game_table = models.AutoField(primary_key=True)
    user = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user')
    table_color = models.CharField(max_length=10, blank=True)
    ball_color = models.CharField(max_length=10, blank=True)
    paddle_color = models.CharField(max_length=10, blank=True)
    game_difficulty = models.IntegerField()
    table_position = models.CharField(max_length=255, blank=True)
    class Meta:
        db_table= 'GameTable'
