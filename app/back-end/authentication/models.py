from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import (
    PermissionsMixin,
    AbstractBaseUser,
    BaseUserManager,
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Function create a User"""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    reg_validator = RegexValidator(
        regex="^[a-zA-Z0-9_ ]*$",
        message="Username can only contain alphanumeric characters and underscores.",
        code="invalid_username",
    )
    dft_img = "/assets/images/gameProfiles/default_profile.png"
    loc_text = "Morocco/Khouribga"
    quote_text = "Hello, It's me!"
    intro_text = "Life's a ping pong game: focus strategy spin"
    username = models.CharField(max_length=30, validators=[reg_validator], unique=True)
    email = models.EmailField(max_length=55, unique=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    image_url = models.URLField(max_length=350, blank=True, null=True, default=dft_img)
    location = models.CharField(max_length=100, blank=True, null=True, default=loc_text)
    quote = models.CharField(max_length=25, blank=True, null=True, default=quote_text)
    intro = models.CharField(max_length=45, blank=True, null=True, default=intro_text)
    cover_url = models.URLField(max_length=350, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True, default=0.0)
    xp = models.IntegerField(blank=True, null=True, default=100)
    level = models.FloatField(blank=True, null=True, default=1.0)
    rank = models.IntegerField(blank=True, null=True, default=0)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_local = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_online = models.IntegerField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_2fa_enabled = models.BooleanField(default=False)
    two_fa_secret_key = models.CharField(max_length=200, blank=True, null=True)

    objects = UserManager()
    USERNAME_FIELD = "email"

    class Meta:
        db_table = "authentication_users"
