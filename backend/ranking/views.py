from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from users.models import User
from users.serializers import LeaderboardSerializer


class GlobalLeaderboardView(APIView):
    def get(self, request):
        users = User.objects.order_by("-elo")[:50]
        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)


class WeeklyLeaderboardView(APIView):
    def get(self, request):
        one_week_ago = timezone.now() - timedelta(days=7)
        users = User.objects.filter(matches__match__finished_at__gte=one_week_ago).distinct().order_by("-elo")[:50]
        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)