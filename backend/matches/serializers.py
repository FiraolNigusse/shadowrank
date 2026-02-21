from rest_framework import serializers
from .models import Match, MatchPlayer, Vote

class MatchPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchPlayer
        fields = ["user", "role", "alive"]

class MatchSerializer(serializers.ModelSerializer):
    players = MatchPlayerSerializer(many=True, read_only=True)
    class Meta:
        model = Match
        fields = ["id", "status", "created_at", "players"]

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ["voter", "target", "match", "created_at"]

from .models import MatchPlayer
from rest_framework import serializers


class MatchHistorySerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="role")
    result = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()

    class Meta:
        model = MatchPlayer
        fields = ["match", "role", "result", "summary"]

    def get_result(self, obj):
        if obj.match.winning_team == obj.team:
            return "Win"
        return "Loss"

    def get_summary(self, obj):
        # Placeholder AI summary (we upgrade later)
        return f"You played as {obj.role} in Match #{obj.match.id} and the {obj.match.winning_team} team won."       