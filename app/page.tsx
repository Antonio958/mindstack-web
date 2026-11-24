import { Manrope, Inter } from "next/font/google";

const displayFont = Manrope({ subsets: ["latin"], variable: "--font-msk-display", display: "swap" });
const readingFont = Inter({ subsets: ["latin"], variable: "--font-msk-reading", display: "swap" });

const WA =
  "https://wa.me/525552138786?text=Hola%20Mindstack%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20c%C3%B3mo%20pueden%20ayudarnos";

const navItems = [
  ["Inicio", "#inicio"],
  ["Capacidades", "#capacidades"],
  ["Método", "#metodologia"],
  ["Industrias", "#sectores"],
  ["Firma", "#nosotros"],
  ["Contacto", "#contacto"],
];

const services = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Comprendemos la situación actual de la organización, investigamos señales, problemas y posibles causas, y construimos una lectura estructurada antes de recomendar una intervención.",
    tag: "Comprender",
  },
  {
    num: "02",
    title: "Inteligencia de Negocio",
    desc: "Convertimos datos e información empresarial en indicadores, análisis y sistemas de lectura que permitan comprender el desempeño y tomar mejores decisiones.",
    tag: "Explicar",
  },
  {
    num: "03",
    title: "Automatización",
    desc: "Diseñamos flujos y sistemas que reducen trabajo manual, errores y fricción operativa cuando la automatización representa una mejora real para el proceso.",
    tag: "Transformar",
  },
  {
    num: "04",
    title: "Inteligencia Artificial",
    desc: "Aplicamos inteligencia artificial cuando aporta capacidad analítica, operativa o de decisión, evitando introducirla donde no resuelve un problema relevante.",
    tag: "Potenciar",
  },
  {
    num: "05",
    title: "Soluciones a medida",
    desc: "Diseñamos intervenciones específicas cuando el problema requiere combinar estrategia, procesos, datos, tecnología o desarrollo bajo una arquitectura propia.",
    tag: "Integrar",
  },
];

const restaurantSignals = [
  {
    num: "01",
    title: "Varias sucursales",
    desc: "La operación empieza a diferir entre unidades y aumenta la dificultad para mantener visibilidad y control.",
  },
  {
    num: "02",
    title: "Crecimiento con poca visibilidad",
    desc: "El negocio vende y crece, pero no siempre puede explicar con claridad qué está impulsando ese crecimiento.",
  },
  {
    num: "03",
    title: "Márgenes difíciles de leer",
    desc: "Costos, merma, tiempos, descuentos y diferencias operativas pueden ocultar dónde se está deteriorando la rentabilidad.",
  },
  {
    num: "04",
    title: "Procesos dependientes de personas",
    desc: "Parte importante de la operación depende del dueño, gerente o conocimiento informal que todavía no está institucionalizado.",
  },
  {
    num: "05",
    title: "Datos fragmentados",
    desc: "Ventas, inventario, clientes, reseñas, costos y operación existen en distintos sistemas sin convertirse en una lectura integrada.",
  },
  {
    num: "06",
    title: "Decisiones bajo incertidumbre",
    desc: "Existen señales de problemas u oportunidades, pero no suficiente evidencia para saber qué intervenir primero.",
  },
];

const steps = [
  {
    num: "01",
    title: "Comprender",
    desc: "Escuchamos el contexto, los objetivos y las restricciones del negocio antes de decidir qué merece atención.",
  },
  {
    num: "02",
    title: "Investigar",
    desc: "Contrastamos datos, procesos y señales para distinguir hechos, inferencias y preguntas abiertas.",
  },
  {
    num: "03",
    title: "Explicar",
    desc: "Organizamos hallazgos y explicaciones posibles sin confundir hipótesis con certezas.",
  },
  {
    num: "04",
    title: "Transformar",
    desc: "Diseñamos una intervención proporcional al problema, sea operativa, analítica o tecnológica.",
  },
  {
    num: "05",
    title: "Aprender",
    desc: "Observamos resultados e incorporamos lo aprendido para mejorar decisiones futuras.",
  },
];



