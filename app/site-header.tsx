import type { ReactNode } from "react";

const links = [
  ["Inicio", "/#inicio"],
  ["Capacidades", "/#capacidades"],
  ["Método", "/#metodologia"],
  ["Industrias", "/#sectores"],
  ["Firma", "/#nosotros"],
  ["Preguntas frecuentes", "/preguntas-frecuentes"],
  ["Contacto", "/#contacto"],
];

const headerStyles = `
.mindstack-editorial .msk-site-header{position:fixed;inset:0 0 auto;z-index:60;background:#151716f5;backdrop-filter:blur(16px);color:#f5f2ec;border-bottom:1px solid #3a3d35}
.mindstack-editorial .msk-site-header .msk-site-header-inner{width:min(1280px,calc(100% - 64px));margin:0 auto;min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:22px}
.msk-site-brand{display:flex;align-items:center;flex:0 0 120px;width:120px;height:68px;overflow:hidden}
.msk-site-brand img{display:block;width:120px;height:68px;object-fit:cover;object-position:center}
.msk-site-header .msk-site-nav{display:flex;align-items:center;gap:clamp(13px,1.4vw,23px)}
.msk-site-header .msk-site-nav a{color:#dadbd4;font-size:12px;font-weight:650;white-space:nowrap;letter-spacing:.035em;text-transform:uppercase}
.msk-site-header .msk-site-nav a[aria-current]{color:#e5c46b;text-decoration:underline;text-underline-offset:6px}
.msk-site-header .msk-site-nav a:hover{color:#fff}
.mindstack-editorial .msk-site-header .msk-site-cta{display:inline-flex;align-items:center;justify-content:center;background:#c9a227;color:#101211;min-height:44px;padding:11px 17px;border:1px solid #c9a227;border-radius:6px;font-weight:750;font-size:12px!important;letter-spacing:.035em;text-transform:uppercase;white-space:nowrap}
.msk-site-menu{display:none;position:relative}
.msk-site-menu summary{cursor:pointer;list-style:none;font-size:14px;font-weight:700;color:#f5f2ec}
.msk-site-menu summary::-webkit-details-marker{display:none}
.msk-site-menu[open] nav{display:grid;position:absolute;right:0;top:calc(100% + 15px);min-width:235px;padding:16px;background:#1b1d1b;border:1px solid #45483f;box-shadow:0 16px 40px #0005}
.msk-site-menu nav a{display:block;padding:9px 0;color:#eeeae1;font-size:14px}
.msk-site-menu nav a[aria-current]{color:#e5c46b}
.msk-site-header a:focus-visible,.msk-site-header summary:focus-visible{outline:2px solid #e6c66b;outline-offset:4px}
.msk-faq .msk-faq-intro{padding-top:124px}
@media(max-width:1100px){.msk-site-header .msk-site-nav{display:none}.msk-site-menu{display:block;margin-left:auto}}
@media(max-width:640px){.mindstack-editorial .msk-site-header .msk-site-header-inner{width:calc(100% - 32px);min-height:68px;gap:10px}.msk-site-brand{flex-basis:90px;width:90px;height:58px}.msk-site-brand img{width:90px;height:58px}.mindstack-editorial .msk-site-header .msk-site-cta{font-size:10px!important;padding:9px;min-height:40px}.msk-faq .msk-faq-intro{padding-top:105px}}
`;

export function SiteHeader({faq=false}: {faq?: boolean}) {
  function navigation(): ReactNode {
    return links.map(([label, href]) => <a key={href} href={href} aria-current={faq && href === "/preguntas-frecuentes" ? "page" : undefined}>{label}</a>);
  }
  return <header className="msk-site-header">
    <style>{headerStyles}</style>
    <div className="msk-site-header-inner">
      <a className="msk-site-brand" href="/" aria-label="Mindstack, inicio"><img src="/logo-mindstack.png" alt="Mindstack" width={120} height={68} /></a>
      <nav className="msk-site-nav" aria-label="Navegación principal">{navigation()}</nav>
      <details className="msk-site-menu"><summary aria-label="Abrir menú de navegación">Menú ☰</summary><nav aria-label="Navegación móvil">{navigation()}</nav></details>
      <a className="msk-site-cta" href="/evaluacion/">Evaluación gratuita</a>
    </div>
  </header>;
}
