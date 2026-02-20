from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Match, MatchPlayer, Vote
from .serializers import MatchSerializer, VoteSerializer
from users.services import get_or_create_user_from_telegram

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    @action(detail=False, methods=["post"])
    def join_lobby(self, request):
        telegram_id = request.data.get("telegram_id")
        username = request.data.get("username")
        user = get_or_create_user_from_telegram(telegram_id, username)

        match, created = Match.objects.get_or_create(status="waiting")
        MatchPlayer.objects.get_or_create(match=match, user=user)
        return Response(MatchSerializer(match).data)

    @action(detail=True, methods=["post"])
    def start_match(self, request, pk=None):
        match = self.get_object()
        if match.status != "waiting":
            return Response({"error": "Match already started"}, status=status.HTTP_400_BAD_REQUEST)
        match.status = "ongoing"
        match.save()
        return Response({"status": "match started"})

    @action(detail=True, methods=["post"])
    def submit_vote(self, request, pk=None):
        match = self.get_object()
        voter_id = request.data.get("voter_id")
        target_id = request.data.get("target_id")
        vote = Vote.objects.create(
            match=match,
            voter_id=voter_id,
            target_id=target_id
        )
        return Response(VoteSerializer(vote).data)