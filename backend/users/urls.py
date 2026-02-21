from django.urls import path
from .views import GlobalLeaderboardView, WeeklyLeaderboardView, CurrentUserView

urlpatterns = [
    path("me/", CurrentUserView.as_view()),
    path("leaderboard/global/", GlobalLeaderboardView.as_view()),
    path("leaderboard/weekly/", WeeklyLeaderboardView.as_view()),   
]