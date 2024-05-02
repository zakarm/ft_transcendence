from django.db import models

class Friendship(models.Model):
    freindship_id = models.AutoField(primary_key=True)
    user_from = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                  db_column='user_from')
    user_to = models.ForeignKey('authentication.User', models.DO_NOTHING,
                                db_column='user_to', related_name = "user_to_set")
    is_accepted = models.BooleanField(default=False)
    class Meta:
        db_table = 'Friendship'