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