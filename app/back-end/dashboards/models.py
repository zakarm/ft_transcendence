from django.db import models

class Friendship(models.Model):
    freindship_id = models.AutoField(primary_key=True)
    user_from = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                  db_column='user_from')
    user_to = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user_to', related_name = "user_to_set")
    is_accepted = models.BooleanField(default=False)
    u_one_is_blocked_u_two = models.BooleanField(default=False)
    u_two_is_blocked_u_one = models.BooleanField(default=False)
    class Meta:
        db_table = 'Friendship'

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                  db_column='user')
    image_url = models.CharField(max_length=200, blank=True)
    message = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=50, blank=True)
    link = models.CharField(max_length=200, blank=True)

    class Meta:
        db_table = 'Notification'