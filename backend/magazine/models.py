from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django_prose_editor.fields import ProseEditorField

from core.choices import BrandColor, Language, Mascot
from core.models import Publishable, TimeStamped

TEXT_EXTENSIONS = {
    "Bold": True,
    "Italic": True,
    "Underline": True,
    "Strike": True,
    "Link": {"protocols": ["http", "https", "mailto"]},
    "Heading": {"levels": [2, 3]},
    "BulletList": True,
    "OrderedList": True,
    "ListItem": True,
    "Blockquote": True,
    "HorizontalRule": True,
    "HardBreak": True,
}


class Article(Publishable, TimeStamped):
    title = models.CharField("título", max_length=200)
    slug = models.SlugField("dirección", max_length=200, help_text="Así queda en el link: /revista/<dirección>")
    category = models.CharField("categoría", max_length=60, help_text="Ej.: Línea de tiempo, Estudios que nos copan")
    excerpt = models.TextField("bajada", max_length=300, help_text="Una o dos frases que aparecen en la portada.")
    cover_image = models.ImageField("imagen de portada", upload_to="revista/portadas/", blank=True)
    cover_color = models.CharField(
        "color de portada", max_length=12, choices=BrandColor.choices, default=BrandColor.LEMON
    )
    mascot = models.CharField("bululito de portada", max_length=12, choices=Mascot.choices, default=Mascot.TUQUI)
    language = models.CharField("idioma", max_length=5, choices=Language.choices, default=Language.SPANISH)
    translation_of = models.ForeignKey(
        "self",
        verbose_name="traducción de",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="translations",
    )
    allow_comments = models.BooleanField("permitir comentarios", default=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name = "artículo"
        verbose_name_plural = "artículos"
        constraints = [
            models.UniqueConstraint(fields=["slug", "language"], name="unique_article_slug_per_language"),
        ]

    def __str__(self):
        return self.title


class ArticleBlock(models.Model):
    class Kind(models.TextChoices):
        TEXT = "text", "Texto"
        IMAGE = "image", "Imagen"

    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="blocks")
    order = models.PositiveIntegerField("orden", default=0, db_index=True)
    kind = models.CharField("tipo", max_length=10, choices=Kind.choices, default=Kind.TEXT)
    text = ProseEditorField("texto", extensions=TEXT_EXTENSIONS, sanitize=True, blank=True)
    image = models.ImageField("imagen", upload_to="revista/imagenes/", blank=True)
    caption = models.CharField("epígrafe", max_length=200, blank=True)
    alt = models.CharField(
        "descripción de la imagen",
        max_length=200,
        blank=True,
        help_text="Qué se ve en la imagen, para quien no puede verla.",
    )

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "bloque"
        verbose_name_plural = "contenido"

    def __str__(self):
        return f"{self.get_kind_display()} {self.order}"

    def clean(self):
        if self.kind == self.Kind.TEXT and not self.text.strip():
            raise ValidationError({"text": "Un bloque de texto necesita texto."})
        if self.kind == self.Kind.IMAGE and not self.image:
            raise ValidationError({"image": "Un bloque de imagen necesita una imagen."})


class Comment(TimeStamped):
    article = models.ForeignKey(Article, verbose_name="artículo", on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="autor",
        on_delete=models.CASCADE,
        related_name="comments",
    )
    parent = models.ForeignKey(
        "self",
        verbose_name="responde a",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="replies",
    )
    body = models.TextField("comentario", max_length=2000)
    is_hidden = models.BooleanField(
        "oculto", default=False, help_text="Los comentarios ocultos no se muestran en la web."
    )

    class Meta:
        ordering = ["created_at"]
        verbose_name = "comentario"
        verbose_name_plural = "comentarios"

    def __str__(self):
        return self.body[:60]

    def clean(self):
        if self.parent_id:
            if self.parent.article_id != self.article_id:
                raise ValidationError({"parent": "La respuesta tiene que ser del mismo artículo."})
            if self.parent.parent_id:
                raise ValidationError({"parent": "Solo se puede responder a comentarios principales."})
