import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { t } = useLang();

  const links = [
    { href: "#experience", label: t("nav_experience") },
    { href: "#projects",   label: t("nav_projects") },
    { href: "#skills",     label: t("nav_skills") },
    { href: "#about",      label: t("nav_about") },
    { href: "#contact",    label: t("nav_contact") },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  };

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background .3s, border-bottom .3s;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          background: rgba(8,10,15,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-family: var(--font-mono); font-size: .85rem; color: var(--accent); letter-spacing: .08em; cursor: pointer; }
        .nav-logo span { color: var(--text2); }
        .nav-right { display: flex; align-items: center; gap: 1rem; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; color: var(--text2); transition: color .2s; position: relative; cursor: pointer; }
        .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width .25s; }
        .nav-links a:hover { color: var(--text); }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: .45rem 1.1rem; font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; transition: background .2s, color .2s; cursor: pointer; white-space: nowrap; }
        .nav-cta:hover { background: var(--accent); color: var(--bg); }
        .nav-burger { display: none; background: none; border: none; color: var(--text); font-size: 1.2rem; }
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: block; }
          .nav-mobile { position: fixed; inset: 0; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; z-index: 99; }
          .nav-mobile a { font-size: 1.5rem; letter-spacing: .08em; text-transform: uppercase; color: var(--text2); cursor: pointer; }
        }
      `}</style>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => navigate("/")}>TL<span> /</span></div>
        <div className="nav-right">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={(e) => handleNav(e, l.href)}>{l.label}</a></li>
            ))}
          </ul>
          <button className="nav-cta" onClick={(e) => handleNav(e, "#contact")}>{t("nav_cta")}</button>
          <LangSwitcher />
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="menu">{open ? "✕" : "☰"}</button>
        </div>
      </nav>
      {open && (
        <div className="nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)}>{l.label}</a>
          ))}
          <LangSwitcher />
        </div>
      )}
    </>
  );
}
