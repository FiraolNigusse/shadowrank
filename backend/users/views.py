from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import User
from .serializers import UserSerializer


class GlobalLeaderboardView(APIView):
    def get(self, request):
        users = User.objects.order_by("-elo")[:50]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class WeeklyLeaderboardView(APIView):
    def get(self, request):
        week_ago = timezone.now() - timedelta(days=7)
        users = User.objects.filter(last_match__gte=week_ago).order_by("-elo")[:50]
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class CurrentUserView(APIView):
    def get(self, request):
        # Mocking for now - return the first user or 404
        user = User.objects.first()
        if not user:
            return Response({"error": "No users found"}, status=404)
        serializer = UserSerializer(user)
        return Response(serializer.data)