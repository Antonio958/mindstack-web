import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";

const display = Manrope({ subsets: ["latin"], variable: "--font-msk-display", display: "swap" });
const reading = Inter({ subsets: ["latin"], variable: "--font-msk-reading", display: "swap" });

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Mindstack",
  description: "Conoce cómo trabaja Mindstack, qué puedes contratar y cómo comenzar un proyecto de inteligencia empresarial.",
};

const groups = [
  { title: "Sobre Mindstack", items: [
    ["¿Qué hace Mindstack?", "Somos una firma de inteligencia empresarial. Combinamos investigación, análisis de datos, procesos y tecnología para comprender problemas de negocio y diseñar intervenciones acordes con la evidencia."],
    ["¿Trabajan exclusivamente con restaurantes?", "No. Los restaurantes y grupos gastronómicos son nuestro enfoque comercial prioritario actual. Podemos explorar proyectos de otros sectores según sus necesidades y el alcance de nuestras capacidades."],
    ["¿En qué se diferencian de un proveedor de software?", "No partimos de una herramienta predeterminada. Primero estudiamos el problema y después valoramos si conviene realizar un análisis, modificar un proceso, automatizar una tarea o desarrollar una solución tecnológica."],
  ] },
  { title: "Servicios e información", items: [
    ["¿Qué puedo recibir al contratar un proyecto?", "Según el alcance acordado, los entregables pueden incluir informes de diagnóstico, indicadores, tableros, recomendaciones, automatizaciones o soluciones a medida. La propuesta especifica qué se entregará."],
    ["¿Necesito tener mis datos organizados?", "No necesariamente. La disponibilidad y calidad de la información se consideran al definir el alcance. Si faltan datos, evaluamos qué es posible investigar y qué limitaciones existen."],
    ["¿Debo cambiar los sistemas que ya utilizo?", "No necesariamente. Revisamos los procesos y herramientas existentes antes de recomendar cambios o integraciones."],
    ["¿Cómo se trata mi información?", "En la definición del proyecto se deben acordar la información necesaria, sus accesos y las condiciones de tratamiento. Puedes consultar nuestro aviso de privacidad para conocer el tratamiento de datos personales."],
    ["¿Garantizan resultados económicos?", "No prometemos incrementos de ingresos o ahorros sin evidencia. Definimos objetivos, supuestos y criterios de evaluación acordes con cada proyecto."],
  ] },
  { title: "Evaluación gratuita y contratación", items: [
    ["¿La evaluación gratuita es un diagnóstico?", "No. Es una lectura orientativa basada exclusivamente en tus respuestas. Un diagnóstico profesional requiere investigación, información y contraste de evidencia."],
    ["¿Tengo que crear una cuenta para realizar la evaluación?", "No. La evaluación inicial para restaurantes es gratuita y no requiere registro obligatorio."],
    ["¿Qué sucede después de contactarlos?", "Primero conversamos sobre tu situación. Si existe una oportunidad de colaboración, exploramos el contexto y definimos una propuesta con alcance, entregables, plazos e inversión. El proyecto comienza tras aceptar la propuesta."],
    ["¿Cuánto cuesta y cuánto dura un proyecto?", "Depende del problema, la información disponible, la complejidad y los entregables. La inversión y los plazos se definen en la propuesta correspondiente, antes de iniciar el proyecto."],
  ] },
];

export default function FrequentlyAskedQuestions() {
  return (
    <main className={`mindstack-editorial msk-faq ${display.variable} ${reading.variable}`}>
      <header className="msk-faq-header">
        <div className="container">
          <a href="/" aria-label="Inicio de Mindstack"><img src="/logo-mindstack.png" alt="Mindstack" /></a>
          <nav aria-label="Navegación principal">
            <a href="/">Inicio</a><a href="/#capacidades">Capacidades</a><a href="/#metodologia">Método</a><a href="/#sectores">Industrias</a><a href="/#nosotros">Firma</a><a href="/preguntas-frecuentes" aria-current="page">Preguntas frecuentes</a><a href="/#contacto">Contacto</a>
          </nav>
          <a className="btn btn-gold" href="/evaluacion">Evaluación gratuita</a>
        </div>
      </header>
      <section className="msk-faq-intro">
        <div className="container">
          <a className="msk-faq-back" href="/">← Volver al inicio</a>
          <span className="eyebrow">Información para tu empresa</span>
          <h1>Preguntas frecuentes<span>.</span></h1>
          <p>Conoce nuestra forma de trabajar, los servicios que podemos ofrecerte y cómo iniciar una colaboración.</p>
        </div>
      </section>
      <section className="container msk-faq-content" aria-label="Preguntas y respuestas">
        {groups.map((group) => (
          <div className="msk-faq-group" key={group.title}>
            <h2>{group.title}</h2>
            <div>{group.items.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true" /></summary>
                <p>{answer}{question === "¿Cómo se trata mi información?" && <> <a href="/aviso-de-privacidad/">Consultar aviso de privacidad.</a></>}</p>
              </details>
            ))}</div>
          </div>
        ))}
      </section>
      <section className="msk-faq-contact">
        <div className="container">
          <div><h2>¿Tienes otra pregunta?</h2><p>Conversemos sobre las necesidades de tu organización.</p></div>
          <a className="btn btn-gold" href="/#contacto">Contactar a Mindstack</a>
        </div>
      </section>
      <footer className="msk-faq-footer"><div className="container"><span>© 2026 Grupo Mindstack · México</span><a href="/aviso-de-privacidad/">Aviso de privacidad</a></div></footer>
    </main>
  );
}
