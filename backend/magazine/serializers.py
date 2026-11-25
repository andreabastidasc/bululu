from rest_framework import serializers

from accounts.utils import public_name

from .models import Article, ArticleBlock, Comment


class ArticleSummarySerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            "slug",
            "status",
            "language",
            "title",
            "category",
            "excerpt",
            "cover_image",
            "cover_color",
            "mascot",
            "published_at",
            "comment_count",
        ]

    def get_comment_count(self, obj):
        return obj.comments.filter(is_hidden=False).count()


class ArticleBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleBlock
        fields = ["kind", "text", "image", "caption", "alt"]


class ArticleDetailSerializer(ArticleSummarySerializer):
    blocks = ArticleBlockSerializer(many=True, read_only=True)

    class Meta(ArticleSummarySerializer.Meta):
        fields = ArticleSummarySerializer.Meta.fields + ["allow_comments", "blocks"]


class ReplySerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "author_name", "body", "created_at"]

    def get_author_name(self, obj):
        return public_name(obj.author)


class CommentSerializer(ReplySerializer):
    replies = serializers.SerializerMethodField()

    class Meta(ReplySerializer.Meta):
        fields = ReplySerializer.Meta.fields + ["replies"]

    def get_replies(self, obj):
        visible = [reply for reply in obj.replies.all() if not reply.is_hidden]
        return ReplySerializer(visible, many=True, context=self.context).data


class CommentCreateSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Comment
        fields = ["id", "body", "parent"]
        read_only_fields = ["id"]

    def validate_body(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("El comentario está vacío.")
        return value

    def validate_parent(self, parent):
        article = self.context["article"]
        if parent is None:
            return None
        if parent.article_id != article.id or parent.is_hidden:
            raise serializers.ValidationError("Ese comentario no existe en este artículo.")
        return parent.parent or parent
