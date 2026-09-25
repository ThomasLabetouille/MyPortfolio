import { useLang } from "../context/LangContext";

export default function Skills() {
  const { t, tSkills } = useLang();
  const skills = tSkills();
  return (
    <>
      <style>{`
        .skills { padding: 7rem 2rem; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .skills-inner { max-width: 1100px; margin: 0 auto; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.2rem; margin-top: 3.5rem; }
        .skill-block { border: 1px solid var(--border); background: var(--surface); padding: 1.5rem; transition: border-color .2s; }
        .skill-block:hover { border-color: var(--border2); }
        .skill-cat { font-family: var(--font-mono); font-size: .65rem; letter-spacing: .15em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
        .skill-items { display: flex; flex-wrap: wrap; gap: .5rem; }
        .skill-item { font-family: var(--font-mono); font-size: .78rem; color: var(--text2); background: var(--bg3); border: 1px solid var(--border); padding: .35rem .85rem; transition: color .2s, border-color .2s; }
        .skill-item:hover { color: var(--text); border-color: var(--accent); }
      `}</style>
      <section className="skills" id="skills">
        <div className="skills-inner">
          <div className="section-label" style={{ fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--accent)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem" }}>
            <span style={{ color:"var(--text3)" }}>//</span> {t("skills_label")}
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:600,letterSpacing:"-.01em",lineHeight:1.1 }}>
            {t("skills_title").split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}
          </h2>
          <div className="skills-grid">
            {skills.map((s) => (
              <div className="skill-block" key={s.category}>
                <div className="skill-cat">{s.category}</div>
                <div className="skill-items">{s.items.map((item) => <span className="skill-item" key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
