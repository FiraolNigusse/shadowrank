import pytest
import fakeredis
from matchmaking.queue import MatchmakingQueue
from users.models import User

@pytest.mark.asyncio
async def test_redis_recovery():
    fake_redis = fakeredis.FakeRedis()
    queue = MatchmakingQueue(redis_client=fake_redis)
    
    # Add a mock user
    user = User(telegram_id=123)
    
    # Add user
    queue.add_player_to_queue(user)
    
    # Simulate crash/re-init by creating a new queue with same fake redis
    new_queue = MatchmakingQueue(redis_client=fake_redis)
    assert new_queue.get_queue_size() == 1