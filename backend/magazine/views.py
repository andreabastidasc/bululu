from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from core.choices import Language

from .models import Article, ArticleBlock, Comment
from .serializers import (
    ArticleDetailSerializer,
    ArticleSummarySerializer,
    CommentCreateSerializer,
    CommentSerializer,
)


def published_articles(request):
    language = request.query_params.get("lang", Language.SPANISH)
    if language not in Language.values:
        language = Language.SPANISH
    return Article.objects.published().filter(language=language)


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSummarySerializer

    def get_queryset(self):
        return published_articles(self.request)


class ArticleDetailView(generics.RetrieveAPIView):
    serializer_class = ArticleDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return published_articles(self.request).prefetch_related(
            Prefetch("blocks", queryset=ArticleBlock.objects.order_by("order", "id"))
        )


class ArticleCommentsView(generics.ListCreateAPIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_article(self):
        if not hasattr(self, "_article"):
            self._article = get_object_or_404(published_articles(self.request), slug=self.kwargs["slug"])
        return self._article

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CommentCreateSerializer
        return CommentSerializer

    def get_serializer_context(self):
        return {**super().get_serializer_context(), "article": self.get_article()}

    def get_queryset(self):
        return (
            Comment.objects.filter(article=self.get_article(), parent__isnull=True, is_hidden=False)
            .select_related("author__profile")
            .prefetch_related(Prefetch("replies", queryset=Comment.objects.select_related("author__profile")))
        )

    def perform_create(self, serializer):
        article = self.get_article()
        if not article.allow_comments:
            raise PermissionDenied("Este artículo no acepta comentarios.")
        serializer.save(article=article, author=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        comment = Comment.objects.select_related("author__profile").get(pk=response.data["id"])
        response.data = CommentSerializer(comment, context=self.get_serializer_context()).data
        return response
