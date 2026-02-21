from .views import GlobalLeaderboardView, WeeklyLeaderboardView

urlpatterns = [
    path("leaderboard/global/", GlobalLeaderboardView.as_view()),
    path("leaderboard/weekly/", WeeklyLeaderboardView.as_view()),   
]