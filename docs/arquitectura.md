# Arquitectura

## Stack

| Parte | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Estilos | Tailwind CSS v4 |
| Tipografías | Google Fonts vía `next/font` (Bagel Fat One y Rubik) |
| Formato | Prettier + `prettier-plugin-tailwindcss` |
| Backend | Django 5.2 + Django REST Framework, servido con Gunicorn |
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
│   └── core/                App base: por ahora, el chequeo de salud /api/health/
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

Hoy:

```
src/data/*.ts  →  app/page.tsx  →  organisms  →  molecules  →  atoms
```

`page.tsx` toma los datos y se los pasa a las secciones. Los componentes no importan datos
por su cuenta (salvo `Header`, que enlaza al test de la semana), así es fácil cambiar el origen.

Cuando el contenido pase al backend:

```
Django (admin + API)  →  fetch en app/page.tsx  →  organisms  →  …
```

Dentro de Docker, el frontend llega al backend por `API_URL` (`http://backend:8000`). Solo cambia de dónde salen los datos: los componentes quedan igual. Los tipos de
`src/data/` (`TestSummary`, `ArticleSummary`) sirven de contrato con la API.

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

Hoy el backend tiene el panel de administración y un único endpoint, `GET /api/health/`, que
confirma que la API y la base de datos responden. Los modelos de tests, resultados y artículos
son el próximo paso.
