from django.db import models
from django.utils import timezone

from .choices import Status


class TimeStamped(models.Model):
    created_at = models.DateTimeField("creado", auto_now_add=True)
    updated_at = models.DateTimeField("actualizado", auto_now=True)

    class Meta:
        abstract = True


class PublishedQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status=Status.PUBLISHED, published_at__lte=timezone.now())


class Publishable(models.Model):
    status = models.CharField("estado", max_length=12, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(
        "fecha de publicación",
        null=True,
        blank=True,
        help_text="Si la dejas vacía, se completa sola al publicar. Una fecha futura lo programa.",
    )

    objects = PublishedQuerySet.as_manager()

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.status == Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
