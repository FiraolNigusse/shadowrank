import random
from matches.models import Match, MatchPlayer, Vote
from users.models import User
from django.conf import settings
REDIS_URL = settings.REDIS_URL
import redis
import json
from matches.models import GameLog

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
        GameLog.objects.create(
            match=self.match,
            action_type="role_assignment",
            data=self.state
        )
        self.save_state()

    def start_phase(self):
        current_index = self.PHASES.index(self.state["phase"])
        next_index = (current_index + 1) % len(self.PHASES)
        self.state["phase"] = self.PHASES[next_index]
        self.state["votes"] = {}
        GameLog.objects.create(
            match=self.match,
            action_type="phase_change",
            data={"phase": self.state["phase"]}
        )
        self.save_state()

    def submit_vote(self, voter_id, target_id):
        voter_id = str(voter_id)
        target_id = str(target_id)

        # Ensure phase is day
        if self.state["phase"] != "day":
            raise Exception("Voting only allowed during DAY phase")

        # Ensure voter exists
        if voter_id not in self.state["players"]:
            raise Exception("Invalid voter")

        # Ensure target exists
        if target_id not in self.state["players"]:
            raise Exception("Invalid target")

        # Ensure voter is alive
        if not self.state["players"][voter_id]["alive"]:
            raise Exception("Dead players cannot vote")

        # Ensure target is alive
        if not self.state["players"][target_id]["alive"]:
            raise Exception("Cannot vote for dead player")

        # Prevent double voting
        if voter_id in self.state["votes"]:
            raise Exception("Player already voted this round")

        self.state["votes"][voter_id] = target_id
        self.save_state()
        GameLog.objects.create(
            match=self.match,
            action_type="vote",
            data={"voter": voter_id, "target": target_id}
        )

    def check_win_condition(self):
        alive_players = [p for p, info in self.state["players"].items() if info["alive"]]
        mafia_alive = [p for p in alive_players if self.state["players"][p]["role"] == "mafia"]
        if not mafia_alive:
            return "villagers_win"
        if len(mafia_alive) >= len(alive_players) / 2:
            return "mafia_win"
        return None