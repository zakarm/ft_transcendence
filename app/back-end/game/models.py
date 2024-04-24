"""Module providing the data from the database mounted to models"""
from django.db import models

class Match(models.Model):
    """Class representing Matches"""
    match_id = models.AutoField(primary_key=True)
    user_one = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user_one', related_name='match_user_one_set')
    user_two = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                 db_column='user_two', related_name='match_user_two_set')
    score_user_one = models.IntegerField()
    score_user_two = models.IntegerField()
    match_start = models.DateField()
    match_end = models.DateField()
    tackle_user_one = models.IntegerField()
    tackle_user_two = models.IntegerField()
    class Meta:
        """Class to change the behavior of your model fields"""
        db_table = 'Match'


class Tournaments(models.Model):
    """Class representing Tournaments"""
    tournament_id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=30)
    tournament_start = models.DateField()
    tournament_end = models.DateField()
    class Meta:
        """Class to change the behavior of your model fields"""
        db_table = 'Tournaments'


class Tournamentsmatches(models.Model):
    """Class representing Tournamentsmatches"""
    tournament = models.OneToOneField(Tournaments, models.DO_NOTHING, primary_key=True)
    match = models.ForeignKey(Match, models.DO_NOTHING)
    tournament_round = models.CharField(max_length=30)
    class Meta:
        """Class to change the behavior of your model fields"""
        db_table = 'TournamentsMatches'
        unique_together = (('tournament', 'match'),)
