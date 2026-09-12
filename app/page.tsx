const WA =
  "https://wa.me/5552138786?text=Hola%20Mindstack%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20c%C3%B3mo%20pueden%20ayudarnos";

const navItems = [
  ["Inicio", "#inicio"],
  ["Inteligencia", "#inteligencia"],
  ["Capacidades", "#capacidades"],
  ["Método", "#metodologia"],
  ["Industrias", "#sectores"],
  ["Firma", "#nosotros"],
];

const insights = [
  {
    tag: "Crecimiento",
    title: "Crecimiento estable vs. crecimiento accidental",
    desc: "Muchos negocios venden sin saber qué genera realmente sus mejores días. Construir crecimiento estable implica entender qué se puede repetir, medir y mejorar.",
  },
  {
    tag: "Rentabilidad",
    title: "Dónde se escapa el dinero en la operación",
    desc: "Fugas de margen, procesos débiles, costos poco visibles y decisiones sin datos pueden reducir la rentabilidad sin que el problema sea evidente.",
  },
  {
    tag: "Comercial",
    title: "Seguimiento débil, baja recompra y ventas inestables",
    desc: "Cuando no existe un proceso comercial claro, cada venta depende demasiado del momento, del vendedor o de la suerte.",
  },
  {
    tag: "Datos",
    title: "Información operativa para tomar mejores decisiones",
    desc: "Los negocios generan datos todos los días. La diferencia está en saber cuáles leer, cómo interpretarlos y qué acciones tomar a partir de ellos.",
  },
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
    desc: "Partimos del contexto real de la organización. Observamos cómo funciona, qué quiere lograr, qué restricciones existen y qué problema necesita realmente ser entendido antes de intervenir.",
  },
  {
    num: "02",
    title: "Investigar",
    desc: "Reunimos y contrastamos evidencia. Analizamos datos, procesos, señales, comportamientos y contexto para separar hechos de inferencias y reducir conclusiones prematuras.",
  },
  {
    num: "03",
    title: "Explicar",
    desc: "Construimos una lectura estructurada de lo encontrado: qué está ocurriendo, qué puede estar causándolo, qué incertidumbre permanece y qué merece atención prioritaria.",
  },
  {
    num: "04",
    title: "Transformar",
    desc: "Diseñamos e implementamos la intervención que tenga mayor sentido para el problema, ya sea operativa, analítica, tecnológica, automatizada o construida a medida.",
  },
  {
    num: "05",
    title: "Aprender",
    desc: "Medimos lo ocurrido después de intervenir, incorporamos nueva evidencia y convertimos los resultados del proyecto en conocimiento reutilizable para la organización.",
  },
];



