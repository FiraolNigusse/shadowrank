import redis
import json
from django.conf import settings
from users.models import User
from matches.models import Match, MatchPlayer

r = redis.Redis.from_url(settings.REDIS_URL)

QUEUE_KEY = "ranked_queue"
PLAYERS_PER_MATCH = 4


class MatchmakingQueue:
    QUEUE_KEY = "ranked_queue"
    PLAYERS_PER_MATCH = 4

    def __init__(self, redis_client=None):
        self.r = redis_client or redis.Redis.from_url(settings.REDIS_URL)

    def add_player_to_queue(self, user):
        current_queue = self.r.lrange(self.QUEUE_KEY, 0, -1)
        if str(user.telegram_id).encode() in current_queue:
            return False
        self.r.rpush(self.QUEUE_KEY, user.telegram_id)
        return True

    def get_queue_size(self):
        return self.r.llen(self.QUEUE_KEY)

    def pop_players_from_queue(self, count):
        players = []
        for _ in range(count):
            telegram_id = self.r.lpop(self.QUEUE_KEY)
            if telegram_id:
                players.append(int(telegram_id))
        return players

    def create_balanced_match(self, telegram_ids):
        users = list(User.objects.filter(telegram_id__in=telegram_ids))
        users.sort(key=lambda u: u.elo)

        # Simple balanced split (2 lowest vs 2 highest)
        team1 = users[:2]
        team2 = users[2:]

        match = Match.objects.create(status="ongoing")

        for user in team1 + team2:
            MatchPlayer.objects.create(match=match, user=user)

        return match

# Legacy function support for views (optional, or update views)
_default_queue = MatchmakingQueue()
add_player_to_queue = _default_queue.add_player_to_queue
get_queue_size = _default_queue.get_queue_size
pop_players_from_queue = _default_queue.pop_players_from_queue
create_balanced_match = _default_queue.create_balanced_match