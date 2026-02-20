from .models import User

def get_or_create_user_from_telegram(telegram_id, username=None):
    user, created = User.objects.get_or_create(
        telegram_id=telegram_id,
        defaults={"username": username}
    )
    return user