function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Grupo Mindstack">
      <img
        src="/logo-mindstack.png"
        alt="Grupo Mindstack"
        className="brand-symbol"
      />
      
    </a>
  );
}
function ButtonGold({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="btn btn-gold" target={href.startsWith("/") || href.startsWith("#") ? undefined : "_blank"} rel={href.startsWith("/") || href.startsWith("#") ? undefined : "noopener noreferrer"}>
      {children}
    </a>
  );
}

function ButtonOutline({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="btn btn-outline">
      {children}
    </a>
  );
}

function EvidenceMap() {
  return (
    <figure className="evidence-map" aria-label="Datos, procesos y contexto se integran para orientar decisiones">
      <figcaption>Una visión integrada del negocio</figcaption>
      <div className="evidence-map-inputs">
        <span>Datos</span><span>Procesos</span><span>Contexto</span>
      </div>
      <svg viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M48 0V15Q48 24 60 24H138Q150 24 150 36V56M150 0V36M252 0V15Q252 24 240 24H162Q150 24 150 36" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="150" cy="36" r="3" fill="currentColor" />
      </svg>
      <div className="evidence-map-output"><strong>Decisiones con fundamento</strong><span>Una lectura conjunta, no señales aisladas.</span></div>
    </figure>
  );
}

function IntelligencePreview() {
  return (
    <div className="report-preview">
      <div className="report-top">
        <div>
          <span className="report-kicker">Lectura empresarial</span>
          <h3>De señales a decisiones</h3>
        </div>

        <span className="report-status">Ejemplo</span>
      </div>

      <div className="report-summary">
        <div>
          <span>01</span>
          <strong>Observar</strong>
        </div>

        <div>
          <span>02</span>
          <strong>Explicar</strong>
        </div>

        <div>
          <span>03</span>
          <strong>Decidir</strong>
        </div>
      </div>

      <div className="report-table">
        <div className="report-row report-head">
          <span>Elemento</span>
          <span>Lectura</span>
          <span>Estado</span>
        </div>

        <div className="report-row">
          <span>Diferencias de inventario registradas</span>
          <span>Hecho</span>
          <span className="pill pill-mid">Validado</span>
        </div>

        <div className="report-row">
          <span>Posibles fallas de registro</span>
          <span>Hipótesis</span>
          <span className="pill pill-mid">Investigar</span>
        </div>

        <div className="report-row">
          <span>Contrastar registros y conteos</span>
          <span>Acción propuesta</span>
          <span className="pill pill-high">Priorizar</span>
        </div>
      </div>

      <div className="report-note">
        <span>Principio</span>

        <p>
          Una señal no se convierte automáticamente en una conclusión.
          Mindstack separa hechos, inferencias, hipótesis y decisiones antes
          de recomendar una intervención.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={`page-shell mindstack-editorial ${displayFont.variable} ${readingFont.variable}`}>
      <header className="header">
        <div className="container header-inner">
          <Brand />

          <nav className="nav">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <details className="home-mobile-menu">
            <summary aria-label="Abrir menú de navegación">Menú</summary>
            <nav aria-label="Navegación móvil">
              {navItems.map(([label, href]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </nav>
          </details>
          <ButtonGold href="/evaluacion">Evaluación gratuita</ButtonGold>
        </div>
      </header>

      <section id="inicio" className="hero hero-refreshed">
  <div className="hero-photo">
    <img
      src="https://images.unsplash.com/photo-1758518729908-d4220a678d81?auto=format&fit=crop&w=2000&q=82"
      alt="Dos profesionales revisan un documento durante una conversación de trabajo"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
    <span className="hero-photo-disclaimer">Imagen ilustrativa · Unsplash</span>
  </div>
  <div className="container hero-grid hero-refreshed-grid">
    <div className="hero-copy-block">
      <span className="eyebrow">Firma de inteligencia empresarial</span>
      <h1>
        <span className="hero-first-line">Comprender mejor.</span>
        <span className="gold"> Decidir mejor.</span>
      </h1>
      <p className="hero-copy">
        Conectamos datos, procesos y contexto para entender qué ocurre en tu organización, dónde enfocar tus esfuerzos y qué decisiones merecen atención.
      </p>
      <div className="hero-actions">
        <ButtonGold href="/evaluacion">Comenzar evaluación gratuita</ButtonGold>
        <ButtonOutline href="#capacidades">Conocer nuestras capacidades</ButtonOutline>
      </div>
      <p className="hero-footnote">
        Evaluación inicial disponible para restaurantes. Sin registro obligatorio.
      </p>
    </div>
  </div>
</section>

<section id="evaluacion-gratuita" className="assessment-section assessment-refreshed">
  <div className="container assessment-grid">
    <div className="assessment-content">
      <span className="eyebrow">Una herramienta gratuita de Mindstack</span>
      <h2>¿Qué tan clara tienes la situación de <span className="gold">tu restaurante?</span></h2>
      <p>
        Responde preguntas concretas sobre rentabilidad, operación, información y decisiones.
        Obtén una lectura inicial de fortalezas, situaciones que merecen atención y aspectos
        que aún requieren claridad.
      </p>
      <div className="assessment-actions">
        <ButtonGold href="/evaluacion">Comenzar mi evaluación</ButtonGold>
        <a href="#metodologia" className="assessment-secondary-link">Conocer el método ↗</a>
      </div>
      <p className="assessment-disclaimer">
        Gratis · Sin crear una cuenta · Resultado orientativo · No es un diagnóstico
      </p>
    </div>
    <div className="assessment-result-preview" aria-label="Vista de ejemplo de los resultados de la evaluación">
      <div className="assessment-preview-masthead">
        <span>MSK / EVALUACIÓN EMPRESARIAL</span>
        <strong>De las señales a una primera lectura.</strong>
        <div className="assessment-preview-masthead-rule" aria-hidden="true"><i /><i /><i /></div>
      </div>
      <div className="assessment-preview-body">
        <div className="assessment-preview-header">
          <span>LECTURA INICIAL · RESTAURANTES</span>
          <strong>EJEMPLO</strong>
        </div>
        <h3>Una mirada más clara a tu operación.</h3>
        <p className="assessment-preview-description">
          Una primera lectura organizada a partir de tus respuestas.
        </p>
        <div className="assessment-preview-items">
          <div>
            <span>FORTALEZA DECLARADA</span>
            <p>Seguimiento regular de indicadores operativos.</p>
          </div>
          <div>
            <span>SITUACIÓN POR COMPRENDER</span>
            <p>Diferencias recurrentes de inventario reportadas.</p>
          </div>
          <div>
            <span>ASPECTO POR ACLARAR</span>
            <p>Cómo se conoce la rentabilidad por producto.</p>
          </div>
        </div>
        <p className="assessment-preview-note">
          Vista ilustrativa. Tu resultado dependerá exclusivamente de tus respuestas.
        </p>
      </div>
    </div>
  </div>
</section>

{/* III. Industria: una historia operativa, no otra cuadrícula oscura. */}
<section id="sectores" className="home-story-sector">
  <div className="container story-sector-layout">
    <figure className="story-sector-photo">
      <img
        src="https://images.unsplash.com/photo-1761095596618-081ea3f043a5?auto=format&fit=crop&w=1400&q=80"
        alt="Equipo de cocina colaborando durante la operación de un restaurante"
        loading="lazy"
        decoding="async"
      />
      <figcaption>Imagen ilustrativa · Operación restaurantera</figcaption>
    </figure>
    <div className="story-sector-copy">
      <span className="eyebrow">Especialización actual / Restaurantes</span>
      <h2>La inteligencia comienza <span>en la operación.</span></h2>
      <p>
        Un restaurante reúne ventas, inventario, costos, equipos y experiencia
        del cliente en un mismo sistema. Entender cómo interactúan es el primer
        paso para tomar mejores decisiones.
      </p>
      <p>
        Trabajamos con especial interés en restaurantes, grupos gastronómicos y operaciones con varias sucursales, donde la visibilidad de costos y procesos resulta especialmente importante.
      </p>
      <a className="story-text-link" href="/evaluacion">
        Explorar la evaluación para restaurantes <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
  <div className="container story-signals-wrap">
    <div className="story-signals-heading">
      <span className="eyebrow">Situaciones que merecen claridad</span>
      <h3>¿Reconoces alguna de estas situaciones?</h3>
      <p>Señales empresariales habituales que conviene investigar, sin asumir causas de antemano.</p>
    </div>
    <div className="story-signals">
      {restaurantSignals.map((signal) => (
        <article className="story-signal" key={signal.title}>
          <span className="story-signal-number">{signal.num}</span>
          <h4>{signal.title}</h4>
          <p>{signal.desc}</p>
        </article>
      ))}
    </div>
    <p className="story-transversal-note">Nuestro enfoque también puede aplicarse a otros sectores cuando su situación requiere investigación, análisis de datos y decisiones empresariales.</p>
  </div>
</section>

{/* IV. Capacidades: servicios en una lista editorial, sin tarjetas falsas. */}
<section id="capacidades" className="home-services">
  <div className="container story-services-layout">
    <div className="story-services-intro">
      <span className="eyebrow">Lo que hacemos</span>
      <h2>Distintos recursos. <span>Un mismo criterio.</span></h2>
      <p>La solución no se escoge antes de comprender el problema. Combinamos investigación, datos y tecnología según la situación de cada organización.</p>
      <a href="#metodologia" className="story-services-link">Conocer cómo trabajamos <span aria-hidden="true">↗</span></a>
      <EvidenceMap />
      <div className="story-services-aside">
        <span>PRINCIPIO DE TRABAJO</span>
        <p>Primero comprender. Después, intervenir donde exista una razón para hacerlo.</p>
      </div>
    </div>
    <div className="story-services-list">
      {services.map((item) => (
        <article className="story-service-row" key={item.num}>
          <span className="story-service-number">{item.num}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
          <span className="story-service-tag">{item.tag}</span>
        </article>
      ))}
    </div>
  </div>
</section>

{/* V. Método: una secuencia que se puede recorrer con la vista. */}
<section id="metodologia" className="home-method">
  <span id="inteligencia" className="home-anchor" aria-hidden="true" />
  <div className="container">
    <div className="home-method-heading">
      <div>
        <span className="eyebrow">Método Mindstack</span>
        <h2>Comprender antes de transformar.</h2>
      </div>
      <p>Las soluciones no deberían elegirse por tendencia. Partimos del contexto, contrastamos evidencia y diseñamos una intervención proporcional a lo que encontramos.</p>
    </div>
    <div className="home-method-rail" aria-label="Cinco etapas del método Mindstack">
      {steps.map((step) => (
        <article className="home-method-step" key={step.num}>
          <span className="home-method-number">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </article>
      ))}
    </div>
    <p className="home-method-note"><span aria-hidden="true">✦</span> Una señal es el inicio de una investigación, no una conclusión.</p>
  </div>
</section>

{/* VI. Entregable: visualización ilustrativa de una lectura de consultoría. */}
<section id="entregable" className="home-deliverable">
  <div className="container deliverable-grid">
    <div className="home-deliverable-copy">
      <span className="eyebrow">El valor de una lectura estructurada</span>
      <h2>La información importa cuando ayuda a <span>decidir.</span></h2>
      <p>Organizamos hechos, relaciones e incertidumbres para que una organización pueda distinguir qué conoce, qué necesita investigar y qué decisiones merecen atención.</p>
      <div className="home-deliverable-facts">
        <div><strong>01</strong><span>Hechos y señales relevantes</span></div>
        <div><strong>02</strong><span>Relaciones y hallazgos identificados</span></div>
        <div><strong>03</strong><span>Hipótesis que requieren contraste</span></div>
        <div><strong>04</strong><span>Prioridades para decidir con criterio</span></div>
      </div>
      <p className="home-deliverable-legal">La visualización es conceptual y no representa un informe emitido a un cliente ni el resultado de la evaluación gratuita.</p>
    </div>
    <IntelligencePreview />
  </div>
</section>

{/* VII. La firma: presencia humana, sin declaraciones de experiencia no documentadas. */}
<section id="nosotros" className="home-firm">
  <div className="container home-firm-grid">
    <div className="home-firm-copy">
      <span className="eyebrow">La firma</span>
      <h2>El criterio humano detrás de <span>cada decisión.</span></h2>
      <p>Mindstack es una firma de inteligencia empresarial que combina investigación, análisis de procesos, datos y tecnología para comprender situaciones antes de proponer intervenciones.</p>
      <p>No comenzamos vendiendo una herramienta. Comenzamos por entender el negocio y reconocer qué evidencia necesitamos para trabajar con rigor.</p>
      <div className="home-firm-principles">
        <span>Evidencia antes de prescripción</span>
        <span>Contexto antes de tecnología</span>
        <span>Intervenciones proporcionales</span>
      </div>
    </div>
    <div className="home-firm-leader">
      <div className="home-firm-portrait">
        <img src="/foto-luis-palma.jpg" alt="Retrato institucional de la dirección de Mindstack" loading="lazy" decoding="async" />
      </div>
      <div className="home-firm-profile">
        <span>DIRECCIÓN GENERAL · MINDSTACK</span>
        <h3>Antonio Hernández</h3>
        <p>Responsable de la dirección estratégica y del desarrollo del enfoque de inteligencia empresarial de Mindstack.</p>
      </div>
    </div>
  </div>
</section>

{/* VIII. Un único cierre comercial, con dos rutas según el visitante. */}
<section id="contacto" className="home-contact">
  <div className="home-contact-photo" aria-hidden="true">
    <img
      src="https://images.unsplash.com/photo-1628516315527-110eb03991ac?auto=format&fit=crop&w=1700&q=78"
      alt=""
      loading="lazy"
      decoding="async"
    />
  </div>
  <div className="container home-contact-content">
    <span className="eyebrow">El siguiente paso</span>
    <h2>Hablemos de lo que tu negocio necesita comprender.</h2>
    <p>Hay dos maneras de comenzar: explorar gratuitamente la situación de tu restaurante o conversar directamente con Mindstack sobre un reto empresarial.</p>
    <div className="home-contact-options">
      <div className="home-contact-option home-contact-option-primary">
        <span>01 / PARA RESTAURANTES</span>
        <h3>Comienza por explorar tu operación.</h3>
        <p>Una lectura inicial basada en tus respuestas, sin registro obligatorio.</p>
        <ButtonGold href="/evaluacion">Iniciar evaluación gratuita</ButtonGold>
      </div>
      <div className="home-contact-option">
        <span>02 / CONVERSACIÓN DIRECTA</span>
        <h3>Cuéntanos qué necesitas comprender.</h3>
        <p>Cuéntanos el reto de tu organización, sea o no un restaurante. Exploraremos si podemos aportar valor.</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="home-contact-secondary">Hablar con Mindstack <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <small className="home-contact-photo-note">Fotografía ilustrativa de Ciudad de México</small>
  </div>
</section>

<footer className="footer">
  <div className="container">
    <div className="footer-grid">
      <div>
        <Brand />

        <p style={{ marginTop: 20 }}>
          Firma de Inteligencia Empresarial dedicada a convertir información,
          evidencia y contexto en comprensión, decisiones e intervenciones con
          sentido.
        </p>
      </div>

      <div>
        <h4>Capacidades</h4>
        <a href="#capacidades">Diagnóstico</a>
        <a href="#capacidades">Inteligencia de Negocio</a>
        <a href="#capacidades">Automatización</a>
        <a href="#capacidades">Inteligencia Artificial</a>
        <a href="#capacidades">Soluciones a medida</a>
      </div>

      <div>
        <h4>Mindstack</h4>
        <a href="#inteligencia">Inteligencia empresarial</a>
        <a href="#metodologia">Método Mindstack</a>
        <a href="#sectores">Industria foco</a>
        <a href="#nosotros">La firma</a>
        <a href="/aviso-de-privacidad/">Aviso de privacidad</a>
      </div>

      <div>
        <h4>Contacto</h4>

        <p>
          Para conversar sobre una situación empresarial, un proyecto o una
          posible colaboración, escríbenos directamente.
        </p>

        <a className="footer-direct-contact" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp de Mindstack ↗</a>
        <a href="mailto:mindstack.group@gmail.com">mindstack.group@gmail.com</a>
      </div>
    </div>

    <div className="footer-bottom">
      <span>
        © 2026 Grupo Mindstack. Firma de Inteligencia Empresarial.
      </span>

      <span>México</span>
    </div>
  </div>
</footer>
    </main>
  );
}