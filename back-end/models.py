from django.db import models


class Achievements(models.Model):
    achievement_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING)
    achiev_name = models.CharField(max_length=45)
    xp_to_get = models.FloatField()

    class Meta:
        managed = False
        db_table = 'Achievements'


class Friendship(models.Model):
    user_from = models.OneToOneField('Users', models.DO_NOTHING, db_column='user_from', primary_key=True)  # The composite primary key (user_from, user_to) found, that is not supported. The first column is selected.
    user_to = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_to', related_name='friendship_user_to_set')
    is_accepted = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Friendship'
        unique_together = (('user_from', 'user_to'),)


class Messages(models.Model):
    user_one = models.OneToOneField('Users', models.DO_NOTHING, db_column='user_one', primary_key=True)  # The composite primary key (user_one, user_two) found, that is not supported. The first column is selected.
    user_two = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_two', related_name='messages_user_two_set')
    message_content = models.CharField(max_length=512)
    message_date = models.DateField()
    message_direction = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'Messages'
        unique_together = (('user_one', 'user_two'),)


class Rgames(models.Model):
    id_rgame = models.AutoField(primary_key=True)
    user_one = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_one')
    user_two = models.ForeignKey('Users', models.DO_NOTHING, db_column='user_two', related_name='rgames_user_two_set')
    score_user_one = models.IntegerField()
    score_user_two = models.IntegerField()
    game_start = models.DateField()
    game_end = models.DateField()

    class Meta:
        managed = False
        db_table = 'Rgames'


class Tgames(models.Model):
    id_tgame = models.AutoField(primary_key=True)
    rgame_one = models.ForeignKey(Rgames, models.DO_NOTHING, db_column='rgame_one')
    rgame_two = models.ForeignKey(Rgames, models.DO_NOTHING, db_column='rgame_two', related_name='tgames_rgame_two_set')
    rgame_three = models.ForeignKey(Rgames, models.DO_NOTHING, db_column='rgame_three', related_name='tgames_rgame_three_set')
    rgame_four = models.ForeignKey(Rgames, models.DO_NOTHING, db_column='rgame_four', related_name='tgames_rgame_four_set')
    game_start = models.DateField()
    game_end = models.DateField()

    class Meta:
        managed = False
        db_table = 'Tgames'


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