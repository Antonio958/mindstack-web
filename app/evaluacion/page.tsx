"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { Manrope, Inter } from "next/font/google";
import { Answers, evaluate, visibleQuestions, VERSION } from "../../lib/evaluacion/motor";
import styles from "./evaluacion.module.css";
import { EVALUACION_API_URL, evaluationApiForHostname, PRIVACY_PATH, PRIVACY_VERSION as APPROVED_PRIVACY_VERSION, TURNSTILE_SITE_KEY } from "../../lib/evaluacion/config";
import { comprobarDisponibilidad, compartirEvaluacion } from "../../lib/evaluacion/cliente";

const displayFont = Manrope({ subsets: ["latin"], variable: "--assessment-display", display: "swap" });
const readingFont = Inter({ subsets: ["latin"], variable: "--assessment-reading", display: "swap" });
type TurnstileAPI = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void };

const BOOKING_URL = process.env.NEXT_PUBLIC_DISCOVERY_BOOKING_URL || "https://calendar.app.google/t7YPiSH7QzDKR7JC6";
const API_URL = process.env.NEXT_PUBLIC_EVALUACION_API_URL || EVALUACION_API_URL;
const PRIVACY_URL = process.env.NEXT_PUBLIC_AVISO_PRIVACIDAD_URL || PRIVACY_PATH;
const PRIVACY_VERSION = process.env.NEXT_PUBLIC_AVISO_PRIVACIDAD_VERSION || APPROVED_PRIVACY_VERSION;
// La Site Key de Turnstile es pública; la Secret Key permanece únicamente en el Worker API.
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY;
const CAN_SAVE = Boolean(API_URL && PRIVACY_URL && PRIVACY_VERSION && TURNSTILE_KEY);
const WHATSAPP = "https://wa.me/525552138786?text=" + encodeURIComponent(
  "Hola Mindstack, realicé su evaluación empresarial y me gustaría conversar sobre mi negocio."
);

