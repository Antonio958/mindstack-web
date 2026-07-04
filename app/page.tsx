const WA =
  "https://wa.me/5552138786?text=Hola%20Grupo%20Mindstack%2C%20quiero%20solicitar%20una%20revisi%C3%B3n%20ejecutiva";
const navItems = [
  ["Inicio", "#inicio"],
  ["Servicios", "#servicios"],
  ["Industrias", "#sectores"],
  ["Metodología", "#metodologia"],
  ["Nosotros", "#nosotros"],
  ["Diagnóstico", "#diagnostico"],
  ["Insights", "#insights"],
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
    title: "Revisión Ejecutiva Express",
    desc: "Sesión enfocada en detectar señales de fuga, desorden comercial y oportunidades de mejora antes de invertir en soluciones más grandes.",
  },
  {
    num: "02",
    title: "Diagnóstico Estratégico Inicial",
    desc: "Análisis estructurado de operación, ventas, rentabilidad y procesos para construir un mapa claro de problemas reales.",
  },
  {
    num: "03",
    title: "Sistema Comercial y Seguimiento",
    desc: "Diseño de procesos para captar, dar seguimiento, retener y recuperar oportunidades comerciales con mayor control.",
  },
  {
    num: "04",
    title: "Análisis de Rentabilidad y Fugas",
    desc: "Revisión de costos visibles, procesos, precios, tiempos y puntos donde el negocio puede estar perdiendo dinero.",
  },
  {
    num: "05",
    title: "IA y Automatización Operativa",
    desc: "Uso de inteligencia artificial para automatizar reportes, detectar patrones y reducir trabajo manual en procesos clave.",
  },
  {
    num: "06",
    title: "Reportes Ejecutivos y Tableros",
    desc: "Sistemas de medición para que los responsables del negocio tomen decisiones con información clara, accionable y ordenada.",
  },
];

const sectors = [
  "Restaurantes y gastronomía",
  "Retail y comercios locales",
  "Servicios profesionales",
  "Negocios con varias sucursales",
  "Educación y capacitación",
  "Ecommerce y ventas digitales",
];

const steps = [
  {
    num: "01",
    title: "Detectar",
    desc: "Observamos cómo opera realmente el negocio. Antes de proponer soluciones, identificamos dónde está el problema.",
  },
  {
    num: "02",
    title: "Medir",
    desc: "Cuantificamos el impacto de cada fuga, desorden o punto débil para distinguir síntomas de problemas importantes.",
  },
  {
    num: "03",
    title: "Priorizar",
    desc: "Definimos qué resolver primero según impacto, urgencia y recursos disponibles.",
  },
  {
    num: "04",
    title: "Ejecutar",
    desc: "Acompañamos acciones concretas para que las recomendaciones no se queden flotando.",
  },
  {
    num: "05",
    title: "Dar seguimiento",
    desc: "Medimos resultados, ajustamos el rumbo y aseguramos que los cambios puedan sostenerse.",
  },
];

const bullets = [
  "Revisión de situación actual",
  "Detección de fugas visibles",
  "Hipótesis de problemas operativos y comerciales",
  "Recomendaciones iniciales",
  "Siguiente paso sugerido",
];

const focus = [
  {
    tag: "Ventas y demanda",
    title: "Entender qué genera crecimiento",
    desc: "Observamos de dónde vienen las ventas, qué las impulsa y qué impide que sean más predecibles.",
  },
  {
    tag: "Operación y costos",
    title: "Detectar fugas invisibles",
    desc: "Revisamos procesos, costos visibles, tiempos, merma, retrabajo y puntos donde la operación puede estar drenando margen.",
  },
  {
    tag: "Procesos comerciales",
    title: "Convertir interés en seguimiento",
    desc: "Analizamos cómo el negocio capta oportunidades, da seguimiento, retiene clientes y convierte información en acciones comerciales.",
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
        <span className="dashboard-title">Panel operativo</span>
        <span className="live">En vivo</span>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <span>Demanda construida</span>
          <strong>84%</strong>
        </div>
        <div className="dash-card">
          <span>Fugas detectadas</span>
          <strong>3 activas</strong>
        </div>
        <div className="dash-card">
          <span>Diagnóstico operativo</span>
          <strong>Completo</strong>
        </div>
        <div className="dash-card">
          <span>IA y datos</span>
          <strong>Activo</strong>
        </div>
      </div>

      <div className="chart" />
    </div>
  );
}

