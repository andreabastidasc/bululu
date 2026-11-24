# Marca

**Bululú: mundo creativo.** Un estudio creativo chiquito con muchas ganas de jugar.

## Colores

Planos, con contorno tinta, sobre papel. Nada de degradés.

| Nombre | Hex | Clase de Tailwind | Uso |
|---|---|---|---|
| Cobalto | `#3550FF` | `bg-cobalt` | Secciones de marca, footer |
| Limón | `#FFC63D` | `bg-lemon` | Test de la semana, acentos |
| Coral | `#FF5A4E` | `bg-coral` | Botón principal del header |
| Menta | `#22C3A0` | `bg-mint` | Tarjetas, bululitos |
| Chicle | `#FF8FCB` | `bg-bubblegum` | Tarjetas, bululitos |
| Lila | `#9B7BFF` | `bg-lilac` | Bululitos |
| Tinta | `#1B1530` | `text-ink`, `border-ink` | Texto, contornos y sombras |
| Tinta suave | `#4A4360` | `text-ink-soft` | Textos secundarios |
| Papel | `#FFF6E9` | `bg-paper` | Fondo general |

Están definidos en `frontend/src/app/globals.css` (bloque `@theme`). Para usarlos dentro de
SVG, están también en `frontend/src/data/colors.ts`.

## Tipografías

| Uso | Fuente | Clase |
|---|---|---|
| Logo, títulos y resultados | Bagel Fat One | `font-display` |
| Todo lo demás | Rubik (400, 500, 700) | `font-sans` (por defecto) |

## Estilo gráfico

- **Contornos:** 3 px de tinta (`border-3 border-ink`).
- **Sombras duras,** sin desenfoque: `shadow-hard-sm` (3 px), `shadow-hard` (5 px), `shadow-hard-lg` (8 px).
- **Títulos sobre color:** con sombra dura de texto (`text-outline`).
- **Botones:** redondeados, con un saltito al pasar el mouse.
- **Bordes redondeados** generosos en tarjetas (24 px).

## Bululitos

Las mascotas: personajes con forma de gota o manchita, ojos grandes y colores planos. Se usan
amontonados (un "bululú") o solos en portadas y tarjetas. Ver [Componentes](./componentes.md#bululitos).

Por ahora los nombres no se mencionan en la web.

## Tono

- **Corto:** se juega en un minuto o dos.
- **Social:** está hecho para compartir y comparar con tu gente.
- **Absurdo y cálido:** te ríes, pero nunca de alguien. Nada de chimentos ni burlas.
- **Español neutro**, tuteando, para toda Latinoamérica y España.

Filtro para cualquier idea nueva: si es lúdico, creativo y celebra algo en vez de criticar, es Bululú.
