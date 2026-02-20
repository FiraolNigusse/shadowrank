import random
from matches.models import Match, MatchPlayer, Vote
from users.models import User
from backend.config.settings import REDIS_URL
import redis
import json

r = redis.Redis.from_url(REDIS_URL)

class GameEngine:
    PHASES = ["night", "day"]

    ROLES = ["mafia", "detective", "villager"]

    def __init__(self, match_id):
        self.match = Match.objects.get(id=match_id)
        self.state_key = f"match:{match_id}:state"
        self.load_state()

    def load_state(self):
        data = r.get(self.state_key)
        if data:
            self.state = json.loads(data)
        else:
            self.state = {
                "phase": "night",
                "players": {p.user.telegram_id: {"role": None, "alive": True} for p in self.match.players.all()},
                "votes": {}
            }

    def save_state(self):
        r.set(self.state_key, json.dumps(self.state))

    def assign_roles(self):
        players = list(self.state["players"].keys())
        roles = random.choices(self.ROLES, k=len(players))
        for pid, role in zip(players, roles):
            self.state["players"][pid]["role"] = role
        self.save_state()

    def start_phase(self):
        current_index = self.PHASES.index(self.state["phase"])
        next_index = (current_index + 1) % len(self.PHASES)
        self.state["phase"] = self.PHASES[next_index]
        self.state["votes"] = {}
        self.save_state()

    def submit_vote(self, voter_id, target_id):
        self.state["votes"][str(voter_id)] = target_id
        self.save_state()

    def check_win_condition(self):
        alive_players = [p for p, info in self.state["players"].items() if info["alive"]]
        mafia_alive = [p for p in alive_players if self.state["players"][p]["role"] == "mafia"]
        if not mafia_alive:
            return "villagers_win"
        if len(mafia_alive) >= len(alive_players) / 2:
            return "mafia_win"
        return None