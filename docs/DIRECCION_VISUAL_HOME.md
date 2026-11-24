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

### Evaluación — vista previa del producto

- **Decisión de iteración 2:** retirar la segunda fotografía de restaurante. Competía con la fotografía protagonista y hacía que el resultado pareciera otra tarjeta ajena al hero.
- El producto ahora se visualiza como interfaz marfil con una cabecera grafito y línea dorada que se superpone parcialmente al borde inferior del hero.
- Se conservan ejemplos claramente ilustrativos de fortaleza declarada, situación por comprender y aspecto por aclarar; no se presentan indicadores ni diagnósticos inventados.

### Precauciones de producción

- Licencia general: https://unsplash.com/license. Las licencias de fotografías **no garantizan por sí solas** autorizaciones de imagen de personas, marcas ni locales. Revisar derechos de terceros antes de publicidad o despliegue final.
- Aunque las fotografías se utilizan como ejemplos ilustrativos, **es preferible sustituirlas por imágenes propias de Mindstack**, tomadas con autorización de las personas, cuando existan.
- Actualmente se sirven desde Unsplash mediante URL externa, sin añadir secretos ni dependencias al backend. Antes del lanzamiento final, si se obtienen los archivos autorizados, optimizarlos y alojarlos en `public/` para evitar depender de un servidor de imágenes externo.

## Recursos narrativos adicionales

- La primera iteración incluía un riel separado de tres ideas. **Se retiró** porque se percibía como una franja añadida y generaba espacio vacío.
- La continuidad se logra ahora con el propio ejemplo de resultados, que cruza parcialmente el límite hero/evaluación. Su cabecera comparte grafito y dorado con el hero y su contenido está sobre el marfil de la sección siguiente.
- La fotografía principal sigue siendo la única imagen de gran formato en esta secuencia.
- Preview de resultados como interfaz, no puntuación ficticia. Sus ejemplos siguen siendo *ilustrativos*, vinculados a los conceptos que el motor ya reconoce.

## Límites de esta fase

- Se modificaron exclusivamente `app/page.tsx` y `app/globals.css`.
- No se modificaron el cuestionario interno, su motor, la API, el aviso, Cloudflare Worker ni Neon.
- Mantener cambios en PR #1, sin fusionar a `main` ni alterar producción hasta aprobación visual.


## Iteración integral — todas las secciones (23 de noviembre de 2026)

**Problema hallado:** 12 secciones con numerosos titulares y tarjetas sobre negro, repetición del principio «comprender antes de transformar», escasa narrativa fotográfica y elementos que aparentaban ser enlaces sin serlo.

**Solución implementada en rama de pruebas:** pasar de 12 a **8 capítulos** claros, sin modificar la web de producción ni la infraestructura de captación:

1. **Hero:** conservar la fotografía editorial de análisis y la evaluación como acción prioritaria.
2. **Evaluación gratuita:** mantener fondo marfil, CTA y ejemplo ilustrativo del resultado.
3. **Industria / Restaurantes:** fotografía documental de una cocina en operación, explicación del contexto, seis señales empresariales preservadas y acceso a la evaluación; sin otra cuadrícula de tarjetas oscuras.
4. **Capacidades:** cinco servicios reales conservados en lista editorial, sin flechas ni falsas interacciones en tarjetas.
5. **Método:** cinco pasos, ahora más concisos, presentados en un recorrido visual lineal, sin repetir el bloque de «inteligencia» anterior.
6. **Lectura empresarial:** ejemplo ilustrativo del tipo de comprensión que puede aportar la consultoría, **distinto** de la evaluación gratuita; esquema, no informe real ni caso de éxito.
7. **La firma:** fotografía institucional de dirección general, propuesta de valor resumida y tres principios verificables de trabajo.
8. **Contacto:** único cierre comercial, con dos rutas diferenciadas: evaluación para restaurantes y conversación directa sobre un problema empresarial.

La sección de **Insights**, que sólo mostraba extractos no enlazados, quedó fuera de la home. Su contenido relevante ya se cubre mediante señales de operación. Si se producen artículos reales, podrá recuperarse como una sección de publicaciones auténticas. Se fusionaron también «Nuestro enfoque», «Cómo empezar» y el cierre duplicado.

### Nuevas fotografías y condiciones

- **Operación restaurantera:** https://unsplash.com/photos/chefs-working-in-a-busy-restaurant-kitchen-dAGv2gGGj-4, fotografía de Madeline Liu, de 22 de octubre de 2025, anunciada como gratuita bajo licencia Unsplash. Archivo temporal de vista previa: `https://images.unsplash.com/photo-1761095596618-081ea3f043a5`.
- **Contexto urbano de Ciudad de México:** https://unsplash.com/photos/white-and-blue-glass-walled-high-rise-building-zdharkdAqaY, fotografía de Tomas Martinez (WTC, Ciudad de México), anunciada como gratuita bajo licencia Unsplash. Archivo temporal: `https://images.unsplash.com/photo-1628516315527-110eb03991ac`.
- Las imágenes no representan trabajadores, clientes ni edificios propiedad de Mindstack, salvo el retrato institucional propio de la firma.
- No se añadieron datos de clientes, testimonios, certificaciones ni cifras ficticias. La consulta comercial sigue separada del envío de evaluaciones.
- **Pendiente de aprobación final:** confirmar derechos de imagen y autoalojar archivos optimizados, una vez elegido el resultado visual definitivo.

### Diseño y experiencia

- Se conserva negro grafito, marfil y dorado. Los capítulos transicionan progresivamente entre superficies para evitar el efecto de diapositivas.
- La fotografía se utiliza para mostrar **personas, operación y contexto**; los gráficos se reservan para **método y resultados**.
- Los servicios y situaciones empresariales usan filas editoriales con líneas divisorias, no tarjetas interactivas falsas.
- Los títulos se jerarquizan para no competir con el hero.
- La evaluación es la acción principal del encabezado y también la vía específica para restaurantes en el cierre.
- Se añadió menú móvil desplegable en HTML nativo, conservando visible el CTA principal.

### No tocar

Toda esta fase cambia únicamente `app/page.tsx` y `app/globals.css`. Se mantiene intacto el motor `lib/evaluacion/motor.ts`, `lib/evaluacion/cliente.ts`, `app/evaluacion/`, el aviso, Worker API y Neon.

**Antes de publicarla:** revisar vista previa en escritorio y móvil, legibilidad de fotografías, accesibilidad de contraste, peso de imágenes, rutas de botones y pruebas de integración. Mantener PR #1 como borrador hasta aprobación expresa.
