import type { Metadata } from "next";
import Link from "next/link";
import styles from "./aviso.module.css";
import { PRIVACY_VERSION, PRIVACY_PATH } from "../../lib/evaluacion/config";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Mindstack",
  description: "Aviso de privacidad de la evaluación empresarial gratuita de Mindstack, operada por Grupo Mindstack, S.A. de C.V.",
};

const EMAIL = "mindstack.group@gmail.com";
const ADDRESS = "MAPIMI No. 8, Col. VALLE GOMEZ, CIUDAD DE MEXICO, C. P. 06240";

export default function AvisoDePrivacidadPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Ir al inicio de Mindstack">
          <img src="/logo-mindstack.png" alt="" className={styles.logo} />
          <span>MINDSTACK</span>
        </Link>
        <Link href="/evaluacion/" className={styles.back}>Volver a la evaluación <span aria-hidden="true">↗</span></Link>
      </header>
      <article className={styles.content}>
        <div className={styles.kicker}>GRUPO MINDSTACK · PROTECCIÓN DE DATOS</div>
        <h1>Aviso de privacidad</h1>
        <p className={styles.intro}>Información sobre el tratamiento de datos personales cuando una persona decide compartir con Mindstack los resultados de su evaluación empresarial gratuita.</p>
        <div className={styles.meta}>
          <span>Versión: {PRIVACY_VERSION}</span>
          <span>Última actualización: 23 de noviembre de 2026</span>
        </div>

        <section>
          <h2>1. Responsable y domicilio</h2>
          <p><strong>Grupo Mindstack, S.A. de C.V.</strong>, persona moral que opera bajo el nombre comercial <strong>Mindstack</strong>, es responsable del tratamiento de los datos personales obtenidos mediante la evaluación empresarial gratuita.</p>
          <p>Su domicilio para atención de personas titulares y recepción de notificaciones es: <strong>{ADDRESS}</strong>. Este domicilio también es el domicilio fiscal de Grupo Mindstack, S.A. de C.V.</p>
          <p>Correo de atención en materia de privacidad y derechos ARCO: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </section>

        <section>
          <h2>2. Datos que recabamos</h2>
          <p>La evaluación se puede completar y consultar sin proporcionar datos de identificación o contacto. Si la persona decide enviar sus resultados a Mindstack, solicitaremos su <strong>nombre, correo electrónico y, opcionalmente, teléfono</strong>; también conservaremos las respuestas proporcionadas, la interpretación inicial del cuestionario, su versión, la fecha de recepción y la referencia de origen de la solicitud.</p>
          <p>No solicitamos datos personales sensibles en este formulario. La persona participante debe abstenerse de incorporar datos sensibles, contraseñas o información confidencial de terceros.</p>
        </section>

        <section>
          <h2>3. Finalidades y consentimiento</h2>
          <p>Trataremos los datos compartidos para registrar la evaluación, atender la solicitud de contacto, comprender el contexto empresarial declarado y preparar, en su caso, una conversación inicial sobre los servicios de Mindstack. El envío es <strong>voluntario</strong> y requiere marcar la casilla específica de aceptación del aviso antes de transmitir la información.</p>
          <p>La autorización para compartir la evaluación <strong>no equivale a suscribirse a publicidad</strong>. No utilizaremos estos datos para boletines, campañas promocionales o prospección no solicitada sin contar con una autorización separada cuando resulte necesaria.</p>
          <p>La base de tratamiento es el consentimiento que la persona manifiesta al compartir voluntariamente sus datos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
        </section>

        <section>
          <h2>4. Proveedores tecnológicos y comunicaciones</h2>
          <p>Para operar el formulario utilizamos infraestructura tecnológica de <strong>Cloudflare</strong> (alojamiento, seguridad y verificación antiabuso mediante Turnstile) y <strong>Neon</strong> (base de datos). Estos proveedores pueden procesar información en infraestructura fuera de México, bajo las condiciones aplicables de sus servicios y las instrucciones del responsable.</p>
          <p>No comercializamos los datos personales recibidos mediante la evaluación. Cualquier transferencia a terceros distintos de los encargados tecnológicos que requiera consentimiento se informará y solicitará por separado antes de llevarse a cabo.</p>
        </section>

        <section>
          <h2>5. Conservación y seguridad</h2>
          <p>Conservaremos las evaluaciones compartidas y sus datos de contacto durante un máximo de <strong>12 meses desde su recepción</strong>. Una vez cumplido ese plazo, se procederá a su eliminación o anonimización, salvo que una relación contractual vigente u obligación legal aplicable justifique un periodo adicional, limitado y documentado.</p>
          <p>Adoptaremos medidas técnicas, administrativas y de acceso restringido razonables para proteger esta información. Ningún sistema ofrece seguridad absoluta.</p>
        </section>

        <section>
          <h2>6. Derechos ARCO y revocación</h2>
          <p>La persona titular puede solicitar el <strong>acceso, rectificación, cancelación u oposición</strong> al tratamiento de sus datos, limitar su uso o divulgación y revocar su consentimiento cuando legalmente proceda.</p>
          <p>Para presentar una solicitud, escriba a <a href={`mailto:${EMAIL}?subject=Solicitud%20de%20derechos%20ARCO`}>{EMAIL}</a> con: (i) su nombre y un medio de contacto para recibir respuesta; (ii) el derecho o la gestión que solicita; (iii) los datos a los que se refiere, cuando corresponda; y (iv) elementos que faciliten localizar el registro, como el correo utilizado en la evaluación o su referencia. Para ejecutar la solicitud podremos pedir los documentos necesarios para acreditar la identidad de la persona titular o representación legal, conforme a la ley.</p>
          <p>Mindstack comunicará su determinación dentro de un plazo máximo de <strong>20 días</strong> desde la recepción de la solicitud; si procede, la hará efectiva dentro de los <strong>15 días</strong> siguientes a la comunicación de la respuesta. Los plazos podrán ampliarse en los casos legalmente previstos. La presentación de la solicitud es gratuita.</p>
        </section>

        <section>
          <h2>7. Limitación de uso y comunicaciones comerciales</h2>
          <p>Para solicitar que sus datos no se utilicen para futuras comunicaciones, o para revocar el consentimiento otorgado, escriba a <a href={`mailto:${EMAIL}?subject=Limitar%20uso%20de%20datos`}>{EMAIL}</a>. La solicitud será atendida conforme a los procedimientos y límites previstos en la legislación aplicable.</p>
        </section>

        <section>
          <h2>8. Modificaciones del aviso</h2>
          <p>Publicaremos las modificaciones a este aviso en esta misma dirección: <Link href={PRIVACY_PATH}>{PRIVACY_PATH}</Link>, indicando la nueva fecha de actualización y versión. Cuando corresponda solicitar un nuevo consentimiento, lo haremos antes de utilizar los datos para nuevas finalidades.</p>
        </section>

        <section>
          <h2>9. Alcance de la evaluación</h2>
          <p>El cuestionario produce una lectura inicial basada únicamente en las respuestas declaradas. No constituye una auditoría, diagnóstico profesional ni verificación de cifras o causas; tampoco reemplaza un proceso de descubrimiento empresarial.</p>
        </section>

        <footer className={styles.footer}>
          <strong>Grupo Mindstack, S.A. de C.V.</strong>
          <p>{ADDRESS}</p>
          <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <Link href="/evaluacion/">Regresar a la evaluación empresarial</Link>
        </footer>
      </article>
    </main>
  );
}
