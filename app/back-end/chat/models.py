from django.db import models

# Create your models here.
# class Messages(models.Model):
#     user_one = models.OneToOneField('Users', models.DO_NOTHING,
#                                     db_column='user_one', primary_key=True)
#     user_two = models.ForeignKey('Users', models.DO_NOTHING,
#                                  db_column='user_two',
#                                  related_name='messages_user_two_set')
#     message_content = models.CharField(max_length=512)
#     message_date = models.DateField()
#     message_direction = models.CharField(max_length=20)
#     class Meta:
#         managed = False
#         db_table = 'Messages'
#         unique_together = (('user_one', 'user_two'),)
