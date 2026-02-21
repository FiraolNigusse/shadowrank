import pytest
from matchmaking.queue import MatchmakingQueue
from users.models import User
from matches.models import Match

@pytest.mark.django_db
def test_matchmaking_queue(settings):
    # Use a specific redis key/db for testing if needed, 
    # but fakeredis will handle it in the other test.
    # For this test, we just use the default (which uses memory DB in settings.py)
    queue = MatchmakingQueue()
    
    user1 = User.objects.create(username="u1", telegram_id=1, elo=1000)
    user2 = User.objects.create(username="u2", telegram_id=2, elo=1100)
    user3 = User.objects.create(username="u3", telegram_id=3, elo=1200)
    user4 = User.objects.create(username="u4", telegram_id=4, elo=1300)
    
    queue.add_player_to_queue(user1)
    queue.add_player_to_queue(user2)
    queue.add_player_to_queue(user3)
    queue.add_player_to_queue(user4)
    
    assert queue.get_queue_size() == 4
    
    ids = queue.pop_players_from_queue(4)
    match = queue.create_balanced_match(ids)
    
    assert match is not None
    assert match.players.count() == 4