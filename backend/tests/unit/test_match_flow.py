import pytest
from matches.models import Match, Vote, GameLog
from users.models import User

@pytest.mark.django_db
def test_simple_match_flow():
    # Create dummy users
    user1 = User.objects.create(username="player1", telegram_id=111)
    user2 = User.objects.create(username="player2", telegram_id=222)
    
    # Create match
    match = Match.objects.create(status="waiting")
    match.players.create(user=user1)
    match.players.create(user=user2)
    
    # Simulate status change
    match.status = "ongoing"
    match.save()
    
    # Submit votes
    vote = Vote.objects.create(match=match, voter=user1, target=user2)
    assert Vote.objects.filter(match=match).count() == 1
    
    # Log actions
    log = GameLog.objects.create(match=match, action_type="vote", data={"voter": user1.id, "target": user2.id})
    assert GameLog.objects.filter(match=match).count() == 1