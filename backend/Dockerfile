FROM python:3.12-slim AS base
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1
COPY requirements.txt ./
RUN pip install -r requirements.txt

FROM base AS dev
COPY . .
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && python manage.py create_admin && python manage.py runserver 0.0.0.0:8000"]

FROM base AS prod
RUN useradd --system --create-home django
COPY --chown=django:django . .
RUN DJANGO_SECRET_KEY=build-only python manage.py collectstatic --noinput \
    && mkdir -p /app/media && chown django:django /app/media
USER django
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && python manage.py create_admin && gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
