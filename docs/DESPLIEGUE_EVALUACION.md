# Mindstack · Arquitectura y despliegue de Evaluación Empresarial

Actualizado: **23 de noviembre de 2026**  
Responsable de los datos: **Grupo Mindstack, S.A. de C.V.**  
**Estado:** estructura de código y migraciones preparada en la rama de pruebas; la integración real de punta a punta debe comprobarse antes de lanzar. **No fusionar a main hasta aprobar la experiencia visual y confirmar las pruebas finales.**

## 1. Componentes y responsabilidad de cada capa

| Capa | Fuente | Función |
| --- | --- | --- |
| Web institucional | `app/page.tsx`, `app/globals.css` | Inicio, narrativa comercial y llamada a la evaluación |
| Evaluación pública | `app/evaluacion/page.tsx`, `evaluacion.module.css` | Cuestionario, resultados, consentimiento y formulario opcional |
| Reglas interpretativas | `lib/evaluacion/motor.ts` | Preguntas, condiciones, hallazgos y limitaciones sin diagnóstico |
| Configuración pública compartida | `lib/evaluacion/config.ts` | URL de API, versión aprobada del aviso, ruta legal y Site Key pública |
| Cliente API web | `lib/evaluacion/cliente.ts` | Comprobación de disponibilidad y envío, independiente de los componentes visuales |
| Aviso legal | `app/aviso-de-privacidad/page.tsx` | Aviso `2026-11-23-v2` aprobado por Mindstack |
| API privada | `worker/src/index.ts` | Valida origen, datos, consentimiento, Turnstile; inserta en Neon; elimina vencidos |
| Configuración Cloudflare API | `worker/wrangler.jsonc` | Orígenes, versión del aviso, cron diario y límite de peticiones |
| Persistencia | `infra/neon/001_evaluaciones.sql`, `002_retencion_evaluaciones.sql` y `003_retencion_excepciones_validacion.sql` | Evaluaciones, contactos y excepciones de retención con motivo obligatorio |
| CI | `.github/workflows/evaluacion-ci.yml` | Pruebas del motor, build estático, TypeScript y empaquetado Workers |

### Separación deliberada

- Repositorio `Antonio958/mindstack-web`, rama `feature/evaluacion-empresarial-mvp-20261123`, PR #1.
- Web pública de producción: `https://mindstack-web.luispalmhdz06.workers.dev/` (main, **sin fusionar**).
- Web de prueba: `https://feature-evaluacion-empresarial-mvp-20261123-mindstack-web.luispalmhdz06.workers.dev/`.
- API: `https://mindstack-evaluacion-api.luispalmhdz06.workers.dev/`.
- Neon separado: proyecto `odd-silence-54841723`, base `neondb`.
- **No modificar ni conectar directamente el CRM actual ni su Supabase.**

## 2. Flujo técnico ya codificado

1. La persona responde en el navegador. Las reglas de `motor.ts` generan una lectura inicial sin consultar el servidor.
2. Puede conocer resultados sin compartir ningún dato.
3. Si llegó al resultado y la API está disponible, la web consulta `GET /api/estado`. El Worker verifica configuración, conexión con Neon y que la versión del aviso coincida con la aprobada; se aplica límite de peticiones por cliente.
4. Si todo está listo y el sector es compatible, aparece un formulario **opcional** de nombre, correo, teléfono opcional y consentimiento desmarcado.
5. Enviar exige además un token de Cloudflare Turnstile, que el Worker verifica con el servicio de Cloudflare y hostname exacto.
6. El Worker comprueba el cuestionario completo y válido, el correo, el origen exacto, el consentimiento afirmativo, el aviso `2026-11-23-v2`, el tamaño y tipo del cuerpo y el límite de peticiones.
7. Neon registra una evaluación y su contacto en una misma sentencia transaccional. Se guarda la versión del aviso, hora del consentimiento y resultado; no se concede automáticamente autorización para publicidad.
8. La web informa el resultado de envío y su referencia. Ante error, se invalida y reinicia Turnstile para permitir una nueva comprobación.

No se ha implementado lectura pública de prospectos, y ninguna credencial de Neon figura en el navegador ni en GitHub.

## 3. Cloudflare — secretos, variables y límites

**Secrets que deben estar en el Worker API (Production):**
- `DATABASE_URL`: conexión **del proyecto Neon de evaluaciones**, tipo Secret.
- `TURNSTILE_SECRET`: clave secreta rotada del widget Mindstack Evaluación Empresarial, tipo Secret.

