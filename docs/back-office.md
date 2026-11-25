# Back office

Guía para cargar contenido sin tocar código. El back office está en **/admin/**
(en desarrollo: http://localhost:8000/admin/).

## Entrar por primera vez

El primer admin se crea solo al arrancar el backend, con estas variables (en `.env` en local, o en
el panel del hosting en producción):

```
DJANGO_SUPERUSER_USERNAME=andrea
DJANGO_SUPERUSER_EMAIL=andrea@ejemplo.com
DJANGO_SUPERUSER_PASSWORD=una-contraseña-larga-del-gestor
```

Si el usuario ya existe, no se toca. Una vez creado, conviene borrar la contraseña de las variables.

Para sumar a otra persona: **Cuentas › Usuarios › Agregar**, con una contraseña temporal que esa
persona cambia al entrar, y marcar **Es superusuario** (o **Es staff** y solo los permisos de Revista).

## Artículos de la revista

**Revista › Artículos › Agregar artículo**

1. **Título, categoría y bajada.** La dirección se completa sola a partir del título.
2. **Portada:** imagen (opcional), color y bululito. Si no hay imagen, se usa el color con el bululito.
3. **Contenido:** el artículo se arma con bloques, que se reordenan arrastrándolos.
   - **Texto:** negrita, cursiva, subrayado, tachado, links, subtítulos, listas, citas y saltos de línea.
   - **Imagen:** la imagen, un epígrafe opcional y una descripción de lo que se ve (para lectores de pantalla).
4. **Publicación:**
   - **Borrador:** no se ve en la web.
   - **Publicado:** se ve en la web. Si dejas la fecha vacía, se publica ahora. Con una fecha futura, queda programado.
   - **Permitir comentarios:** se puede apagar por artículo.

## Comentarios

Solo pueden comentar personas con cuenta. Los comentarios se publican al instante.

**Revista › Comentarios**: para sacar uno de la web, márcalo como **Oculto** (o selecciona varios y usa
la acción **Ocultar comentarios seleccionados**). No se borran: se pueden volver a mostrar.

## Ver borradores en el sitio

Los admins pueden entrar al sitio en `/login` con su mismo usuario y contraseña del back office. Mientras tienen la sesión abierta:

- Ven una barra amarilla arriba ("Modo equipo") con un link al back office y el botón **Salir**.
- La portada y las páginas de artículo también muestran los borradores, marcados con «Borrador».
- El público nunca ve los borradores: la API (`/api/articulos/`) solo los devuelve a usuarios staff.

`/login` no está enlazada desde el sitio y no la indexan los buscadores. Solo pueden entrar usuarios marcados como **Es staff**.

En producción, `DJANGO_ALLOWED_HOSTS` tiene que incluir el dominio del front (por ejemplo `www.bululuworld.com`), porque el login pasa por el proxy de Next.
