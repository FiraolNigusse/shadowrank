from django.urls import path, include
from rest_framework.routers import DefaultRouter
from matches.views import MatchViewSet

router = DefaultRouter()
router.register(r"matches", MatchViewSet, basename="match")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/", include("matches.urls")),
    path("api/users/", include("users.urls")),
]