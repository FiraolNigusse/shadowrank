from celery import shared_task
from .game_engine import GameEngine

@shared_task
def advance_phase(match_id):
    engine = GameEngine(match_id)
    engine.start_phase()
    winner = engine.check_win_condition()
    from ranking.elo import update_elo_for_match

    if winner:
        match = engine.match

        if winner == "mafia_win":
            winning_ids = [
                pid for pid, data in engine.state["players"].items()
                if data["role"] == "mafia"
            ]
        else:
            winning_ids = [
                pid for pid, data in engine.state["players"].items()
                if data["role"] != "mafia"
            ]

        update_elo_for_match(match, winning_ids)