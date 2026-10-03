# Próxima Construye

Web estática original en HTML, CSS y JavaScript, preparada para Cloudflare Pages. Sin dependencias ni código del constructor Hostinger.

## Ejecutar

`npm run dev` abre un servidor en http://127.0.0.1:4173. `npm run build` verifica archivos, anclas y JavaScript. Publicar el directorio `dist`.

## Cloudflare Pages

Conectar `pmkpablo/proximaconstruye`, elegir la rama de publicación, framework «None», comando `npm run build` y directorio `dist`. Agregar `proximaconstruye.com` desde Custom domains. El cambio de DNS debe preservar los registros MX, SPF, DKIM y DMARC que sostienen el correo existente. No se modificaron registros DNS desde este proyecto.

## Contenido y contacto

Base documental: CARPETA PROXIMA REV.2.pdf, TRIPTICO PROXIMA 02.pdf, FOLLETO CABAÑAS 1.pdf e Indicaciones Proxima Construye.txt. El HTML de Web Proxima construye.txt se revisó como referencia mínima. Misión reescrita, Wood Frame in situ como foco, otros servicios y «Sobre mí» postergado.

Contacto de los folletos: 381 3513216 e info@proximaconstruye.com. WhatsApp normalizado a +54 9 381 3513216; editar `contacto` en `dist/app.js` y enlaces visibles si cambia el destinatario. No se comprobó externamente que el número tenga una cuenta WhatsApp activa.

El formulario prepara mensajes para WhatsApp o la aplicación de correo mediante mailto. No hay backend de envío automático, almacenamiento de datos ni confirmaciones ficticias. El visitante confirma el envío en la aplicación elegida.

Los archivos visuales y el video fueron aportados por el cliente. No se descargaron imágenes de competidores ni se reutilizaron planos con marca IDEAL.HOUSE. Las viviendas se rotulan como propuestas ilustrativas, sin atribuirlas como obras ejecutadas.

El video está disponible bajo demanda desde el hero, evitando descargar 25 MB automáticamente en móviles. No se crearon subdominios: sus nombres y contenidos independientes todavía no están definidos.

Referencias estructurales consultadas: https://gaurosviviendas.com.ar/ y https://sevayco.com/. Viviendas Colón no fue accesible con la herramienta de navegación. No se copió código ni texto de estos sitios.

Antes de abrir al público: validar vigencia de teléfono, autorización de los recursos del cliente y alcance comercial de servicios. Los porcentajes de ahorro y el plazo fijo de 60 días de los folletos no se presentan como garantías generales.
