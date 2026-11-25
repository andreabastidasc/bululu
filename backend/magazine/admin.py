from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, StackedInline
from unfold.decorators import action

from .models import Article, ArticleBlock, Comment


class ArticleBlockInline(StackedInline):
    model = ArticleBlock
    extra = 0
    ordering_field = "order"
    hide_ordering_field = True
    fields = ["kind", "text", "image", "caption", "alt"]


@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ["title", "category", "status", "published_at", "comment_count"]
    list_filter = ["status", "category"]
    search_fields = ["title", "excerpt"]
    prepopulated_fields = {"slug": ["title"]}
    inlines = [ArticleBlockInline]
    fieldsets = [
        (None, {"fields": ["title", "slug", "category", "excerpt"]}),
        ("Portada", {"fields": ["cover_image", "cover_color", "mascot"]}),
        ("Publicación", {"fields": ["status", "published_at", "allow_comments"]}),
    ]

    @admin.display(description="comentarios")
    def comment_count(self, obj):
        return obj.comments.count()


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    list_display = ["short_body", "author", "article", "created_at", "is_hidden"]
    list_filter = ["is_hidden", "article"]
    search_fields = ["body", "author__email"]
    readonly_fields = ["article", "author", "parent", "body", "created_at"]
    fields = ["article", "author", "parent", "body", "created_at", "is_hidden"]
    actions = ["hide", "show"]

    def has_add_permission(self, request):
        return False

    @admin.display(description="comentario")
    def short_body(self, obj):
        return format_html("<span title='{}'>{}</span>", obj.body, obj.body[:80])

    @action(description="Ocultar comentarios seleccionados")
    def hide(self, request, queryset):
        queryset.update(is_hidden=True)

    @action(description="Mostrar comentarios seleccionados")
    def show(self, request, queryset):
        queryset.update(is_hidden=False)
