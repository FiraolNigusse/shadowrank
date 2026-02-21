from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, telegram_id, username=None, **extra_fields):
        if not telegram_id:
            raise ValueError("Users must have a Telegram ID")
        user = self.model(telegram_id=telegram_id, username=username, **extra_fields)
        user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, telegram_id, username=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(telegram_id, username, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    telegram_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    elo = models.IntegerField(default=1000)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    last_match = models.DateTimeField(null=True, blank=True)
    
    objects = UserManager()

    USERNAME_FIELD = "telegram_id"
    REQUIRED_FIELDS = []
    def get_rank_badge(self):
        if self.elo < 900:
            return "Bronze"
        elif self.elo < 1100:
            return "Silver"
        elif self.elo < 1300:
            return "Gold"
        elif self.elo < 1600:
            return "Platinum"
        else:
            return "Elite"
    def __str__(self):
        return self.username or str(self.telegram_id)