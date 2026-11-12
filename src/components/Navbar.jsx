import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/useLang";
import { IconClose, IconDownload, IconMenu } from "./Icons";

export default function Navbar() {
  const { lang, setLang, s } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [
    { to: "/#projets", label: s.nav.projects },
    { to: "/#parcours", label: s.nav.experience },
    { to: "/#competences", label: s.nav.skills },
    { to: "/#contact", label: s.nav.contact },
  ];

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>Thomas Labetouille</Link>
        <nav className="nav-links" aria-label={s.nav.menu}>
          {items.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}
        </nav>
        <div className="lang" role="group" aria-label={s.nav.langLabel}>
          <button type="button" lang="fr" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>
            <span className="sr-only">Français</span><span aria-hidden="true" style={{ color: "inherit" }}>FR</span>
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            <span className="sr-only">English</span><span aria-hidden="true" style={{ color: "inherit" }}>EN</span>
          </button>
        </div>
        <a className="btn sm primary nav-cv" href={s.cvFile} target="_blank" rel="noreferrer">
          <IconDownload />{s.nav.cv}
        </a>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? s.nav.close : s.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      <nav id="menu-mobile" className="nav-panel" hidden={!open} aria-label={s.nav.menu}>
        {items.map((i) => <Link key={i.to} to={i.to} onClick={() => setOpen(false)}>{i.label}</Link>)}
        <a href={s.cvFile} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>{s.nav.cv}</a>
      </nav>
    </header>
  );
}
