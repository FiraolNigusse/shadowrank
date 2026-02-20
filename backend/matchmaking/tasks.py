from celery import shared_task
from .game_engine import GameEngine

@shared_task
def advance_phase(match_id):
    engine = GameEngine(match_id)
    engine.start_phase()
    winner = engine.check_win_condition()
    if winner:
        # mark match finished
        match = engine.match
        match.status = "finished"
        match.save()