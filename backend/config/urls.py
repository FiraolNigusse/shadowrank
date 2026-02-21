from django.urls import path, include
from rest_framework.routers import DefaultRouter
from matches.views import MatchViewSet
from ranking.views import GlobalLeaderboardView, WeeklyLeaderboardView

router = DefaultRouter()
router.register(r"matches", MatchViewSet, basename="match")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/users/leaderboard/global/", GlobalLeaderboardView.as_view()),
    path("api/users/leaderboard/weekly/", WeeklyLeaderboardView.as_view()),
]