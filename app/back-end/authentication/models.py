from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Function create a User"""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_online = models.IntegerField(default = 0)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now=True)
    image_url = models.URLField(max_length=200, blank=True, null=True, 
                                default='/omen.jpeg')
    cover_url = models.URLField(max_length=200, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True, default="Morocco/Khouribga")
    is_2fa_enabled = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    two_fa_secret_key = models.CharField(max_length=200, blank=True, null=True)
    score = models.IntegerField(blank = True, null = True, default=0.0)
    level = models.FloatField(blank = True, null = True, default=0.0)
    rank = models.IntegerField(blank = True, null = True, default=0)
    quote = models.CharField(max_length = 100, blank = True, null = True, 
                             default="Hello A7ssan ft_transcendence")
    intro = models.CharField(max_length = 100, blank = True, null = True, default="This is my bio")

    objects = UserManager()
    USERNAME_FIELD = 'email'
    class Meta:
        db_table = 'authentication_users'
