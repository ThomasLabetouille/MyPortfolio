import { useEffect, useMemo, useState } from "react";
import { LangContext } from "./langContext";
import { site } from "../data/site";

const LANGS = ["fr", "en"];

// Ordre de priorité : ?lang=en dans l'adresse, puis le dernier choix du visiteur, puis le français.
function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem("lang");
    if (LANGS.includes(stored)) return stored;
  } catch {
    // stockage indisponible (navigation privée) : on garde le français
  }
  return "fr";
}

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const setLang = (next) => {
      if (!LANGS.includes(next)) return;
      setLangState(next);
      try {
        window.localStorage.setItem("lang", next);
      } catch {
        // sans stockage, le choix vaut pour la visite en cours
      }
    };
    return { lang, setLang, s: site[lang] };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
