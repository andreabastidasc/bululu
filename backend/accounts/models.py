from django.conf import settings
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    display_name = models.CharField("nombre visible", max_length=40, blank=True)
    instagram = models.CharField("usuario de Instagram", max_length=30, blank=True, help_text="Sin la @.")

    class Meta:
        verbose_name = "perfil"
        verbose_name_plural = "perfiles"

    def __str__(self):
        return self.display_name or str(self.user)
