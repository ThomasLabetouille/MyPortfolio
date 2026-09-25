import { useLang } from "../context/LangContext";

export default function Experience() {
  const { t, tExperience } = useLang();
  const experience = tExperience();
  return (
    <>
      <style>{`
        .experience { padding: 7rem 2rem; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .experience-inner { max-width: 1100px; margin: 0 auto; }
        .timeline { position: relative; margin-top: 3.5rem; padding-left: 2rem; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: var(--border); }
        .timeline-item { position: relative; padding-bottom: 3rem; }
        .timeline-item:last-child { padding-bottom: 0; }
        .timeline-dot { position: absolute; left: -2.45rem; top: .35rem; width: 10px; height: 10px; border-radius: 50%; background: var(--item-color, var(--accent)); box-shadow: 0 0 12px var(--item-color, var(--accent)); }
        .timeline-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: .6rem; flex-wrap: wrap; }
        .timeline-period { font-family: var(--font-mono); font-size: .7rem; color: var(--text3); letter-spacing: .08em; }
        .timeline-badge { font-family: var(--font-mono); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; padding: .2rem .6rem; border: 1px solid var(--item-color, var(--accent)); color: var(--item-color, var(--accent)); }
        .timeline-domain { font-family: var(--font-mono); font-size: .7rem; color: var(--text3); }
        .timeline-role { font-size: 1.3rem; font-weight: 700; margin-bottom: .25rem; }
        .timeline-company { font-size: 1rem; color: var(--item-color, var(--accent)); font-weight: 600; margin-bottom: .8rem; }
        .timeline-desc { font-family: var(--font-mono); font-size: .95rem; color: var(--text2); line-height: 1.75; max-width: 680px; font-weight: 300; }
      `}</style>
      <section className="experience" id="experience">
        <div className="experience-inner">
          <div className="section-label" style={{ fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--accent)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem" }}>
            <span style={{ color:"var(--text3)" }}>//</span> {t("exp_label")}
          </div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:600,letterSpacing:"-.01em",lineHeight:1.1 }}>
            {t("exp_title").split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}
          </h2>
          <div className="timeline">
            {experience.map((e) => (
              <div className="timeline-item" key={e.company} style={{ "--item-color": e.color }}>
                <div className="timeline-dot" />
                <div className="timeline-meta">
                  <span className="timeline-period">{e.period}</span>
                  <span className="timeline-badge">{e.type}</span>
                  <span className="timeline-domain">{e.domain}</span>
                </div>
                <div className="timeline-role">{e.role}</div>
                <div className="timeline-company">{e.company}</div>
                <div className="timeline-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
