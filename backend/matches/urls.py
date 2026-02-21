from django.urls import path
from .views import UserMatchHistoryView

urlpatterns = [
    path("history/", UserMatchHistoryView.as_view(), name="match-history"),
]
