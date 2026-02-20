from django.test import TestCase
from rest_framework.test import APIClient
from users.models import User
from .models import Match, MatchPlayer, Vote

class MatchAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a sample Telegram user
        self.user_data = {"telegram_id": 123456, "username": "Tester"}

    def test_join_lobby_creates_user_and_match(self):
        response = self.client.post("/api/matches/join_lobby/", self.user_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(User.objects.filter(telegram_id=123456).exists())
        self.assertTrue(Match.objects.filter(status="waiting").exists())
        self.assertTrue(MatchPlayer.objects.filter(user__telegram_id=123456).exists())

    def test_start_match_changes_status(self):
        # Join lobby first
        join_resp = self.client.post("/api/matches/join_lobby/", self.user_data, format="json")
        match_id = join_resp.data["id"]
        start_resp = self.client.post(f"/api/matches/{match_id}/start_match/")
        self.assertEqual(start_resp.status_code, 200)
        self.assertEqual(Match.objects.get(id=match_id).status, "ongoing")

    def test_submit_vote_creates_vote(self):
        join_resp = self.client.post("/api/matches/join_lobby/", self.user_data, format="json")
        match_id = join_resp.data["id"]
        # Add second player
        self.client.post("/api/matches/join_lobby/", {"telegram_id": 789012, "username": "Target"}, format="json")
        vote_resp = self.client.post(f"/api/matches/{match_id}/submit_vote/", {"voter_id": 123456, "target_id": 789012})
        self.assertEqual(vote_resp.status_code, 200)
        self.assertTrue(Vote.objects.filter(voter_id=123456, target_id=789012).exists())