**Los demás valores están versionados en código**, no hay que crearlos manualmente si se respetan los archivos de configuración:
- `PRIVACY_VERSION=2026-11-23-v2` declarado en `worker/wrangler.jsonc`.
- `NEXT_PUBLIC_EVALUACION_API_URL`, `NEXT_PUBLIC_AVISO_PRIVACIDAD_URL`, `NEXT_PUBLIC_AVISO_PRIVACIDAD_VERSION` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY` tienen valores públicos por defecto en `lib/evaluacion/config.ts` / web; solo se necesitan como variables de build para sobreescribirlos conscientemente.
- `ALLOWED_ORIGIN` y `ALLOWED_PREVIEW_ORIGIN` aceptan exactamente la web principal y el hostname de la vista previa, respectivamente. Si se añade un dominio propio, **actualizar también** la lista de hostnames permitidos del widget Turnstile.
- `PUBLIC_API_RATE_LIMITER`: 25 consultas por minuto aproximadas, por IP y ubicación Cloudflare, compartidas entre `/api/estado` y el POST de evaluaciones. No equivale a una cuota global estricta.
- `GET /health` informa si la API tiene la configuración mínima; `GET /api/estado` requiere `Origin` autorizado y comprueba también una consulta a Neon.
- `POST /api/evaluaciones` crea el registro; `OPTIONS` permite las preflight autorizadas; no hay lectura pública de registros.

**Importante:** versiones de privacidad distintas entre la web y Worker bloquean el formulario. No crear un tercer Worker ni otro proyecto Neon.

## 4. Conservación de datos y borrado

- Migraciones `002_retencion_evaluaciones.sql` y `003_retencion_excepciones_validacion.sql` **ya aplicadas** a Neon. Agregan `retener_hasta` y `motivo_retencion`, y exigen justificar cada excepción con un motivo documentado de 5 a 500 caracteres.
- Trigger cron del Worker API: `0 8 * * *` (08:00 UTC diariamente; 02:00 en Ciudad de México cuando aplica UTC−6).
- El manejador `scheduled()` busca registros anteriores a 12 meses y elimina la evaluación; la relación `ON DELETE CASCADE` elimina el contacto asociado.
- Los casos con `retener_hasta` en el futuro se preservan temporalmente por excepción justificada; el equipo debe registrar `motivo_retencion`.
- **La programación está implementada en el repositorio, pero solo se considera operativa tras comprobar su despliegue y una ejecución sin errores en Cloudflare.** No borrar datos de producción como prueba: utilizar una rama de pruebas o datos sintéticos.

### Consulta operativa de prospectos

La aplicación pública no muestra la información de clientes. La información solo se puede revisar con una conexión autorizada a Neon, por ejemplo:

```sql
SELECT
  e.creado_en AS fecha,
  c.nombre, c.correo, c.telefono,
  e.sector, e.tipo_resultado,
  c.estado_reserva, c.version_aviso_privacidad, e.id AS referencia
