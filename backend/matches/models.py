from django.db import models
from users.models import User

class Match(models.Model):
    STATUS_CHOICES = [
        ("waiting", "Waiting"),
        ("ongoing", "Ongoing"),
        ("finished", "Finished"),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="waiting")
    finished_at = models.DateTimeField(null=True, blank=True)
    winning_team = models.CharField(max_length=20, null=True, blank=True)  # "Town", "Mafia", etc.
    
    def __str__(self):
        return f"Match {self.id} ({self.status})"

class MatchPlayer(models.Model):
    match = models.ForeignKey(Match, related_name="players", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="matches", on_delete=models.CASCADE)
    role = models.CharField(max_length=50, blank=True, null=True)  # e.g., Mafia, Detective
    team = models.CharField(max_length=20, null=True, blank=True)  # "Town" or "Mafia"
    alive = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.user} in {self.match}"

class Vote(models.Model):
    match = models.ForeignKey(Match, related_name="votes", on_delete=models.CASCADE)
    voter = models.ForeignKey(User, related_name="votes_cast", on_delete=models.CASCADE)
    target = models.ForeignKey(User, related_name="votes_received", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
class GameLog(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="logs")
    action_type = models.CharField(max_length=50)
    data = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.match.id} - {self.action_type}"