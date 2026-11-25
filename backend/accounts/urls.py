from django.urls import path

from . import views

urlpatterns = [
    path("yo/", views.MeView.as_view(), name="me"),
]
