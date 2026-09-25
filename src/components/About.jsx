import { useLang } from "../context/LangContext";

export default function About() {
  const { t } = useLang();
  const cards = [
    { label: t("about_card1_label"), val: t("about_card1_val"), sub: t("about_card1_sub"), color: "#00d4ff" },
    { label: t("about_card2_label"), val: t("about_card2_val"), sub: t("about_card2_sub"), color: "#ff4d00" },
    { label: t("about_card3_label"), val: t("about_card3_val"), sub: t("about_card3_sub"), color: "#7b61ff" },
    { label: t("about_card4_label"), val: t("about_card4_val"), sub: t("about_card4_sub"), color: "#00d4ff" },
  ];
  return (
    <>
      <style>{`
        .about { padding: 7rem 2rem; max-width: 1100px; margin: 0 auto; }
        .section-label { font-family: var(--font-mono); font-size: .7rem; color: var(--accent); letter-spacing: .2em; text-transform: uppercase; margin-bottom: 1rem; display: flex; align-items: center; gap: .8rem; }
        .about .section-label::before { content: '//'; color: var(--text3); }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -.02em; line-height: 1.1; margin-bottom: 3.5rem; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .about-text p { font-family: var(--font-mono); font-size: .88rem; color: var(--text2); line-height: 1.9; font-weight: 300; margin-bottom: 1.5rem; }
        .about-text p strong { color: var(--text); font-weight: 500; }
        .about-cards { display: flex; flex-direction: column; gap: 1rem; }
        .about-card { padding: 1.5rem; border: 1px solid var(--border); background: var(--surface); position: relative; overflow: hidden; transition: border-color .2s; }
        .about-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--card-color, var(--accent)); }
        .about-card:hover { border-color: var(--border2); }
        .about-card-label { font-family: var(--font-mono); font-size: .65rem; color: var(--text3); letter-spacing: .15em; text-transform: uppercase; margin-bottom: .4rem; }
        .about-card-val { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: .3rem; }
        .about-card-sub { font-family: var(--font-mono); font-size: .75rem; color: var(--text2); }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }
      `}</style>
      <section className="about" id="about">
        <div className="section-label">{t("about_label")}</div>
        <h2 className="section-title">{t("about_title").split("\n").map((l,i) => <span key={i}>{l}{i===0&&<br/>}</span>)}</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
            <p>{t("about_p3")}</p>
            <p>{t("about_p4")}</p>
          </div>
          <div className="about-cards">
            {cards.map((c) => (
              <div className="about-card" key={c.label} style={{ "--card-color": c.color }}>
                <div className="about-card-label">{c.label}</div>
                <div className="about-card-val">{c.val}</div>
                <div className="about-card-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
