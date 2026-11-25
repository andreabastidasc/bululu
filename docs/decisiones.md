# Decisiones y próximos pasos

## Lo que ya decidimos

| Tema | Decisión |
|---|---|
| Nombre | **Bululú**, con el lema **"mundo creativo"** |
| Qué es | Un estudio creativo de juego: tests, revista y, más adelante, juegos y objetos propios |
| Público | Hispanohablantes de toda Latinoamérica y España, en español neutro |
| Contenido | Tests absurdos y una revista de cosas que nos inspiran. Nada de chimentos ni noticias |
| Primer test | "¿Qué protagonista de GTA serías en la cena de Navidad?", con todos los protagonistas de la saga |
| Marcas de terceros | Se nombran en el texto, pero sin usar logos, arte ni personajes oficiales. Aviso de "hecho por fans" en el footer |
| Sección para marcas | Oculta por ahora |
| Login | Nunca obligatorio para hacer un test. Opcional para guardar resultados y compararse |
| @ de Instagram | Opcional, se escribe a mano y aparece en la tarjeta de resultado |
| Bululitos | Los nombres no se muestran en la web. Por ahora: Tuqui y Peti, más dos sin nombre definitivo |
| Back office | Admin de Django con Unfold, no Wagtail, para no atarse a un CMS. Por ahora solo artículos por bloques y comentarios |
| Orden de trabajo | De a una parte por vez: primero artículos; los tests llegan al backend en otra etapa |
| Comentarios | Solo con cuenta (código por email o Google). Se publican al instante y se pueden ocultar desde el back office |
| Autor de los artículos | No se guarda por ahora. Todos los artículos firman "Alguien del bululú" |
| Idiomas | Por ahora solo español. Los artículos ya tienen idioma y "traducción de", para sumar inglés más adelante sin rehacer la base |
| Migraciones | Mientras no haya datos reales, cada app mantiene una sola migración inicial |

## Próximos pasos

1. **Login con Google** para que la gente pueda comentar.
2. **Tarjeta de resultado** para historias (1080 × 1920), con el @ opcional y vista previa al compartir el link.
3. **Artículo**: "De Liberty City a Leonida: la historia de GTA".
4. **Tests en el backend**: modelos, back office y página del test de GTA, en una etapa aparte.
5. **Más adelante, con cuentas:** guardar resultados, compararse con amigos y un resumen tipo "Tu año en Bululú".
6. **Política de privacidad**, antes de guardar cualquier dato de usuarios.