FROM public.evaluaciones e
JOIN public.contactos_evaluacion c ON c.evaluacion_id = e.id
ORDER BY e.creado_en DESC
LIMIT 50;
```

Para derechos ARCO, buscar registros por referencia o correo, acreditar identidad conforme al procedimiento aprobado, realizar la acción documentada y registrar la solicitud fuera de esta tabla según el control interno de la empresa.

## 5. Checklist técnico antes de admitir prospectos reales

1. GitHub Actions: jobs `sitio-estatico` y `api-worker` en verde para el último commit.
2. Cloudflare: confirmar que el Worker API desplegó ese commit, preservó ambos Secrets, cargó el binding de limitación y creó el cron.
3. `GET /health`: debe responder 200 con `status=ready`. Si devuelve 503, revisar Secrets o versión; no compartir secretos.
4. Abrir la web preview en navegador. Probar cuestionarios favorable, incierto, señales y sector fuera de alcance.
5. Con DevTools verificar que la web consulta `GET /api/estado` con origen correcto y obtiene `privacyVersion=2026-11-23-v2`.
6. Enviar un **registro sintético** aceptando el aviso y completando Turnstile (nunca usar datos reales para la primera prueba). Confirmar HTTP 201 y registro en ambas tablas.
7. Comprobar errores de token, consentimiento o versión incorrecta (deben impedir guardado), y verificar que no se duplican registros durante un reintento.
8. Revisar cron, logs de errores y estrategia de recuperación/respaldo en Neon. Los backups automáticos y su restauración dependen del plan y de la configuración de Neon.
9. **Tras la aprobación del diseño visual**, fusionar PR a `main`, confirmar enlace público del aviso, prueba final con dominio definitivo y monitoreo inicial.

## 6. Qué se puede modificar después sin tocar la infraestructura

Para la siguiente fase visual, trabajar principalmente en:
- `app/page.tsx` y `app/globals.css` para la página institucional.
- `app/evaluacion/page.tsx` y `app/evaluacion/evaluacion.module.css` para el cuestionario y resultados.
- `app/aviso-de-privacidad/aviso.module.css` para la presentación del aviso.

**No** cambiar `worker/src/index.ts`, `infra/neon/`, `lib/evaluacion/config.ts`, `lib/evaluacion/cliente.ts` ni `lib/evaluacion/motor.ts` para simples decisiones de estilo. Las preguntas y las reglas no son parte de la capa visual.

La agenda externa de Google Calendar ya está enlazada, pero **no confirma automáticamente en Neon la reserva ni conecta el estado comercial con el CRM**; esa integración es un proyecto diferente y no es requisito para captar evaluaciones.

## 7. Riesgos y limitaciones expresos

- Que GitHub CI termine correctamente **no prueba el acceso a Neon ni el envío real**. Esas pruebas requieren el Worker desplegado y un token Turnstile válido del navegador.
- La limitación de peticiones en Cloudflare es aproximada y por ubicación; el servicio Turnstile complementa la protección.
- El aviso fue aprobado por Mindstack, no revisado independientemente por un abogado. Mantener el procedimiento real ARCO y la eliminación de datos acorde con el texto publicado.
- Nunca exponer la cadena `DATABASE_URL` ni la Secret Key de Turnstile en código público, capturas o chats.

## 8. Resultado de verificación externa (23 de noviembre de 2026)

Una ejecución de GitHub Actions desde un runner externo comprobó:

- `GET https://mindstack-evaluacion-api.luispalmhdz06.workers.dev/health`: **HTTP 503**, `{"status":"not_configured","version":"0.1.0"}`.
- `GET /api/estado` con el `Origin` de preview autorizado: **HTTP 404**, porque **la API desplegada es anterior** al nuevo endpoint de comprobación.
- Los jobs de compilación de **web y API sí terminaron correctamente** en el último commit verificado.

**Única intervención externa imprescindible:** en Cloudflare, abrir `mindstack-evaluacion-api`, confirmar la rama y directorio `worker`, desplegar el commit más reciente de `feature/evaluacion-empresarial-mvp-20261123` y mantener `DATABASE_URL` y `TURNSTILE_SECRET` como secrets de producción. El archivo `wrangler.jsonc` declara `PRIVACY_VERSION=2026-11-23-v2`, el cron y la limitación de peticiones. Repetir la comprobación: `/health` deberá pasar a 200 y, desde la web de preview, `/api/estado` deberá confirmar conexión a Neon y versión.

El sistema **no está operativo para registrar leads** hasta completar esa comprobación y la primera evaluación sintética con Turnstile.

## 9. Prueba real de punta a punta — confirmada (23 de noviembre de 2026)

La persona responsable de Mindstack completó el cuestionario de vista previa, marcó el consentimiento y superó Turnstile. La API respondió con la referencia **`568badfe-88d7-48e1-b9a7-769d64c8ad1a`** y el mensaje «Recibimos tu evaluación».

Se consultó Neon directamente, sin publicar datos de contacto. El resultado comprobado:

- Existe **1 evaluación** con esa referencia y **1 contacto vinculado**; **no existen duplicados** en las tablas a fecha de la comprobación.
- Evaluación versión **`0.1.0`**, sector **restaurant**, lectura inicial **signals**, con respuestas en JSON correctamente almacenadas.
- Contacto con nombre y correo válidos; el teléfono puede omitirse. Se registró la hora del consentimiento.
- `version_aviso_privacidad = 2026-11-23-v2` y `consentimiento_marketing = false`, como dicta la política de consentimiento independiente.
- `estado_reserva = sin_solicitar`; compartir la evaluación **no equivale** a reservar una sesión.
- `retener_hasta IS NULL` y `motivo_retencion IS NULL`; este registro está sujeto a la conservación ordinaria de **12 meses**.
- La migración de justificación obligatoria para excepciones de retención se aplicó sin alterar ni eliminar evaluaciones.

**Estado: flujo de captación verificado y listo para fase de front.** No equivale a validar una reserva de Google Calendar, el cron real de Cloudflare, la restauración de respaldos, ni la publicación del PR en `main`. El cron está declarado y compilado, pero debe verificarse su primera ejecución en los registros de Cloudflare. El registro de prueba se conserva por ahora como comprobante; no eliminarlo sin autorización expresa de Mindstack.

La siguiente etapa es visual. Mantener la rama de pruebas sin fusionar a `main` hasta que Mindstack apruebe el diseño. No modificar el CRM/Supabase.
