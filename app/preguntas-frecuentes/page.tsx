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

const faqStyles = "\n.msk-faq{--faq-ink:#171918;--faq-paper:#f5f2ec;--faq-gold:#d6b253;background:var(--faq-paper);color:var(--faq-ink);font-family:var(--font-msk-reading),system-ui,sans-serif;min-height:100vh;font-size:17px;line-height:1.6}\n.msk-faq,.msk-faq *{box-sizing:border-box}\n.msk-faq h1,.msk-faq h2{font-family:var(--font-msk-display),system-ui,sans-serif}\n.msk-faq .container{width:min(1200px,calc(100% - 64px));margin-inline:auto}\n.msk-faq a{text-decoration:none;color:inherit}\n.msk-faq .msk-faq-header{position:sticky;top:0;z-index:50;background:#151716;color:#f5f2ec;border-bottom:1px solid #393b33}\n.msk-faq-header>.container{display:flex;align-items:center;justify-content:space-between;gap:22px;min-height:76px}\n.msk-faq-header .msk-faq-brand{width:112px;flex:0 0 112px;display:flex;align-items:center}\n.msk-faq-header .msk-faq-brand img{display:block;width:112px;height:60px;object-fit:contain}\n.msk-faq-header nav{display:flex;align-items:center;justify-content:center;gap:clamp(12px,1.4vw,24px)}\n.msk-faq-header nav a{color:#d7d8d1;font-size:12px;font-weight:650;white-space:nowrap}\n.msk-faq-header nav a[aria-current]{color:#e8c974;border-bottom:1px solid #e8c974}\n.msk-faq .btn-gold{display:inline-flex;align-items:center;justify-content:center;min-height:46px;border-radius:6px;padding:12px 18px;background:#c9a227;color:#101211;border:1px solid #c9a227;font-size:12px;font-weight:750;text-transform:uppercase;letter-spacing:.035em;white-space:nowrap}\n.msk-faq-menu{display:none;position:relative}\n.msk-faq-menu>summary{cursor:pointer;font-size:14px;font-weight:700;list-style:none}\n.msk-faq-menu>summary::-webkit-details-marker{display:none}\n.msk-faq-menu[open] nav{display:grid;position:absolute;right:0;top:calc(100% + 14px);background:#1b1d1b;padding:16px;min-width:220px;box-shadow:0 16px 40px #0005;border:1px solid #45483f}\n.msk-faq-menu nav a{padding:7px 0}\n.msk-faq .msk-faq-intro{background:linear-gradient(180deg,#171918 0,#171918 calc(100% - 65px),#f5f2ec 100%);color:#faf8f1;padding:48px 0 105px}\n.msk-faq .msk-faq-back{display:inline-block;color:#dadcd3;font-size:14px;margin:0 0 30px}\n.msk-faq .msk-faq-intro .eyebrow{display:flex;width:fit-content;align-items:center;gap:12px!important;color:#e4c16d;font-size:13px!important;font-weight:700!important;letter-spacing:.13em!important;margin:0 0 15px!important;text-transform:uppercase}\n.msk-faq .msk-faq-intro .eyebrow::before{content:\"\";width:28px!important;height:1px;background:#d6b253}\n.msk-faq .msk-faq-intro h1{font-size:clamp(38px,5.1vw,72px);font-weight:780;line-height:1.09;letter-spacing:-.045em;margin:0 0 16px}\n.msk-faq-intro h1 span{color:#d6b253}\n.msk-faq .msk-faq-intro p{font-size:19px;line-height:1.65;max-width:650px;margin:0;color:#dedfd8}\n.msk-faq .msk-faq-content{padding:24px 0 70px}\n.msk-faq-index{display:flex;flex-wrap:wrap;gap:10px 28px;border-bottom:1px solid #c9c5ba;padding:0 0 23px;margin-bottom:44px}\n.msk-faq-index a{font-size:14px;font-weight:650;color:#705715;text-decoration:underline;text-underline-offset:5px}\n.msk-faq-group{display:grid;grid-template-columns:minmax(0,.65fr) minmax(0,1.35fr);gap:48px;margin-bottom:48px;scroll-margin-top:100px}\n.msk-faq-group h2{font-size:clamp(25px,2.6vw,35px);line-height:1.18;letter-spacing:-.035em;font-weight:750;margin:14px 0;color:#1d211b}\n.msk-faq-group details{border-bottom:1px solid #c7c3b8}\n.msk-faq-group details:first-child{border-top:1px solid #c7c3b8}\n.msk-faq-group summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:21px 0;font-size:18px;font-weight:650;line-height:1.45;color:#21251f}\n.msk-faq-group summary::-webkit-details-marker{display:none}\n.msk-faq-group summary>span{width:24px;flex-shrink:0;text-align:center;color:#86661b;font-size:24px;line-height:1}\n.msk-faq-group summary>span::before{content:\"+\"}\n.msk-faq-group details[open] summary>span::before{content:\"−\"}\n.msk-faq-group details[open] summary{color:#765915}\n.msk-faq-group details p{margin:0 35px 22px 0;color:#464c44;font-size:17px;line-height:1.75}\n.msk-faq-group details p a{color:#765915;text-decoration:underline}\n.msk-faq-contact{background:#171918;color:#f5f2ec;padding:48px 0}\n.msk-faq-contact>.container{display:flex;align-items:center;justify-content:space-between;gap:25px;flex-wrap:wrap}\n.msk-faq-contact h2{font-size:clamp(27px,3vw,40px);font-weight:750;margin:0 0 8px}\n.msk-faq-contact p{font-size:17px;color:#d1d3ca;margin:0}\n.msk-faq-footer{background:#101211;color:#c5c7be;padding:25px 0;font-size:14px}\n.msk-faq-footer>.container{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap}\n.msk-faq a:focus-visible,.msk-faq summary:focus-visible{outline:2px solid #b48b30;outline-offset:5px}\n@media(max-width:1100px){.msk-faq-header nav.msk-faq-desktop{display:none}.msk-faq-menu{display:block;margin-left:auto}}\n@media(max-width:760px){.msk-faq .container{width:calc(100% - 36px)}.msk-faq-header>.container{gap:10px;min-height:68px}.msk-faq-header .msk-faq-brand{width:88px;flex-basis:88px}.msk-faq-header .msk-faq-brand img{width:88px;height:50px}.msk-faq .msk-faq-header .btn-gold{padding:9px 11px;min-height:40px;font-size:10px}.msk-faq .msk-faq-intro{padding:35px 0 86px}.msk-faq-group{grid-template-columns:1fr;gap:10px;margin-bottom:34px}.msk-faq .msk-faq-content{padding-top:10px}.msk-faq-index{gap:12px 18px;margin-bottom:25px}.msk-faq-group summary{font-size:17px}.msk-faq-group details p{margin-right:0}}\n";

