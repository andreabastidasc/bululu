from django.apps import AppConfig
from django.conf import settings
from django.db.models.signals import post_save


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"
    verbose_name = "Cuentas"

    def ready(self):
        from .signals import create_profile

        post_save.connect(create_profile, sender=settings.AUTH_USER_MODEL, dispatch_uid="accounts_create_profile")
