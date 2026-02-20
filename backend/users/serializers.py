from rest_framework import serializers
from .models import User


class LeaderboardSerializer(serializers.ModelSerializer):
    rank_badge = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["telegram_id", "username", "elo", "rank_badge"]

    def get_rank_badge(self, obj):
        return obj.get_rank_badge()