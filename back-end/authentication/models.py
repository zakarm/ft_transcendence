from django.db import models

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