const focus = [
  {
    tag: "Comprensión",
    title: "El problema antes que la herramienta",
    desc: "No comenzamos recomendando software, automatización o inteligencia artificial. Primero buscamos comprender qué está ocurriendo y qué necesita realmente la organización.",
  },
  {
    tag: "Evidencia",
    title: "Distinguir hechos de explicaciones",
    desc: "Separamos señales, hechos, inferencias e hipótesis para evitar convertir una observación inicial en una conclusión prematura.",
  },
  {
    tag: "Intervención",
    title: "Actuar de forma proporcional",
    desc: "La solución debe corresponder al problema, su impacto, la evidencia disponible y los recursos de la organización. No toda situación requiere una transformación compleja.",
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
    <a href={href} className="btn btn-gold" target="_blank" rel="noreferrer">
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

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <span className="dashboard-title">Inteligencia empresarial</span>
        <span className="live">Mindstack</span>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <span>Señales</span>
          <strong>Observadas</strong>
        </div>

        <div className="dash-card">
          <span>Evidencia</span>
          <strong>Contrastada</strong>
        </div>

        <div className="dash-card">
          <span>Hipótesis</span>
          <strong>Explicadas</strong>
        </div>

        <div className="dash-card">
          <span>Decisiones</span>
          <strong>Priorizadas</strong>
        </div>
      </div>

      <div className="chart" />
    </div>
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
          <span>Señal observada</span>
          <span>Hecho</span>
          <span className="pill pill-mid">Validado</span>
        </div>

        <div className="report-row">
          <span>Posible explicación</span>
          <span>Hipótesis</span>
          <span className="pill pill-mid">Investigar</span>
        </div>

        <div className="report-row">
          <span>Intervención propuesta</span>
          <span>Decisión</span>
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
    <main className="page-shell">
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

          <ButtonGold href={WA}>Hablar con Mindstack</ButtonGold>
        </div>
      </header>

      <section id="inicio" className="hero">
  <div className="container hero-grid">
    <div>
      <span className="eyebrow">Firma de Inteligencia Empresarial</span>

      <h1>
        Comprender mejor.{" "}
        <span className="gold">Decidir mejor.</span>{" "}
        Transformar con inteligencia.
      </h1>

      <p className="hero-copy">
        Mindstack investiga cómo funciona realmente una empresa, conecta
        operación, procesos, datos y contexto, y convierte esa comprensión
        en decisiones e intervenciones con sentido.
      </p>

      <div className="hero-actions">
        <ButtonGold href={WA}>Hablar con Mindstack</ButtonGold>
        <ButtonOutline href="#metodologia">
          Conocer nuestro método
        </ButtonOutline>
      </div>

      <div className="metrics-row">
        <div className="metric">
          <span>Comprensión</span>
          <strong>Antes de intervenir</strong>
        </div>

        <div className="metric">
          <span>Evidencia</span>
          <strong>Antes de concluir</strong>
        </div>

        <div className="metric">
          <span>Decisión</span>
          <strong>Antes de ejecutar</strong>
        </div>

        <div className="metric">
          <span>Tecnología</span>
          <strong>Cuando tiene sentido</strong>
        </div>
      </div>
    </div>

    <Dashboard />
  </div>
</section>


<section id="inteligencia" className="section intelligence-section">
  <div className="container">
    <div className="section-head intelligence-head">
      <div>
        <span className="eyebrow">Inteligencia empresarial</span>

        <h2 className="section-title">
          La información no es inteligencia.{" "}
          <span className="gold">
            Entender qué significa y qué hacer con ella, sí.
          </span>
        </h2>
      </div>

      <p className="section-desc">
        Una empresa genera señales todos los días. El reto no es acumular más
        información, sino convertirla en una comprensión suficientemente clara
        para decidir mejor.
      </p>
    </div>

    <div className="intelligence-flow">
      <article className="intelligence-card">
        <span className="intelligence-number">01</span>
        <span className="intelligence-label">Información</span>

        <h3>Observar lo que realmente está ocurriendo</h3>

        <p>
          Reunimos señales provenientes de operación, ventas, procesos, personas,
          clientes, sistemas, datos y contexto empresarial.
        </p>

        <div className="intelligence-items">
          <span>Datos</span>
          <span>Procesos</span>
          <span>Señales</span>
          <span>Contexto</span>
        </div>
      </article>

      <article className="intelligence-card intelligence-card-featured">
        <span className="intelligence-number">02</span>
        <span className="intelligence-label">Inteligencia</span>

        <h3>Convertir información dispersa en comprensión</h3>

        <p>
          Investigamos relaciones, contrastamos evidencia y construimos
          explicaciones para distinguir hechos, síntomas, hipótesis y posibles
          causas.
        </p>

        <div className="intelligence-items">
          <span>Evidencia</span>
          <span>Patrones</span>
          <span>Hipótesis</span>
          <span>Prioridades</span>
        </div>
      </article>

      <article className="intelligence-card">
        <span className="intelligence-number">03</span>
        <span className="intelligence-label">Decisión</span>

        <h3>Intervenir donde realmente tiene sentido</h3>

        <p>
          La comprensión se traduce en decisiones: qué mantener, qué cambiar,
          qué investigar, qué priorizar y qué intervención tiene mayor sentido.
        </p>

        <div className="intelligence-items">
          <span>Decisiones</span>
          <span>Intervención</span>
          <span>Ejecución</span>
          <span>Aprendizaje</span>
        </div>
      </article>
    </div>

    <div className="intelligence-principle">
      <div>
        <span>Principio rector</span>
        <strong>Comprender antes de transformar.</strong>
      </div>

      <p>
        Mindstack no parte de una solución predeterminada. Primero construimos
        una lectura suficientemente rigurosa del problema; después decidimos
        cómo intervenir.
      </p>
    </div>
  </div>
</section>

      <section id="insights" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="section-title">
                Para negocios que quieren crecer con control y claridad.
              </h2>
            </div>
            <p className="section-desc">
              Lecturas ejecutivas para entender ventas, fugas, procesos y decisiones
              operativas antes de invertir más.
            </p>
          </div>

          <div className="cards-4">
            {insights.map((item) => (
              <article className="card" key={item.title}>
                <span className="tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="card-link">Leer más →</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capacidades" className="section section-alt capabilities-section">
  <div className="container">
    <div className="section-head">
      <div>
        <span className="eyebrow">Capacidades</span>

        <h2 className="section-title">
          La solución no se elige primero.{" "}
          <span className="gold">
            Se determina después de comprender el problema.
          </span>
        </h2>
      </div>

      <p className="section-desc">
        Mindstack trabaja con distintas capacidades de intervención. No todas
        las organizaciones necesitan tecnología, automatización o inteligencia
        artificial. La intervención depende de lo que la evidencia justifique.
      </p>
    </div>

    <div className="capabilities-grid">
      {services.map((item) => (
        <article className="capability-card" key={item.title}>
          <div className="capability-top">
            <span className="capability-number">{item.num}</span>
            <span className="capability-tag">{item.tag}</span>
          </div>

          <h3>{item.title}</h3>
          <p>{item.desc}</p>

          <div className="capability-footer">
            <span>Mindstack</span>
            <span>→</span>
          </div>
        </article>
      ))}
    </div>

    <div className="capabilities-statement">
      <span>No somos una empresa de herramientas</span>

      <strong>
        Tecnología, datos e IA son medios. La comprensión del negocio determina
        cuándo utilizarlos.
      </strong>
    </div>
  </div>
</section>

      <section id="sectores" className="section restaurant-section">
  <div className="container">
    <div className="section-head">
      <div>
        <span className="eyebrow">Industria foco</span>

        <h2 className="section-title">
          Inteligencia empresarial aplicada al{" "}
          <span className="gold">sector restaurantero.</span>
        </h2>
      </div>

      <p className="section-desc">
        La metodología de Mindstack es transversal, pero actualmente
        concentramos nuestro desarrollo comercial y aprendizaje sectorial en
        restaurantes, grupos gastronómicos y operaciones con múltiples
        sucursales.
      </p>
    </div>

    <div className="restaurant-intro">
      <div>
        <span className="restaurant-kicker">Por qué restaurantes</span>

        <h3>
          Operaciones donde pequeñas diferencias pueden convertirse en grandes
          diferencias de margen.
        </h3>
      </div>

      <p>
        Un restaurante combina demanda, inventario, personal, tiempos,
        experiencia del cliente, costos, procesos y datos en una misma
        operación. Cuando el negocio crece, comprender cómo interactúan esas
        variables se vuelve cada vez más importante.
      </p>
    </div>

    <div className="restaurant-signals">
      {restaurantSignals.map((signal) => (
        <article className="restaurant-signal" key={signal.title}>
          <span>{signal.num}</span>

          <div>
            <h3>{signal.title}</h3>
            <p>{signal.desc}</p>
          </div>
        </article>
      ))}
    </div>

    <div className="transversal-note">
      <div>
        <span>Capacidad transversal</span>
        <strong>El método no depende de una sola industria.</strong>
      </div>

      <p>
        Mindstack puede estudiar organizaciones de otros sectores cuando el
        problema requiere comprender sistemas empresariales, procesos, datos y
        decisiones. El foco restaurantero representa nuestra especialización
        comercial actual, no un límite metodológico.
      </p>
    </div>
  </div>
</section>

      <section id="metodologia" className="section section-alt">
  <div className="container method-grid">
    <div>
      <span className="eyebrow">Método Mindstack</span>

      <h2 className="section-title">
        Comprender antes de transformar.
      </h2>

      <p className="section-desc">
        Nuestro método evita comenzar por una herramienta, una tecnología o una
        respuesta predeterminada. Primero construimos comprensión; después
        investigamos, explicamos y decidimos cómo transformar.
      </p>

      <div className="method-principle">
        <span>Principio rector</span>

        <p>
          Una intervención sólo tiene sentido cuando existe suficiente
          comprensión del problema que pretende resolver.
        </p>
      </div>
    </div>

    <div className="steps">
      {steps.map((step) => (
        <article className="step" key={step.title}>
          <span className="step-num">{step.num}</span>

          <div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
            <section id="entregable" className="section section-alt">
  <div className="container deliverable-grid">
    <div>
      <span className="eyebrow">Inteligencia accionable</span>

      <h2 className="section-title">
        No entregamos información para archivar.{" "}
        <span className="gold">
          Construimos comprensión para decidir.
        </span>
      </h2>

      <p className="section-desc deliverable-copy">
        El trabajo de Mindstack transforma información dispersa en una lectura
        estructurada del negocio. El objetivo no es producir más documentos,
        sino reducir incertidumbre y mejorar la calidad de las decisiones.
      </p>

      <div className="deliverable-points">
        <div>
          <strong>01</strong>
          <span>Hechos y señales relevantes</span>
        </div>

        <div>
          <strong>02</strong>
          <span>Hallazgos y relaciones identificadas</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Hipótesis y explicaciones contrastadas</span>
        </div>

        <div>
          <strong>04</strong>
          <span>Prioridades y decisiones posibles</span>
        </div>
      </div>
    </div>

    <IntelligencePreview />
  </div>
</section>
            <section id="nosotros" className="section">
  <div className="container about-grid">
    <div className="about-content">
      <span className="eyebrow">La firma</span>

      <h2 className="section-title">
        Mindstack es una{" "}
        <span className="gold">Firma de Inteligencia Empresarial.</span>
      </h2>

      <p className="about-lead">
        Ayudamos a organizaciones a comprender mejor cómo funcionan antes de
        decidir qué transformar. Integramos investigación, análisis empresarial,
        datos, procesos y tecnología para convertir información dispersa en
        comprensión, decisiones e intervenciones con sentido.
      </p>

      <p className="about-lead">
        Nuestro trabajo no comienza con una herramienta ni con una solución
        predeterminada. Comienza construyendo una lectura suficientemente
        rigurosa del problema, contrastando evidencia y distinguiendo hechos,
        inferencias e hipótesis antes de actuar.
      </p>

      <div className="about-principles">
        <div>
          <strong>01</strong>
          <span>Comprender antes de transformar</span>
        </div>

        <div>
          <strong>02</strong>
          <span>Evidencia antes de prescripción</span>
        </div>

        <div>
          <strong>03</strong>
          <span>Tecnología al servicio del problema</span>
        </div>
      </div>
    </div>

    <div className="leadership-card">
      <div className="leadership-photo">
        <img src="/foto-luis-palma.jpg" alt="Dirección General de Mindstack" />
      </div>

      <div className="leadership-info">
        <span className="leadership-kicker">Dirección General</span>

        <h3>Antonio Hernández</h3>

        <p>
          Lidera la dirección estratégica de Mindstack y el desarrollo de su
          sistema de inteligencia empresarial. Su trabajo se concentra en
          comprender problemas de negocio, estructurar investigación y traducir
          evidencia, datos y contexto en decisiones e intervenciones
          empresariales.
        </p>

        <div className="leadership-tags">
          <span>Inteligencia empresarial</span>
          <span>Estrategia</span>
          <span>Datos</span>
          <span>Procesos</span>
          <span>IA aplicada</span>
        </div>
      </div>
    </div>
  </div>
</section>

      <section id="contacto" className="section">
  <div className="container">
    <div className="diagnostic-box">
      <div className="diagnostic-main">
        <span className="eyebrow">Cómo empezar</span>

        <h2>
          Antes de definir una solución,{" "}
          <span className="gold">entendamos el problema.</span>
        </h2>

        <p>
          Si existe una situación que necesita mayor claridad, compártenos el
          contexto. La primera conversación sirve para comprender qué está
          ocurriendo, qué necesita investigarse y si Mindstack puede aportar
          valor antes de proponer cualquier intervención.
        </p>

        <ButtonGold href={WA}>Hablar con Mindstack</ButtonGold>
      </div>

      <div className="diagnostic-list">
        <span className="eyebrow">Primera conversación</span>

        <ul>
          <li>Contexto del negocio y situación actual</li>
          <li>Qué está ocurriendo y por qué importa</li>
          <li>Qué evidencia existe y qué falta comprender</li>
          <li>Si Mindstack puede aportar valor</li>
          <li>Siguiente paso proporcional al problema</li>
        </ul>
      </div>
    </div>
  </div>
</section>

      <section className="section section-alt">
  <div className="container">
    <div className="section-head">
      <div>
        <span className="eyebrow">Nuestro enfoque</span>

        <h2 className="section-title">
          No empezamos por la solución.{" "}
          <span className="gold">
            Empezamos por comprender.
          </span>
        </h2>
      </div>

      <p className="section-desc">
        La calidad de una intervención depende de la calidad de la comprensión
        que existe antes de ejecutarla. Por eso Mindstack trabaja primero sobre
        evidencia, contexto y explicación.
      </p>
    </div>

    <div className="focus-grid">
      {focus.map((item) => (
        <article className="card" key={item.title}>
          <span className="tag">{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </article>
      ))}
    </div>
  </div>
</section>

      <section className="cta">
        <div className="container">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Antes de invertir más, detecta dónde está el verdadero problema.</h2>
          <p>
            Agenda una revisión express y recibe una lectura clara sobre los
            puntos que pueden estar frenando el crecimiento de tu restaurante.
          </p>
          <ButtonGold href={WA}>Agendar por WhatsApp</ButtonGold>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p style={{ marginTop: 20 }}>
                Consultoría estratégica, datos e inteligencia aplicada para negocios
                que buscan crecer con mayor control operativo y comercial.
              </p>
            </div>

            <div>
              <h4>Servicios</h4>
              <a href="#diagnostico">Diagnóstico Express</a>
              <a href="#servicios">Diagnóstico Inicial</a>
              <a href="#servicios">Sistema Comercial</a>
              <a href="#servicios">IA Operativa</a>
            </div>

            <div>
              <h4>Sectores</h4>
              <a href="#sectores">Restaurantes y gastronomía</a>
              <a href="#sectores">Retail y comercios locales</a>
              <a href="#sectores">Servicios profesionales</a>
              <a href="#sectores">Negocios con sucursales</a>
            </div>

            <div>
              <h4>Contacto</h4>
              <p>
                Para consultas, diagnósticos o información sobre servicios,
                escríbenos directamente por WhatsApp.
              </p>
              <ButtonGold href={WA}>Escribir por WhatsApp</ButtonGold>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 Grupo Mindstack. Consultoría, datos e inteligencia aplicada
              para restaurantes.
            </span>
            <span>México</span>
          </div>
        </div>
      </footer>
    </main>
  );
}