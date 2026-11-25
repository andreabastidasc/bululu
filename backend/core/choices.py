from django.db import models


class BrandColor(models.TextChoices):
    COBALT = "cobalt", "Cobalto"
    LEMON = "lemon", "Limón"
    CORAL = "coral", "Coral"
    MINT = "mint", "Menta"
    BUBBLEGUM = "bubblegum", "Chicle"
    LILAC = "lilac", "Lila"


class Mascot(models.TextChoices):
    TUQUI = "tuqui", "Tuqui"
    PETI = "peti", "Peti"
    REDONDO = "redondo", "Redondo"
    ANTENA = "antena", "Antena"


class Language(models.TextChoices):
    SPANISH = "es", "Español"
    ENGLISH = "en", "Inglés"


class Status(models.TextChoices):
    DRAFT = "draft", "Borrador"
    PUBLISHED = "published", "Publicado"