export default function EvaluacionPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const [savedReference, setSavedReference] = useState("");
  const [serviceReady, setServiceReady] = useState(false);
  const [apiUrl, setApiUrl] = useState(API_URL);
  useEffect(() => { setApiUrl(evaluationApiForHostname(window.location.hostname, API_URL)); }, []);
  const [contactOpen, setContactOpen] = useState(false);
  const [challengeReady, setChallengeReady] = useState(false);
  const [challengeError, setChallengeError] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const questions = visibleQuestions(answers);
  const question = questions[Math.min(step, questions.length - 1)];
  const isSelected = Boolean(answers[question.id]);
  const result = finished ? evaluate(answers) : null;
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const submitted = submissionStatus === "saved";
  useEffect(() => {
    if (!contactOpen || !challengeReady || submitted || !widgetRef.current) return;
    const api = (window as typeof window & { turnstile?: TurnstileAPI }).turnstile;
    if (!api) return;
    setTurnstileToken("");
    setChallengeError(false);
    let id: string;
    try {
      id = api.render(widgetRef.current, {
        sitekey: TURNSTILE_KEY, size: "flexible",
        callback: (token: string) => { setTurnstileToken(token); setChallengeError(false); },
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => { setTurnstileToken(""); setChallengeError(true); },
      });
    } catch { setChallengeError(true); return; }
    widgetId.current = id;
    return () => { api.remove(id); widgetId.current = null; };
  }, [contactOpen, challengeReady, submitted]);

  useEffect(() => {
    if (step > 0 || finished) headingRef.current?.focus({preventScroll: true});
    if (finished || step > 0) window.scrollTo({top:0, behavior:"instant"});
  }, [step, finished]);

  function openContact() {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      setContactOpen(true);
    }
  }
  function closeContact() {
    if (submissionStatus === "sending") return;
    dialogRef.current?.close();
  }

  // Comprobar la disponibilidad real de la API y la versión del aviso antes de mostrar el formulario.
  // Así no se solicitan datos personales cuando Neon o Cloudflare no están listos.
  useEffect(() => {
    if (!finished || !CAN_SAVE) return;
    const controller = new AbortController();
    setServiceReady(false);
    comprobarDisponibilidad(apiUrl, PRIVACY_VERSION, controller.signal)
      .then((ready) => {
        if (!controller.signal.aborted) setServiceReady(ready);
      });
    return () => controller.abort();
  }, [finished, apiUrl]);

  function next() {
    if (!isSelected) return;
    if (step >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setStep(step + 1);
  }
  function reset() {
    dialogRef.current?.close();
    setContactOpen(false);
    setChallengeError(false);
    setAnswers({});
    setStep(0);
    setFinished(false);
    setSubmissionStatus("idle");
    setSavedReference("");
    setTurnstileToken("");
    setContactConsent(false);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setServiceReady(false);
  }
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!CAN_SAVE || !serviceReady || !contactConsent || !turnstileToken || !finished || submissionStatus === "sending") return;
    setSubmissionStatus("sending");
    try {
      const reference = await compartirEvaluacion(apiUrl, {
        answers,
        contact: { name: contactName, email: contactEmail, phone: contactPhone },
        privacyVersion: PRIVACY_VERSION,
        turnstileToken,
        source: new URLSearchParams(window.location.search).get("utm_source") || "web",
      });
      setSavedReference(reference);
      setSubmissionStatus("saved");
    } catch {
      setSubmissionStatus("error");
      setTurnstileToken("");
      const browser = window as typeof window & { turnstile?: TurnstileAPI };
      if (widgetId.current !== null) browser.turnstile?.reset(widgetId.current);
    }
  }
  const bookingHref = BOOKING_URL || WHATSAPP;
  const contactTitle = result?.status === "signals" ? "Exploremos cómo podemos ayudarte." : result?.status === "uncertain" ? "Aclaremos qué información necesitas." : "Conversemos sobre tus objetivos de mejora.";
  const contactText = result?.status === "signals" ? "Comparte tus resultados para conversar sobre las situaciones que reportaste y valorar qué convendría investigar." : result?.status === "uncertain" ? "Podemos conversar sobre los aspectos que aún requieren claridad y qué información sería útil reunir." : "Si tienes un objetivo de crecimiento o mejora, comparte tus resultados para iniciar una conversación.";
  const canContact = CAN_SAVE && serviceReady && result?.status !== "outside_scope";

  return (
    <main className={`${styles.shell} ${displayFont.variable} ${readingFont.variable}`} data-revision="evaluation-10" data-subdomain-migration="ready">
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Volver al inicio de Mindstack">
          <img src="/logo-mindstack.png" alt="" className={styles.logo} />
          <span className={styles.brandText}>MINDSTACK</span>
        </Link>
        <Link href="/" className={styles.backLink}>Conocer la firma <span aria-hidden="true">↗</span></Link>
      </header>

      {!finished ? (
        <div className={styles.main}>
          <div className={styles.topline}>
            <span>EXPLORACIÓN EMPRESARIAL GRATUITA</span>
            <span>Sin registro obligatorio</span>
          </div>
          <div className={styles.progressMeta}>
            <span>Paso {step + 1} de {questions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className={styles.track} role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={questions.length} aria-label="Progreso de la evaluación">
            <div className={styles.trackFill} style={{ width: progress + "%" }} />
          </div>
          <div className={styles.questionArea}>
            <p className={styles.eyebrow}>{question.group}</p>
            <h1 ref={headingRef} tabIndex={-1} className={styles.questionTitle}>{question.title}</h1>
            {question.help && <p className={styles.help}>{question.help}</p>}
            <fieldset className={styles.options}>
              <legend className={styles.srOnly}>Selecciona una respuesta</legend>
              {question.choices.map((choice) => (
                <label key={choice.value} className={styles.option + (answers[question.id] === choice.value ? " " + styles.selected : "")}>
                  <input
                    type="radio"
                    name={question.id}
                    value={choice.value}
                    checked={answers[question.id] === choice.value}
                    onChange={() => setAnswers(prev => {
                      // Changing sector invalidates answers to questions that may no longer apply.
                      if (question.id === "sector" && prev.sector !== choice.value) {
                        return { sector: choice.value };
                      }
                      return { ...prev, [question.id]: choice.value };
                    })}
                  />
                  <span className={styles.choiceText}>{choice.label}</span>
                  <span aria-hidden="true" className={styles.choiceMark}>✓</span>
                </label>
              ))}
            </fieldset>
          </div>
          <nav className={styles.navigation} aria-label="Navegación del cuestionario">
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={step === 0}
              onClick={() => setStep(s => Math.max(s - 1, 0))}
            >
              Anterior
            </button>
            <button type="button" className={styles.primaryButton} disabled={!isSelected} onClick={next}>
              {step >= questions.length - 1 ? "Ver mis resultados" : "Continuar"} <span aria-hidden="true">→</span>
            </button>
          </nav>
          <p className={styles.disclosure}>
            {CAN_SAVE
              ? "Sin registro ni cuenta. Tus respuestas se procesan en este navegador y solo se envían si al final decides compartirlas y aceptas el aviso de privacidad."
              : "Sin registro ni cuenta. Tus respuestas permanecen en esta sesión del navegador y no se envían a nuestros servidores en esta versión preliminar."}
          </p>
        </div>
      ) : result && (
        <div className={styles.results}>
          <div className={styles.topline}>
            <span>RESULTADOS DE TU EXPLORACIÓN</span>
            <span>V. {VERSION}</span>
          </div>
          <div className={styles.resultHero}>
            <p className={styles.eyebrow}>UNA LECTURA INICIAL BASADA EN TUS RESPUESTAS</p>
            <h1 ref={headingRef} tabIndex={-1}>{result.title}</h1>
            <p>{result.intro}</p>
            {result.status !== "outside_scope" && <div className={styles.summaryGrid} aria-label="Resumen de tus respuestas">
              {[[result.findings.length,"Situaciones reportadas"],[result.strengths.length,"Prácticas favorables"],[result.unknowns.length,"Aspectos por aclarar"]].map(([count,label]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}
              <p>Conteo de observaciones, no una calificación de tu negocio.</p>
            </div>}
          </div>
          {canContact && !submitted && <aside className={styles.invitation}>
            <div><p className={styles.eyebrow}>Siguiente paso opcional</p><h2>{contactTitle}</h2><p>{contactText}</p></div>
            <button type="button" className={styles.primaryButton} onClick={openContact}>Solicitar contacto ↗</button>
          </aside>}

          {result.findings.length > 0 && (
            <section className={styles.resultSection} aria-labelledby="finding-heading">
              <div className={styles.sectionHeading}>
                <span>01</span>
                <h2 id="finding-heading">Situaciones reportadas</h2>
              </div>
              {result.findings.map((f, i) => (
                <article className={styles.finding} key={f.id}>
                  <p className={styles.findingIndex}>SEÑAL {String(i + 1).padStart(2, "0")} · {f.family.toUpperCase()}</p>
                  <h3>{f.title}</h3>
                  <div className={styles.reading}>
                    <div><strong>Lo que respondiste</strong><p>{f.evidence}</p></div>
                    <div><strong>Por qué podría importar</strong><p>{f.importance}</p></div>
                    <div><strong>Lo que aún no sabemos</strong><p>{f.limitation}</p></div>
                  </div>
                  <div className={styles.capability}>
                    <strong>Cómo podría contribuir Mindstack</strong>
                    <p>{f.capability}</p>
                  </div>
                </article>
              ))}
            </section>
          )}

          {result.strengths.length > 0 && (
            <section className={styles.resultSection}>
              <div className={styles.sectionHeading}><span>+</span><h2>Prácticas favorables declaradas</h2></div>
              <ul className={styles.observationList}>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </section>
          )}
          {result.unknowns.length > 0 && (
            <section className={styles.resultSection}>
              <div className={styles.sectionHeading}><span>?</span><h2>Aspectos que requieren más claridad</h2></div>
              <ul className={styles.observationList}>{result.unknowns.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </section>
          )}
          <section className={styles.limitSection}>
            <strong>Alcance de esta evaluación</strong>
            <p>Este resultado no es un diagnóstico ni una auditoría. Está basado exclusivamente en declaraciones que no han sido verificadas. No establece causas raíz, impactos económicos ni soluciones recomendadas.</p>
          </section>

          {canContact && (
            <section className={styles.contactSection}>
              <div className={styles.sectionHeading}><span>↗</span><h2>¿Quieres compartir tus resultados con Mindstack?</h2></div>
              {submitted ? <div className={styles.successBox} role="status"><strong>Recibimos tu evaluación.</strong><p>Referencia: {savedReference}. Puedes continuar con una conversación inicial.</p></div> :
                <div className={styles.invitation}><div><h3>{contactTitle}</h3><p>{contactText} Sin compromiso de contratación.</p></div><button type="button" className={styles.primaryButton} onClick={openContact}>Solicitar contacto ↗</button></div>}
              <dialog ref={dialogRef} className={styles.contactDialog} aria-labelledby="contact-title" onClose={() => {setContactOpen(false); setTurnstileToken("");}} onCancel={e=>{if(submissionStatus==="sending") e.preventDefault();}}>
                <div className={styles.dialogHeader}><span>MSK / MINDSTACK</span><button type="button" onClick={closeContact} disabled={submissionStatus==="sending"} aria-label="Cerrar ventana">×</button></div>
                <p className={styles.eyebrow}>Contacto voluntario</p>
                <h2 id="contact-title">{submitted ? "Recibimos tu evaluación." : contactTitle}</h2>
                {submitted ? <div className={styles.successBox} role="status"><p>Referencia: {savedReference}</p><p>Gracias por compartir tus respuestas. Puedes consultar tus resultados o agendar una conversación.</p><button type="button" className={styles.primaryButton} onClick={closeContact}>Volver a mis resultados</button></div> :
                <>
                <p className={styles.contactIntro}>{contactText} Conservaremos los datos compartidos hasta 12 meses, salvo obligación legal o relación contractual que justifique otro plazo.</p>
                <form onSubmit={submitContact} className={styles.contactForm}>
                  <label>Nombre de contacto
                    <input required minLength={2} maxLength={120} autoComplete="name" value={contactName} onChange={e => setContactName(e.target.value)}/>
                  </label>
                  <label>Correo electrónico
                    <input required type="email" maxLength={254} autoComplete="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}/>
                  </label>
                  <label>Teléfono (opcional)
                    <input type="tel" maxLength={32} autoComplete="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)}/>
                  </label>
                  <label className={styles.consent}>
                    <input type="checkbox" checked={contactConsent} onChange={e => setContactConsent(e.target.checked)} required/>
                    <span>Autorizo el tratamiento de mis datos y respuestas para atender mi solicitud conforme al <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">aviso de privacidad de Mindstack</a>. Esta autorización no implica aceptar publicidad futura.</span>
                  </label>
                  <div ref={widgetRef} className="cf-turnstile" aria-label="Verificación de seguridad" />
                  {challengeError && <p role="alert" className={styles.formError}>No se pudo iniciar la verificación. Cierra y vuelve a abrir la ventana o utiliza WhatsApp.</p>}
                  {submissionStatus === "error" && <p role="alert" className={styles.formError}>No fue posible guardar la información. Inténtalo de nuevo o utiliza el contacto directo.</p>}
                  <button className={styles.primaryButton} type="submit" disabled={!contactConsent || !turnstileToken || submissionStatus === "sending"}>
                    {submissionStatus === "sending" ? "Guardando..." : "Compartir resultados y solicitar contacto"}
                  </button>
                </form>

                <button type="button" className={styles.dismissContact} onClick={closeContact} disabled={submissionStatus==="sending"}>Por ahora, solo quiero consultar mis resultados</button>
                <p className={styles.dialogNote}>Sin compromiso de contratación ni suscripción automática a publicidad.</p>
                </>}
              </dialog>
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setChallengeReady(true)} onError={()=>setChallengeError(true)} />
            </section>
          )}

          <section className={styles.closing}>
            <p className={styles.eyebrow}>MINDSTACK · COMPRENDER ANTES DE TRANSFORMAR</p>
            <h2>{result.status === "outside_scope" ? "Conversemos sobre tu organización." : result.status === "signals" ? "¿Vale la pena profundizar en lo que has observado?" : "Conocer tu empresa también es reconocer lo que funciona."}</h2>
            <p>{result.invitation}</p>
            <div className={styles.closingActions}>
              {result.status === "signals" ? (
                <a className={styles.primaryButton} href={bookingHref} target="_blank" rel="noopener noreferrer">
                  {BOOKING_URL ? "Agendar conversación inicial" : "Conversar con Mindstack"} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>Conversar con Mindstack <span aria-hidden="true">↗</span></a>
              )}
              <button type="button" className={styles.secondaryButton} onClick={reset}>Realizar otra evaluación</button>
            </div>
            {result.status === "signals" && (
              <p className={styles.smallNote}>{BOOKING_URL ? "La reserva se realiza mediante la agenda de Mindstack." : "La agenda directa estará disponible al configurar el calendario de reservas; por ahora el contacto es mediante WhatsApp."}</p>
            )}
          </section>
        </div>
      )}
      <footer className={styles.footer}>
        <span>© 2026 Grupo Mindstack</span>
        <span>Exploración orientativa · No sustituye investigación profesional</span>
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Aviso de privacidad</a>
      </footer>
    </main>
  );
}
