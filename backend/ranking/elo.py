from users.models import User
from matches.models import MatchPlayer
from django.utils import timezone
from math import pow


K_FACTOR = 32


def expected_score(player_elo, opponent_avg_elo):
    return 1 / (1 + pow(10, (opponent_avg_elo - player_elo) / 400))


def update_elo_for_match(match, winning_team_ids):
    players = MatchPlayer.objects.filter(match=match).select_related("user")

    team1 = []
    team2 = []

    # Split players into teams based on telegram id membership
    for mp in players:
        if mp.user.telegram_id in winning_team_ids:
            team1.append(mp.user)
        else:
            team2.append(mp.user)

    avg_team1 = sum(p.elo for p in team1) / len(team1)
    avg_team2 = sum(p.elo for p in team2) / len(team2)

    for player in team1:
        expected = expected_score(player.elo, avg_team2)
        player.elo += int(K_FACTOR * (1 - expected))
        player.save()

    for player in team2:
        expected = expected_score(player.elo, avg_team1)
        player.elo += int(K_FACTOR * (0 - expected))
        player.save()

    match.status = "finished"
    match.finished_at = timezone.now()
    match.save()