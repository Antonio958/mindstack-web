# Mindstack — siguiente fase de captación inbound

Estado: propuesta técnica preparada; no aplicar a producción sin validar el flujo de contacto actual de punta a punta.

La revisión de la evaluación agrega una invitación contextual y un diálogo voluntario. Se mantiene el contrato actual de API, el consentimiento y la versión vigente del aviso. El nombre de la empresa no se pide todavía: un campo que la API ignore no debe presentarse como guardado.

## Incorporación de la empresa

1. Preparar y probar en una rama de Neon independiente una migración aditiva que agregue `empresa text` a `public.contactos_evaluacion`, con longitud máxima de 160 caracteres. No modificar datos existentes ni hacer obligatorio el campo en la migración inicial.
2. Actualizar el contrato de la API para validar y guardar el nombre de la empresa en la misma transacción que la evaluación y el contacto. Confirmar la disponibilidad de la nueva capacidad en el endpoint de estado.
3. Revisar y aprobar el texto y versión del aviso de privacidad antes de activar la nueva captura. Coordinar API, web y aviso para que la comprobación de versión siga cerrando el formulario cuando exista una discrepancia.
4. Habilitar el campo en el diálogo únicamente cuando la API confirme soporte y la versión del aviso coincida. Probar envío sintético con Turnstile en entorno controlado y comprobar el valor persistido.

## Bandeja de prospectos privada

No crear una ruta pública ni conceder acceso anónimo a las tablas. Implementar como herramienta interna autenticada, con roles y acceso mínimo.

Información: empresa, nombre, canal de contacto, fecha, origen, categoría de evaluación, situaciones declaradas, estado de seguimiento, responsable y próxima actividad. No presentar las señales como diagnósticos ni usar el consentimiento de contacto como autorización para marketing.

Propuesta de estados: nuevo, asignado, contactado, discovery, propuesta, cerrado, no interesado. Registrar cambios y evitar duplicar contactos sin borrar evaluaciones distintas. Mantener el CRM y Supabase existentes sin cambios hasta acordar una integración específica.

Notificación interna: enviar solamente referencia y aviso de nuevo prospecto a un canal autorizado; consultar detalles en la bandeja privada. Definir responsable de seguimiento y procedimiento ARCO/retención.

## Validación antes de lanzamiento

- Contacto voluntario y cierre de diálogo sin pérdida de resultados.
- Turnstile renderizado y verificado por servidor; envío y referencia reales confirmados.
- Empresa y consentimiento persistidos cuando la nueva capacidad se active.
- Acceso interno autenticado y sin exposición pública de datos.
- Pruebas en preview y aprobación explícita antes de producción.
