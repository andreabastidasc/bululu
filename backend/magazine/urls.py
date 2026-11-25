from django.urls import path

from . import views

urlpatterns = [
    path("articulos/", views.ArticleListView.as_view(), name="article-list"),
    path("articulos/<slug:slug>/", views.ArticleDetailView.as_view(), name="article-detail"),
    path("articulos/<slug:slug>/comentarios/", views.ArticleCommentsView.as_view(), name="article-comments"),
]
