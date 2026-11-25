import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="creado")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="actualizado")),
                (
                    "status",
                    models.CharField(
                        choices=[("draft", "Borrador"), ("published", "Publicado")],
                        default="draft",
                        max_length=12,
                        verbose_name="estado",
                    ),
                ),
                (
                    "published_at",
                    models.DateTimeField(
                        blank=True,
                        help_text="Si la dejas vacía, se completa sola al publicar. Una fecha futura lo programa.",
                        null=True,
                        verbose_name="fecha de publicación",
                    ),
                ),
                ("title", models.CharField(max_length=200, verbose_name="título")),
                (
                    "slug",
                    models.SlugField(
                        help_text="Así queda en el link: /revista/<dirección>",
                        max_length=200,
                        verbose_name="dirección",
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        help_text="Ej.: Línea de tiempo, Estudios que nos copan",
                        max_length=60,
                        verbose_name="categoría",
                    ),
                ),
                (
                    "excerpt",
                    models.TextField(
                        help_text="Una o dos frases que aparecen en la portada.",
                        max_length=300,
                        verbose_name="bajada",
                    ),
                ),
                (
                    "cover_image",
                    models.ImageField(blank=True, upload_to="revista/portadas/", verbose_name="imagen de portada"),
                ),
                (
                    "cover_color",
                    models.CharField(
                        choices=[
                            ("cobalt", "Cobalto"),
                            ("lemon", "Limón"),
                            ("coral", "Coral"),
                            ("mint", "Menta"),
                            ("bubblegum", "Chicle"),
                            ("lilac", "Lila"),
                        ],
                        default="lemon",
                        max_length=12,
                        verbose_name="color de portada",
                    ),
                ),
                (
                    "mascot",
                    models.CharField(
                        choices=[("tuqui", "Tuqui"), ("peti", "Peti"), ("redondo", "Redondo"), ("antena", "Antena")],
                        default="tuqui",
                        max_length=12,
                        verbose_name="bululito de portada",
                    ),
                ),
                (
                    "language",
                    models.CharField(
                        choices=[("es", "Español"), ("en", "Inglés")],
                        default="es",
                        max_length=5,
                        verbose_name="idioma",
                    ),
                ),
                ("allow_comments", models.BooleanField(default=True, verbose_name="permitir comentarios")),
                (
                    "translation_of",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="translations",
                        to="magazine.article",
                        verbose_name="traducción de",
                    ),
                ),
            ],
            options={
                "verbose_name": "artículo",
                "verbose_name_plural": "artículos",
                "ordering": ["-published_at", "-created_at"],
                "constraints": [
                    models.UniqueConstraint(fields=("slug", "language"), name="unique_article_slug_per_language"),
                ],
            },
        ),
        migrations.CreateModel(
            name="ArticleBlock",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, default=0, verbose_name="orden")),
                (
                    "kind",
                    models.CharField(
                        choices=[("text", "Texto"), ("image", "Imagen")],
                        default="text",
                        max_length=10,
                        verbose_name="tipo",
                    ),
                ),
                ("text", models.TextField(blank=True, verbose_name="texto")),
                ("image", models.ImageField(blank=True, upload_to="revista/imagenes/", verbose_name="imagen")),
                ("caption", models.CharField(blank=True, max_length=200, verbose_name="epígrafe")),
                (
                    "alt",
                    models.CharField(
                        blank=True,
                        help_text="Qué se ve en la imagen, para quien no puede verla.",
                        max_length=200,
                        verbose_name="descripción de la imagen",
                    ),
                ),
                (
                    "article",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="blocks",
                        to="magazine.article",
                    ),
                ),
            ],
            options={
                "verbose_name": "bloque",
                "verbose_name_plural": "contenido",
                "ordering": ["order", "id"],
            },
        ),
        migrations.CreateModel(
            name="Comment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="creado")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="actualizado")),
                ("body", models.TextField(max_length=2000, verbose_name="comentario")),
                (
                    "is_hidden",
                    models.BooleanField(
                        default=False,
                        help_text="Los comentarios ocultos no se muestran en la web.",
                        verbose_name="oculto",
                    ),
                ),
                (
                    "article",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="comments",
                        to="magazine.article",
                        verbose_name="artículo",
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="comments",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="autor",
                    ),
                ),
                (
                    "parent",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="replies",
                        to="magazine.comment",
                        verbose_name="responde a",
                    ),
                ),
            ],
            options={
                "verbose_name": "comentario",
                "verbose_name_plural": "comentarios",
                "ordering": ["created_at"],
            },
        ),
    ]
