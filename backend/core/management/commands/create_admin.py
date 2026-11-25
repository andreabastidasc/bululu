import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Crea el superusuario definido en DJANGO_SUPERUSER_USERNAME, _EMAIL y _PASSWORD, si todavía no existe."

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "")

        if not (username and password):
            self.stdout.write("Sin DJANGO_SUPERUSER_USERNAME o DJANGO_SUPERUSER_PASSWORD: no se crea ningún admin.")
            return

        User = get_user_model()
        if User.objects.filter(username=username).exists():
            self.stdout.write(f"El admin {username} ya existe.")
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f"Admin {username} creado."))
