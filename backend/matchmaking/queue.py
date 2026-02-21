import redis
import json
from django.conf import settings
from users.models import User
from matches.models import Match, MatchPlayer

r = redis.Redis.from_url(settings.REDIS_URL)

QUEUE_KEY = "ranked_queue"
PLAYERS_PER_MATCH = 4


def add_player_to_queue(user):
    current_queue = r.lrange(QUEUE_KEY, 0, -1)
    if str(user.telegram_id).encode() in current_queue:
        return False
    r.rpush(QUEUE_KEY, user.telegram_id)
    return True


def get_queue_size():
    return r.llen(QUEUE_KEY)


def pop_players_from_queue(count):
    players = []
    for _ in range(count):
        telegram_id = r.lpop(QUEUE_KEY)
        if telegram_id:
            players.append(int(telegram_id))
    return players


def create_balanced_match(telegram_ids):
    users = list(User.objects.filter(telegram_id__in=telegram_ids))
    users.sort(key=lambda u: u.elo)

    # Simple balanced split (2 lowest vs 2 highest)
    team1 = users[:2]
    team2 = users[2:]

    match = Match.objects.create(status="ongoing")

    for user in team1 + team2:
        MatchPlayer.objects.create(match=match, user=user)

    return match