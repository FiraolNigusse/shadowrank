import pytest
from ranking.elo import update_elo_for_match
from users.models import User
from matches.models import Match, MatchPlayer

@pytest.mark.django_db
def test_elo_calculation():
    user1 = User.objects.create(username="user1", telegram_id=1, elo=1200)
    user2 = User.objects.create(username="user2", telegram_id=2, elo=1200)
    
    match = Match.objects.create(status="ongoing")
    MatchPlayer.objects.create(match=match, user=user1)
    MatchPlayer.objects.create(match=match, user=user2)
    
    # Simulate user1 wins
    update_elo_for_match(match, winning_team_ids=[1])
    
    user1.refresh_from_db()
    user2.refresh_from_db()
    
    assert user1.elo > 1200
    assert user2.elo < 1200
    assert match.status == "finished"