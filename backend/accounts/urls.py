from django.urls import path

from . import views

urlpatterns = [
    path("session/", views.SessionView.as_view(), name="session"),
    path("yo/", views.MeView.as_view(), name="me"),
]