function ReportPreview() {
  return (
    <div className="report-preview">
      <div className="report-top">
        <div>
          <span className="report-kicker">Vista ejecutiva</span>
          <h3>Diagnóstico Express</h3>
        </div>
        <span className="report-status">Prioridad alta</span>
      </div>

      <div className="report-summary">
        <div>
          <span>Fugas visibles</span>
          <strong>3</strong>
        </div>
        <div>
          <span>Áreas revisadas</span>
          <strong>5</strong>
        </div>
        <div>
          <span>Siguiente acción</span>
          <strong>72h</strong>
        </div>
      </div>

      <div className="report-table">
        <div className="report-row report-head">
          <span>Hallazgo</span>
          <span>Impacto</span>
          <span>Prioridad</span>
        </div>

        <div className="report-row">
          <span>Demanda inconsistente entre semana</span>
          <span>Alto</span>
          <span className="pill pill-high">Alta</span>
        </div>

        <div className="report-row">
          <span>Seguimiento débil a clientes recurrentes</span>
          <span>Medio</span>
          <span className="pill pill-mid">Media</span>
        </div>

        <div className="report-row">
          <span>Costos operativos sin trazabilidad clara</span>
          <span>Alto</span>
          <span className="pill pill-high">Alta</span>
        </div>
      </div>

      <div className="report-note">
        <span>Lectura inicial</span>
        <p>
          El negocio no presenta un solo problema aislado. La oportunidad está
          en ordenar demanda, seguimiento comercial y puntos de fuga operativa.
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

          <ButtonGold href={WA}>Solicitar diagnóstico</ButtonGold>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Grupo Mindstack</span>

            <h1>
              Demanda más estable. <span className="gold">Menos fugas.</span>{" "}
              Decisiones con datos.
            </h1>

            <p className="hero-copy">
              Ayudamos a negocios a detectar dónde se escapa el dinero, ordenar
              sus procesos comerciales y convertir datos operativos en decisiones
              de crecimiento.
            </p>

            <div className="hero-actions">
              <ButtonGold href={WA}>Agendar diagnóstico express</ButtonGold>
              <ButtonOutline href="#metodologia">Ver metodología</ButtonOutline>
            </div>

            <div className="metrics-row">
              <div className="metric">
                <span>Demanda construida</span>
                <strong>Medible</strong>
              </div>
              <div className="metric">
                <span>Fugas de dinero</span>
                <strong>Detectables</strong>
              </div>
              <div className="metric">
                <span>Diagnóstico</span>
                <strong>60 minutos</strong>
              </div>
              <div className="metric">
                <span>Datos e IA</span>
                <strong>Aplicados</strong>
              </div>
            </div>
          </div>

          <Dashboard />
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

      <section id="servicios" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Servicios</span>
              <h2 className="section-title">
                Soluciones diseñadas para problemas reales
              </h2>
            </div>
            <p className="section-desc">
              No vendemos paquetes genéricos. Primero encontramos el problema,
              después definimos qué intervención tiene sentido.
            </p>
          </div>

          <div className="cards-3">
            {services.map((item) => (
              <article className="card service-card" key={item.title}>
                <div className="number">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sectores" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Industrias</span>
              <h2 className="section-title">
                Negocios donde operación, ventas y datos pueden cambiar el margen
              </h2>
            </div>
          </div>
<div className="industry-layout">
  <div className="sectors-grid">
    {sectors.map((sector, index) => (
      <div className="sector-item" key={sector}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{sector}</strong>
      </div>
    ))}
  </div>

  <div className="industry-panel">
    <span className="industry-kicker">Análisis transversal</span>
    <h3>Una misma lógica aplicada a distintos negocios</h3>
    <p>
      Mindstack no depende de una sola industria. La metodología analiza
      demanda, procesos, seguimiento comercial, costos visibles y puntos de fuga
      para detectar dónde el negocio puede crecer con más control.
    </p>

    <div className="industry-matrix">
      <div>
        <span>01</span>
        <strong>Ventas</strong>
        <p>Origen, comportamiento y estabilidad de la demanda.</p>
      </div>
      <div>
        <span>02</span>
        <strong>Operación</strong>
        <p>Procesos, tiempos, fricción y costos ocultos.</p>
      </div>
      <div>
        <span>03</span>
        <strong>Datos</strong>
        <p>Lectura ejecutiva para decidir con mayor claridad.</p>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      <section id="metodologia" className="section section-alt">
        <div className="container method-grid">
          <div>
            <span className="eyebrow">Metodología</span>
            <h2 className="section-title">
              Claridad antes de vender soluciones
            </h2>
            <p className="section-desc">
              Mindstack no entra ofreciendo herramientas ni promesas amplias.
              Primero se identifica dónde está el problema real y qué acción
              puede generar mayor impacto.
            </p>
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
            <span className="eyebrow">Entregable</span>
            <h2 className="section-title">
              Una lectura ejecutiva, no una lista genérica de recomendaciones
            </h2>
            <p className="section-desc deliverable-copy">
              El diagnóstico se traduce en hallazgos claros, prioridades y
              acciones iniciales. El objetivo es que el dueño entienda dónde
              puede estar perdiendo dinero y qué debería revisar primero.
            </p>

            <div className="deliverable-points">
              <div>
                <strong>01</strong>
                <span>Hallazgos principales</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Fugas visibles o probables</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Prioridad por impacto</span>
              </div>
              <div>
                <strong>04</strong>
                <span>Siguiente paso sugerido</span>
              </div>
            </div>
          </div>

          <ReportPreview />
        </div>
      </section>
            <section id="nosotros" className="section">
        <div className="container about-grid">
          <div className="about-content">
            <span className="eyebrow">Quiénes somos</span>

            <h2 className="section-title">
              Consultoría estratégica para entender dónde se pierde control, margen y crecimiento
            </h2>

            <p className="about-lead">
               Grupo Mindstack integra estrategia, análisis operativo, datos e inteligencia
               aplicada para ayudar a negocios a identificar fugas, ordenar procesos y tomar
               decisiones con mayor claridad. El enfoque parte de una premisa simple: antes de
               invertir más, es necesario entender dónde está el verdadero problema.
            </p>

            <div className="about-principles">
              <div>
                <strong>01</strong>
                <span>Primero entender, después intervenir</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Datos convertidos en decisiones accionables</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Visión comercial, operativa y financiera</span>
              </div>
            </div>
          </div>

          <div className="leadership-card">
            <div className="leadership-photo">
              <img src="/foto-luis-palma.jpg" alt="Luis Antonio Palma" />
            </div>

            <div className="leadership-info">
              <span className="leadership-kicker">Dirección general</span>
              <h3>Antonio Hernández</h3>
              <p>
                 Lidera la visión estratégica de Grupo Mindstack, con enfoque en análisis de
                 negocio, procesos comerciales, operación, datos e inteligencia aplicada. Su
                 trabajo se centra en traducir información dispersa en decisiones claras y
                 acciones con impacto.
              </p>

              <div className="leadership-tags">
                <span>Estrategia</span>
                <span>Operación</span>
                <span>Datos</span>
                <span>IA aplicada</span>
                 <span>Procesos comerciales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="diagnostico" className="section">
        <div className="container">
          <div className="diagnostic-box">
            <div className="diagnostic-main">
              <span className="eyebrow">Producto principal</span>
              <h2>
                Diagnóstico Express de{" "}
                <span className="gold">60 minutos</span>
              </h2>
              <p>
                Una sesión ejecutiva para identificar señales de fuga, puntos de
                desorden comercial y oportunidades de mejora antes de invertir
                en soluciones más grandes.
              </p>
              <ButtonGold href={WA}>Solicitar revisión por WhatsApp</ButtonGold>
            </div>

            <div className="diagnostic-list">
              <span className="eyebrow">Qué incluye</span>
              <ul>
                {bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
                No vendemos marketing genérico.{" "}
                <span className="gold">
                  Analizamos cómo se comporta el negocio.
                </span>
              </h2>
            </div>
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