from django.db import models


class Achievements(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    achiev_name = models.CharField(max_length=45)
    xp_to_get = models.FloatField()
    class Meta:
        managed = False
        db_table = 'Achievements'


class Friendship(models.Model):
    freindship_id = models.AutoField(primary_key=True)
    user_from = models.ForeignKey('Users', models.DO_NOTHING,
                                  db_column='user_from')
    user_to = models.ForeignKey('Users', models.DO_NOTHING,
                                db_column='user_to',
                                related_name='friendship_user_to_set')
    is_accepted = models.BooleanField()
    class Meta:
        managed = False
        db_table = 'Friendship'


class Matches(models.Model):
    match_id = models.AutoField(primary_key=True)
    user_one = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_one')
    user_two = models.ForeignKey('Users', models.DO_NOTHING,
                                 db_column='user_two',
                                 related_name='matches_user_two_set')
    score_user_one = models.IntegerField()
    score_user_two = models.IntegerField()
    match_start = models.DateField()
    match_end = models.DateField()
    tackle_user_one = models.IntegerField()
    tackle_user_two = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Matches'


class Messages(models.Model):
    user_one = models.OneToOneField('Users', models.DO_NOTHING,
                                    db_column='user_one', primary_key=True)
    user_two = models.ForeignKey('Users', models.DO_NOTHING,
                                 db_column='user_two',
                                 related_name='messages_user_two_set')
    message_content = models.CharField(max_length=512)
    message_date = models.DateField()
    message_direction = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'Messages'
        unique_together = (('user_one', 'user_two'),)

class Userachievements(models.Model):
    user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    achivement = models.ForeignKey(Achievements, models.DO_NOTHING)
    achive_date = models.DateField()
    class Meta:
        managed = False
        db_table = 'UserAchievements'
        unique_together = (('user', 'achivement'),)


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    nick_name = models.CharField(max_length=20)
    user_xp = models.FloatField()
    image_url = models.CharField(max_length=200)
    cover_url = models.CharField(max_length=200)
    first_log = models.DateField()
    last_log = models.DateField()
    is_log = models.BooleanField()
    is_two_fact = models.BooleanField()
    two_fact_secret = models.CharField(max_length=200)
    country = models.CharField(max_length=60)
    city = models.CharField(max_length=60)
    password = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'Users'
