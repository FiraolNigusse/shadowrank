from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Match, MatchPlayer, Vote
from .serializers import MatchSerializer, VoteSerializer
from users.services import get_or_create_user_from_telegram
from users.models import User
from matchmaking.queue import (
    add_player_to_queue,
    get_queue_size,
    pop_players_from_queue,
    create_balanced_match,
)


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    @action(detail=False, methods=["post"])
    def join_lobby(self, request):
        telegram_id = request.data.get("telegram_id")
        username = request.data.get("username")

        user = get_or_create_user_from_telegram(telegram_id, username)

        add_player_to_queue(user)

        if get_queue_size() >= 4:
            telegram_ids = pop_players_from_queue(4)
            match = create_balanced_match(telegram_ids)
            return Response({"message": "Match created", "match_id": match.id})

        return Response({"message": "Added to ranked queue"})

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
        voter_telegram_id = request.data.get("voter_id")
        target_telegram_id = request.data.get("target_id")
        try:
            voter = User.objects.get(telegram_id=voter_telegram_id)
            target = User.objects.get(telegram_id=target_telegram_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Voter or target user not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        vote = Vote.objects.create(
            match=match,
            voter=voter,
            target=target
        )
        return Response(VoteSerializer(vote).data)