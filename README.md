# bululú · mundo creativo

Un estudio creativo chiquito con muchas ganas de jugar: tests absurdos para hacer con tu gente,
una revista de cosas que nos inspiran y, más adelante, juegos y objetos propios.

## Empezar

Desde la raíz del repo, con Docker:

```bash
cp .env.example .env
docker compose up
```

| Qué | Dónde |
|---|---|
| Web | http://localhost:3000 |
| API | http://localhost:8000/api/health/ |
| Panel de administración | http://localhost:8000/admin/ |

Para correr cada parte sin Docker, ver [Desarrollo](./docs/desarrollo.md).

## Estructura

```
bululu/
├── docker-compose.yml   Frontend + backend + PostgreSQL
├── docs/                Documentación del proyecto
├── backend/             Django + Django REST Framework
└── frontend/            Next.js + React + TypeScript + Tailwind
```

## Documentación

| Documento | De qué trata |
|---|---|
| [Desarrollo](./docs/desarrollo.md) | Levantar el proyecto, Docker, scripts y convenciones |
| [Arquitectura](./docs/arquitectura.md) | Stack, carpetas y flujo de datos |
| [Componentes](./docs/componentes.md) | Atomic design y bululitos |
| [Marca](./docs/marca.md) | Colores, tipografías, estilo y tono |
| [Decisiones y próximos pasos](./docs/decisiones.md) | Lo decidido y lo que viene |
