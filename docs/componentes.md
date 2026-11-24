# Componentes

Usamos **atomic design**: cada componente vive en el nivel que le corresponde según qué tan
grande es y de qué está hecho.

| Nivel | Qué es | Puede usar | Componentes actuales |
|---|---|---|---|
| **Átomos** | La pieza mínima. No sabe nada del contenido de Bululú. | Nada de otros niveles | `ButtonLink`, `Pill`, `RoundButton`, `SectionTitle`, bululitos |
| **Moléculas** | Unos pocos átomos juntos con un propósito. | Átomos | `Crowd`, `WorldCard`, `MagazinePage`, `MagazinePager` |
| **Organismos** | Una sección completa de la página. | Átomos, moléculas y otros organismos | `Header`, `Footer`, `FeaturedTest`, `BululuWorld`, `Magazine`, `MagazineSection` |
| **Templates** | El esqueleto de una página, sin contenido propio. | Organismos | `SiteLayout` |
| **Páginas** | `src/app/`: arman todo con los datos reales. | Todo | `page.tsx` |

Regla práctica: un componente nunca importa de un nivel más alto que el suyo.

## Átomos

| Componente | Para qué |
|---|---|
| `ButtonLink` | Link con forma de botón. Variantes: `ink`, `coral`, `paper`, `lemon`. Tamaños: `md`, `sm`. |
| `Pill` | Etiqueta con borde. Tonos: `paper`, `ink`. Tamaños: `md`, `sm`. |
| `RoundButton` | Botón redondo con un ícono adentro (las flechas de la revista). |
| `SectionTitle` | Título grande de sección, con la tipografía de la marca. |
| `bululitos/` | Las mascotas. Ver abajo. |

## Bululitos

Cada bululito es su propio componente en `atoms/bululitos/`. Todos comparten el marco y los
ojos de `parts.tsx`, y se dibujan en un lienzo de 100 × 140.

| Componente | Clave | Color propio |
|---|---|---|
| `Tuqui` | `tuqui` | Coral |
| `Peti` | `peti` | Chicle |
| `Redondo` | `redondo` | Limón |
| `Antena` | `antena` | Menta |

Los nombres son internos: **no se muestran en la web**. `Redondo` y `Antena` todavía no tienen nombre definitivo.

```tsx
import { Tuqui, bululitos } from "@/components/atoms/bululitos";

<Tuqui />                          // con su color propio
<Tuqui color="#3550FF" />          // con otro color
<Tuqui width={80} height={112} />  // con otro tamaño

const Mascot = bululitos["peti"];  // elegido por clave, desde datos
<Mascot />
```

Props comunes: `color`, `width`, `height`, `x`, `y` (para usarlo dentro de otro SVG),
`className` y `label` (texto accesible; sin `label`, el dibujo es decorativo).

Para una multitud, `molecules/Crowd`: recibe una lista de bululitos con su clave, color, posición y tamaño.

### Agregar un bululito nuevo

1. Crea `atoms/bululitos/Nombre.tsx` usando `BululitoFrame` y `Eye` de `parts.tsx`.
2. Dale un color propio por defecto.
3. Súmalo al objeto `bululitos` en `atoms/bululitos/index.ts`.

## Crear un componente nuevo

1. Decide el nivel: ¿es una pieza mínima, una combinación chica o una sección entera?
2. Usa los átomos existentes antes de crear uno nuevo.
3. Estilos con las clases de la marca (ver [Marca](./marca.md)).
4. Si necesita estado o eventos del navegador, agrega `"use client"` arriba. Si no, déjalo como componente de servidor.
5. Accesibilidad: botones reales (`<button>`), `aria-label` en botones que solo tienen ícono,
   y áreas táctiles de al menos 44 px.
