# Mindstack — dirección visual de la portada (fase 1)

Fecha: 23 de noviembre de 2026. Rama: `feature/evaluacion-empresarial-mvp-20261123`.

## Propósito

La portada debe comunicar **inteligencia empresarial con criterio humano**, y dar protagonismo a la evaluación gratuita para restaurantes, sin presentar la herramienta como un diagnóstico ni inventar resultados.

## Imágenes elegidas para la vista previa

### Hero — análisis empresarial

- Archivo remoto: `https://images.unsplash.com/photo-1758518729908-d4220a678d81`
- Página de origen: https://unsplash.com/photos/two-business-people-reviewing-documents-together-8k5j5z6ZYT4
- Autor: Vitaly Gariev. La página individual indica uso gratuito bajo licencia Unsplash.
- Elección: dos personas revisan un documento en una oficina, con vestimenta profesional; su acción apoya la narrativa «comprender antes de decidir».
- Tratamiento: imagen editorial extendida hacia el borde derecho del hero, con máscara gradiente a grafito y sin texto promocional dentro de la foto.
- La imagen **no representa** al personal ni a clientes de Mindstack; se rotula «Imagen ilustrativa» para evitar esa asociación.

### Evaluación — contexto restaurantero

- Archivo remoto: `https://images.unsplash.com/photo-1667388969250-1c7220bf3f37`
- Página de origen: https://unsplash.com/fr/photos/une-salle-avec-tables-et-chaises-e4B5AvA7Jqo
- Uso: fotografía de restaurante, como franja editorial del ejemplo de lectura inicial, para que se visualice el sector al que está dirigido el cuestionario.
- Tratamiento: recorte horizontal sobrio; no se presentan cifras ni resultados financieros sobre una foto.

### Precauciones de producción

- Licencia general: https://unsplash.com/license. Las licencias de fotografías **no garantizan por sí solas** autorizaciones de imagen de personas, marcas ni locales. Revisar derechos de terceros antes de publicidad o despliegue final.
- Aunque las fotografías se utilizan como ejemplos ilustrativos, **es preferible sustituirlas por imágenes propias de Mindstack**, tomadas con autorización de las personas, cuando existan.
- Actualmente se sirven desde Unsplash mediante URL externa, sin añadir secretos ni dependencias al backend. Antes del lanzamiento final, si se obtienen los archivos autorizados, optimizarlos y alojarlos en `public/` para evitar depender de un servidor de imágenes externo.

## Recursos narrativos adicionales

- Riel editorial de tres ideas: **Observar la realidad → Comprender las señales → Decidir si profundizar**.
- Transición de hero grafito a evaluación marfil, con la misma línea dorada y retícula; evita sensación de secciones desconectadas.
- Preview de resultados como interfaz, no puntuación ficticia. Sus ejemplos siguen siendo *ilustrativos*, vinculados a los conceptos que el motor ya reconoce.

## Límites de esta fase

- Se modificaron exclusivamente `app/page.tsx` y `app/globals.css`.
- No se modificaron el cuestionario interno, su motor, la API, el aviso, Cloudflare Worker ni Neon.
- Mantener cambios en PR #1, sin fusionar a `main` ni alterar producción hasta aprobación visual.
