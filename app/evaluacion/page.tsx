"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import Script from "next/script";
import { Answers, evaluate, visibleQuestions, VERSION } from "../../lib/evaluacion/motor";
import styles from "./evaluacion.module.css";

const BOOKING_URL = process.env.NEXT_PUBLIC_DISCOVERY_BOOKING_URL || "https://calendar.app.google/t7YPiSH7QzDKR7JC6";
const API_URL = process.env.NEXT_PUBLIC_EVALUACION_API_URL || "";
const PRIVACY_URL = process.env.NEXT_PUBLIC_AVISO_PRIVACIDAD_URL || "";
const PRIVACY_VERSION = process.env.NEXT_PUBLIC_AVISO_PRIVACIDAD_VERSION || "";
// La Site Key de Turnstile es pública; la Secret Key permanece únicamente en el Worker API.
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAGPUHIprbjhv5LWX";
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
  const questions = visibleQuestions(answers);
  const question = questions[Math.min(step, questions.length - 1)];
  const isSelected = Boolean(answers[question.id]);
  const result = finished ? evaluate(answers) : null;
  const progress = Math.round(((step + 1) / questions.length) * 100);
  useEffect(() => {
    const w = window as typeof window & {
      msOnTurnstile?: (token: string) => void;
      msOnTurnstileExpired?: () => void;
      msOnTurnstileError?: () => void;
    };
    w.msOnTurnstile = (token: string) => setTurnstileToken(token);
    w.msOnTurnstileExpired = () => setTurnstileToken("");
    w.msOnTurnstileError = () => setTurnstileToken("");
    return () => {
      delete w.msOnTurnstile;
      delete w.msOnTurnstileExpired;
      delete w.msOnTurnstileError;
    };
  }, []);

  function next() {
    if (!isSelected) return;
    if (step >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setStep(step + 1);
  }
  function reset() {
    setAnswers({});
    setStep(0);
    setFinished(false);
    setSubmissionStatus("idle");
    setSavedReference("");
    setTurnstileToken("");
    setContactConsent(false);
  }
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!CAN_SAVE || !contactConsent || !turnstileToken || !finished || submissionStatus === "sending") return;
    setSubmissionStatus("sending");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          contact: { name: contactName, email: contactEmail, phone: contactPhone },
          privacyConsent: true,
          privacyVersion: PRIVACY_VERSION,
          turnstileToken,
          source: new URLSearchParams(window.location.search).get("utm_source") || "web",
        }),
      });
      const data: { ok?: boolean; evaluationId?: string } = await response.json();
      if (!response.ok || !data.ok) throw new Error("No se pudo enviar");
      setSavedReference(data.evaluationId || "");
      setSubmissionStatus("saved");
    } catch {
      setSubmissionStatus("error");
    }
  }
  const bookingHref = BOOKING_URL || WHATSAPP;

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Volver al inicio de Mindstack">
          <img src="/logo-mindstack.png" alt="" className={styles.logo} />
          <span>MINDSTACK</span>
        </Link>
        <Link href="/" className={styles.backLink}>Conocer la firma <span aria-hidden="true">↗</span></Link>
      </header>

      {!finished ? (
        <div className={styles.main}>
          <div className={styles.topline}>
            <span>EXPLORACIÓN EMPRESARIAL GRATUITA</span>
            <span>V. {VERSION}</span>
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
            <h1 className={styles.questionTitle}>{question.title}</h1>
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
                    onChange={() => setAnswers(prev => ({ ...prev, [question.id]: choice.value }))}
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
            <h1>{result.title}</h1>
            <p>{result.intro}</p>
          </div>

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

          {CAN_SAVE && result.status !== "outside_scope" && (
            <section className={styles.contactSection}>
              <div className={styles.sectionHeading}>
                <span>↗</span>
                <h2>¿Quieres compartir tus resultados con Mindstack?</h2>
              </div>
              <p className={styles.contactIntro}>Es opcional. Puedes obtener tu resultado completo sin dejar datos. Si decides compartirlo, conservaremos tus respuestas y datos de contacto hasta 12 meses para atender tu solicitud, salvo una obligación legal o relación contractual que justifique un plazo distinto.</p>
              {submissionStatus === "saved" ? (
                <div className={styles.successBox}>
                  <strong>Recibimos tu evaluación.</strong>
                  <p>Referencia: {savedReference}. Puedes continuar con la reserva de una conversación si te interesa.</p>
                </div>
              ) : (
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
                  <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-callback="msOnTurnstile" data-expired-callback="msOnTurnstileExpired" data-error-callback="msOnTurnstileError"/>
                  {submissionStatus === "error" && <p role="alert" className={styles.formError}>No fue posible guardar la información. Inténtalo de nuevo o utiliza el contacto directo.</p>}
                  <button className={styles.primaryButton} type="submit" disabled={!contactConsent || !turnstileToken || submissionStatus === "sending"}>
                    {submissionStatus === "sending" ? "Guardando..." : "Compartir mi evaluación"}
                  </button>
                </form>
              )}
              <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
            </section>
          )}

          <section className={styles.closing}>
            <p className={styles.eyebrow}>MINDSTACK · COMPRENDER ANTES DE TRANSFORMAR</p>
            <h2>{result.status === "signals" ? "¿Vale la pena profundizar en lo que has observado?" : "Conocer tu empresa también es reconocer lo que funciona."}</h2>
            <p>{result.invitation}</p>
            <div className={styles.closingActions}>
              {result.status === "signals" ? (
                <a className={styles.primaryButton} href={bookingHref} target="_blank" rel="noopener noreferrer">
                  {BOOKING_URL ? "Agendar conversación inicial" : "Conversar con Mindstack"} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link href="/" className={styles.primaryButton}>Conocer Mindstack <span aria-hidden="true">↗</span></Link>
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
      </footer>
    </main>
  );
}
