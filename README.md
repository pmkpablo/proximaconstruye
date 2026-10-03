# Próxima Construye

Sitio estático original en HTML, CSS y JavaScript, publicado en Cloudflare Pages. Sin dependencias ni código del constructor Hostinger.

## Desarrollo y publicación

- `npm run dev`: servidor local en http://127.0.0.1:4173 (se puede cambiar con la variable `PORT`).
- `npm run build`: genera las páginas desde `build-site.mjs` y `src/home-hero.html`; valida enlaces, anclas, recursos, metadatos, crédito, ausencia de precios y sintaxis.
- Publicar la carpeta `dist` mediante «Create deployment» en Cloudflare Pages, entorno Production. Elegir carpeta, no ZIP como archivo.

Proyecto: https://proximaconstruye.pages.dev/. Dominio: https://proximaconstruye.com/ y https://www.proximaconstruye.com/. Publicación inicial y ampliación: 3 de octubre de 2026.

Código: https://github.com/pmkpablo/proximaconstruye, rama `main`. Pages usa Direct Upload; un push a GitHub no publica automáticamente.

Nameservers confirmados: `huxley.ns.cloudflare.com` y `kinsley.ns.cloudflare.com`. CNAME proxied de `@` y `www` hacia `proximaconstruye.pages.dev`. Correo Hostinger conservado: MX, SPF, DKIM, DMARC, autoconfig y autodiscover como DNS only.

## Páginas y alcance

Inicio con hero en video; Wood Frame; viviendas; cabañas; catálogo de servicios; construcción convencional; ampliaciones y refacciones; diseño y planificación; piscinas y exteriores; contacto. Incluye galerías ampliables, preguntas frecuentes, consultas específicas por servicio, sitemap y página 404.

No se publican precios, promociones ni financiación. Las modalidades documentadas son Wood Frame in situ y construcción convencional. Los diseños son referencias ilustrativas, sin medidas ni atribución como obras ejecutadas. Los porcentajes de ahorro y el plazo fijo de los folletos no se presentan como garantías generales.

Base: CARPETA PROXIMA REV.2.pdf, TRIPTICO PROXIMA 02.pdf, FOLLETO CABAÑAS 1.pdf e Indicaciones Proxima Construye.txt. Web Proxima construye.txt se revisó como referencia mínima. Misión reescrita; «Sobre mí» postergado.

Referencias revisadas: https://gaurosviviendas.com.ar/ y https://www.viviendascolon.com.ar/. Se adaptaron organización por categorías, explicación del sistema, fichas propias y galerías. No se copiaron código, textos, imágenes ni promesas comerciales ajenas.

## Contacto

WhatsApp +54 9 381 3513216 e info@proximaconstruye.com, según folletos. Configuración en `dist/app.js` y enlaces visibles del generador. El formulario prepara una consulta con nombre, correo, tipo de obra, ubicación, terreno, superficie opcional y mensaje. El visitante confirma el envío en WhatsApp o su aplicación de correo. No hay backend ni almacenamiento de consultas.

## Recursos visuales

Detalle de origen, licencia y edición en `ASSETS.md`. Logo sin fondo y favicon X con transparencia real. Footer: «Sitio web por Axhum Tech». Las fotos de competidores y los planos IDEAL.HOUSE no se utilizaron.

Actualización de interfaz: portada de servicios con imagen, títulos y espacios ajustados para celular, bloque de contacto con botones alineados y flotante circular con ícono WhatsApp. Verificado a 320, 390 y 820 píxeles, además de escritorio; sin desbordamiento horizontal en las páginas revisadas.

Navegación de servicios: desplegable con cinco tipos de trabajo y acceso al catálogo. Se abre con cursor en escritorio, toque dentro del menú móvil y teclado (Enter, espacio y flechas); Escape cierra primero el submenú y después el menú. La selección navega a la página correspondiente y restablece los estados. El cambio de tamaño cierra la navegación; se respeta movimiento reducido.
