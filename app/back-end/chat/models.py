from django.db import models

# Create your models here.
class Messages(models.Model):
    user_one = models.OneToOneField('authentication.User', models.DO_NOTHING, primary_key=True)
    user_two = models.ForeignKey('authentication.User', models.DO_NOTHING, related_name = "user_to_send")
    message_content = models.CharField(max_length=512)
    message_date = models.DateTimeField()
    class Meta:
        db_table = 'Messages'
        ordering = ['-message_date']
        unique_together = (('user_one', 'user_two'),)
