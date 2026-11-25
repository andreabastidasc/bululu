# Arquitectura

## Stack

| Parte | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Estilos | Tailwind CSS v4 |
| Tipografías | Google Fonts vía `next/font` (Bagel Fat One y Rubik) |
| Formato | Prettier + `prettier-plugin-tailwindcss` |
| Backend | Django 5.2 + Django REST Framework, servido con Gunicorn |
| Back office | Admin de Django con el tema Unfold y el editor django-prose-editor |
| Cuentas | django-allauth (código por email y Google), en modo headless |
| Base de datos | PostgreSQL 17 (SQLite si se corre el backend sin Docker) |
| Contenedores | Docker y Docker Compose, orquestados desde la raíz |

### Por qué Next.js y no una SPA de React

- **Buscadores:** las páginas se generan en el servidor, así Google indexa bien la revista.
- **Vistas previas al compartir:** cada test y resultado puede tener su propia imagen y título
  cuando alguien pega el link en WhatsApp o redes. Es clave para que los tests se viralicen.

## Estructura de carpetas

```
bululu/
├── docker-compose.yml       Levanta frontend, backend y base de datos
├── .env.example             Variables de entorno de ejemplo
├── docs/                    Esta documentación
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── config/              Configuración de Django (settings, urls)
│   ├── core/                Opciones compartidas (colores, bululitos, estados) y /api/health/
│   ├── accounts/            Perfil de usuario (nombre visible, Instagram)
│   └── revista/             Artículos por bloques y comentarios
└── frontend/
    ├── Dockerfile
    ├── public/              Archivos estáticos (robots.txt, imágenes, favicon)
    └── src/
        ├── app/             Páginas de Next.js, layout y estilos globales
        ├── components/
        │   ├── atoms/       Piezas mínimas (botones, etiquetas, bululitos)
        │   ├── molecules/   Combinaciones chicas (tarjetas, multitudes, paginador)
        │   ├── organisms/   Secciones completas (header, hero, revista, footer)
        │   └── templates/   Estructura de página (SiteLayout)
        └── data/            Contenido: tests, artículos y textos de secciones
```

## Cómo fluyen los datos

```
Django (admin + API)  →  src/lib/api.ts  →  app/…/page.tsx  →  organisms  →  molecules  →  atoms
```

Las páginas piden los datos en el servidor con las funciones de `src/lib/api.ts` y se los pasan a las
secciones. Dentro de Docker, el frontend llega al backend por `API_URL` (`http://backend:8000`).

| Contenido | De dónde sale hoy |
|---|---|
| Artículos y comentarios | API (`getArticles`, `getArticle`, `getComments`) |
| Test de la semana y textos de "Mundo Bululú" | `src/data/` (pasan a la API en el próximo paso) |

Los tipos de `src/lib/api.ts` (`ArticleSummary`, `Article`, `Comment`) son el contrato con la API.

## Componentes de cliente y de servidor

Casi todo se renderiza en el servidor. Solo llevan `"use client"` los que necesitan
interacción en el navegador:

| Componente | Por qué |
|---|---|
| `organisms/Header` | Abre y cierra el menú del celular |
| `organisms/Magazine` | Desliza las páginas y sabe cuál está a la vista |

## Servicios de Docker

```
navegador ──► web (Next.js, :3000) ──► backend (Django, :8000) ──► db (PostgreSQL, :5432)
```

El frontend reenvía `/api/`, `/_allauth/`, `/accounts/` y `/media/` al backend (`rewrites` en
`next.config.ts`). Así el navegador habla con un solo dominio y las cookies de sesión funcionan sin
configurar CORS.

## Modelo de datos

| App | Modelos |
|---|---|
| `revista` | `Article` (portada, estado, fecha, idioma) → `ArticleBlock` (texto enriquecido o imagen, ordenables) · `Comment` (con una respuesta de nivel, ocultable) |
| `accounts` | `Profile` (uno por usuario, se crea solo) |

Los artículos tienen `status` (borrador o publicado) y `published_at`. Solo se muestra lo publicado
con fecha pasada, así se pueden programar publicaciones.

### Idiomas (preparado, sin usar todavía)

Cada artículo tiene `language` (`es` o `en`) y `translation_of`, que apunta al artículo original. Una
traducción es otro artículo, con sus propios bloques, y puede repetir la dirección en otro idioma
(`slug` es único por idioma). La API devuelve español por defecto; con `?lang=en` devolverá inglés.
Por ahora estos campos no aparecen en el back office.

## API

| Método | Ruta | Para qué |
|---|---|---|
| GET | `/api/health/` | Chequeo de salud |
| GET | `/api/articulos/` | Artículos publicados (en español; `?lang=en` para inglés) |
| GET | `/api/articulos/<slug>/` | Un artículo con sus bloques |
| GET | `/api/articulos/<slug>/comentarios/` | Comentarios visibles con sus respuestas |
| POST | `/api/articulos/<slug>/comentarios/` | Comentar (requiere sesión). Body: `{"body", "parent"?}` |
| GET, PATCH | `/api/yo/` | Perfil de la persona con sesión |
| — | `/_allauth/browser/v1/…` | Registro, inicio de sesión por código y con Google (django-allauth headless) |

Los tests todavía no están en el backend: el test de la semana vive en `frontend/src/data/tests.ts`.
