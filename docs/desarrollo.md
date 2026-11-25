# Desarrollo

## Requisitos

- **Docker** con Docker Compose (recomendado: levanta todo junto), o
- **Node 20.9+** para el frontend y **Python 3.12+** para el backend, si prefieres correrlos sin Docker.

## Levantar todo con Docker

Desde la raíz del repo:

```bash
cp .env.example .env
docker compose up
```

El archivo `.env` es opcional en desarrollo: si no existe, se usan los valores por defecto.

| Servicio    | Qué es                                 | Dirección                                                       |
| ----------- | --------------------------------------- | ---------------------------------------------------------------- |
| `web`     | Frontend (Next.js)                      | http://localhost:3000                                            |
| `backend` | API y panel de administración (Django) | http://localhost:8000/api/health/ y http://localhost:8000/admin/ |
| `db`      | Base de datos (PostgreSQL 17)           | `localhost:5432`                                               |

Las carpetas `frontend/` y `backend/` están montadas dentro de los contenedores, así que los
cambios se ven al instante. El backend aplica las migraciones solo cada vez que arranca.

Comandos útiles:

```bash
docker compose up web                                   # solo el frontend
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py makemigrations
docker compose down                                     # apagar todo
docker compose down -v                                  # apagar y borrar la base de datos
```

### Versión de producción

Para probar las imágenes tal como se publicarían:

```bash
docker compose --profile prod up --build backend-prod web-prod
```

Corren en los mismos puertos que las de desarrollo, así que hay que apagar esas primero.
En producción, `DJANGO_SECRET_KEY` y `POSTGRES_PASSWORD` tienen que definirse en `.env` con valores propios.

### Cómo están armadas las imágenes

`frontend/Dockerfile`:

| Etapa     | Para qué                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `dev`   | Instala todo desde cero con `npm install` y corre el servidor de desarrollo con recarga en vivo                            |
| `deps`  | Instala las dependencias exactas del `package-lock.json` con `npm ci` (solo para producción)                            |
| `build` | Compila la app con `npm run build`                                                                                         |
| `prod`  | Imagen final y liviana: solo el servidor de Next.js (`output: "standalone"`), con un usuario sin permisos de administrador |

`backend/Dockerfile`:

| Etapa    | Para qué                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `base` | Python 3.12 con las dependencias de `requirements.txt`                                                |
| `dev`  | Migra y corre el servidor de desarrollo de Django                                                       |
| `prod` | Junta los archivos estáticos, migra y sirve con Gunicorn, con un usuario sin permisos de administrador |

No hace falta tener Node instalado: todo se instala dentro de Docker.

> **Importante para producción:** la imagen `prod` usa `npm ci`, que instala exactamente las versiones
> de `package-lock.json` y falla si ese archivo no coincide con `package.json`. Cuando agregues o quites
> una dependencia, actualiza el lockfile (también se puede hacer dentro de Docker) y súbelo junto con el cambio:
>
> ```bash
> docker compose run --rm --no-deps web npm install
> ```

## Levantar sin Docker

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend (sin `POSTGRES_DB` definido, usa SQLite en `backend/db.sqlite3`):

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Admin y clave secreta

### El admin

Al arrancar, el backend corre `python manage.py `, que crea un superusuario con estas
variables si todavía no existe:

| Variable                      | Ejemplo                                                       |
| ----------------------------- | ------------------------------------------------------------- |
| `DJANGO_SUPERUSER_USERNAME` | `andrea`                                                    |
| `DJANGO_SUPERUSER_EMAIL`    | `andrea@ejemplo.com`                                        |
| `DJANGO_SUPERUSER_PASSWORD` | Una contraseña larga, generada con un gestor de contraseñas |

- **En local:** en el `.env` de la raíz.
- **En producción:** en el panel de variables del hosting, nunca en archivos del repo. Cuando el admin
  ya existe, se puede borrar `DJANGO_SUPERUSER_PASSWORD` del panel.

El segundo admin se crea desde el back office (**Cuentas › Usuarios › Agregar**).

### La clave secreta de Django

`DJANGO_SECRET_KEY` firma las sesiones y los tokens. Tiene que ser larga, aleatoria y distinta en
local y en producción. Para generar una:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(50))"
```

O, sin Python instalado, con Docker:

```bash
docker compose run --rm --no-deps backend python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copia el resultado en `DJANGO_SECRET_KEY` (en `.env` o en el panel del hosting). Si cambia, se
cierran todas las sesiones abiertas.

## Cuentas y emails

En desarrollo, los emails (por ejemplo, el código para iniciar sesión) no se envían: aparecen en los
logs del backend (`docker compose logs -f backend`). Para enviarlos de verdad, define en `.env`
`DJANGO_EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend` y los datos `EMAIL_HOST`,
`EMAIL_HOST_USER` y `EMAIL_HOST_PASSWORD` de tu proveedor.

Para iniciar sesión con Google, crea un cliente OAuth en Google Cloud con la dirección de retorno
`http://localhost:3000/accounts/google/login/callback/` y completa `GOOGLE_CLIENT_ID` y
`GOOGLE_CLIENT_SECRET` en `.env`.

## Calidad del backend

Desde `backend/`, con [ruff](https://docs.astral.sh/ruff/) instalado:

```bash
ruff check .
ruff format .
```

La configuración está en `backend/pyproject.toml` (4 espacios, 120 caracteres por línea).

## Scripts del frontend

Desde `frontend/`:

| Comando               | Qué hace                                                  |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                                     |
| `npm run build`     | Compila para producción                                   |
| `npm run start`     | Sirve la versión compilada                                |
| `npm run typecheck` | Revisa los tipos de TypeScript                             |
| `npm run format`    | Formatea todo con Prettier y ordena las clases de Tailwind |

## Convenciones de código

- **Indentación:** 4 espacios, nunca tabs, en todo el repo (TypeScript, Python, YAML). Lo aplican `.editorconfig` y Prettier.
- **Estilos:** Tailwind CSS v4. Usamos las clases de la marca (`bg-cobalt`, `text-ink`, `shadow-hard`…)
  en lugar de colores sueltos. Ver [Marca](./marca.md).
- **Componentes:** organizados con atomic design. Ver [Componentes](./componentes.md).
- **Imports:** con el alias `@/`, que apunta a `frontend/src/`.
- **Textos:** en español neutro, tuteando ("haz el test", "descubre").
- **Contenido:** los artículos salen de la API. El test de la semana vive en `frontend/src/data/` hasta que los tests pasen al backend.

## Agregar contenido

### Un artículo de la revista

Desde el back office. Ver [Back office](./back-office.md).

### El test de la semana

Por ahora, en `frontend/src/data/tests.ts` (`featuredTest`).

## Git

El repo vive en la cuenta personal: `git@github-personal:andreabastidasc/bululu.git`.
Cada commit usa el nombre y el email personales, configurados solo para este repo.