export default function FrequentlyAskedQuestions() {
  return (
    <main className={`mindstack-editorial msk-faq ${display.variable} ${reading.variable}`} data-revision="faq-06">
      <style>{faqStyles}</style>
      <header className="msk-faq-header">
        <div className="container">
          <a className="msk-faq-brand" href="/" aria-label="Inicio de Mindstack"><img src="/logo-mindstack.png" alt="Mindstack" width={112} height={60} style={{width:112,height:60,objectFit:"contain"}} /></a>
          <nav className="msk-faq-desktop" aria-label="Navegación principal">
            <a href="/">Inicio</a><a href="/#capacidades">Capacidades</a><a href="/#metodologia">Método</a><a href="/#sectores">Industrias</a><a href="/#nosotros">Firma</a><a href="/preguntas-frecuentes" aria-current="page">Preguntas frecuentes</a><a href="/#contacto">Contacto</a>
          </nav>
          <details className="msk-faq-menu"><summary>Menú ☰</summary><nav aria-label="Navegación móvil">
            <a href="/">Inicio</a><a href="/#capacidades">Capacidades</a><a href="/#metodologia">Método</a><a href="/#sectores">Industrias</a><a href="/#nosotros">Firma</a><a href="/preguntas-frecuentes" aria-current="page">Preguntas frecuentes</a><a href="/#contacto">Contacto</a>
          </nav></details>
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
        <nav className="msk-faq-index" aria-label="Temas de preguntas frecuentes">{groups.map((group, i) => <a key={group.title} href={`#tema-${i+1}`}>{group.title}</a>)}</nav>
        {groups.map((group, i) => (
          <div className="msk-faq-group" id={`tema-${i+1}`} key={group.title}>
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
