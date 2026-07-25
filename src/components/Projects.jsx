import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/portfolio";
import { useLang } from "../context/LangContext";

const FILTER_KEYS = ["Tous", "UE5", "Unity", "Simulation"];

export default function Projects() {
  const [active, setActive] = useState("Tous");
  const [expanded, setExpanded] = useState(null);
  const { t, tProject } = useLang();

  const filters = FILTER_KEYS.map(k => k === "Tous" ? { key: k, label: t("proj_filter_all") } : { key: k, label: k });

  const filtered = active === "Tous"
    ? projects
    : projects.filter((p) => p.category === active || p.tags.includes(active));

  return (
    <>
      <style>{`
        .projects { padding: 7rem 2rem; max-width: 1200px; margin: 0 auto; }
        .filter-bar { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .filter-btn {
          background: transparent; border: 1px solid var(--border);
          color: var(--text3); padding: .45rem 1.1rem;
          font-family: var(--font-mono); font-size: .72rem;
          letter-spacing: .1em; text-transform: uppercase; transition: all .2s;
        }
        .filter-btn.active, .filter-btn:hover {
          border-color: var(--accent); color: var(--accent);
          background: rgba(0,212,255,0.05);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(520px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          border: 1px solid var(--border); background: var(--surface);
          position: relative; overflow: hidden;
          transition: border-color .25s, transform .2s;
          cursor: pointer;
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--card-color, var(--accent));
          transform: scaleX(0); transform-origin: left; transition: transform .3s;
        }
        .project-card:hover { border-color: var(--border2); transform: translateY(-2px); }
        .project-card:hover::before { transform: scaleX(1); }

        /* Image area */
        .project-img {
          width: 100%; height: 220px; overflow: hidden;
          background: var(--bg3); position: relative;
        }
        .project-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .4s; display: block;
        }
        .project-card:hover .project-img img { transform: scale(1.04); }
        .project-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-mono); font-size: .75rem;
          color: var(--text3); letter-spacing: .1em;
          border-bottom: 1px solid var(--border);
        }
        .project-img-placeholder span {
          border: 1px dashed var(--border2);
          padding: .5rem 1rem;
        }

        /* Featured card */
        .project-card.featured {
          grid-column: 1 / -1;
          border-color: rgba(0,212,255,0.3);
          background: linear-gradient(135deg, var(--surface) 0%, rgba(0,212,255,0.04) 100%);
        }
        .project-card.featured .project-img { height: 280px; }
        .project-featured-label {
          position: absolute; top: .75rem; right: .75rem;
          font-family: var(--font-mono); font-size: .6rem;
          letter-spacing: .12em; text-transform: uppercase;
          background: rgba(123,97,255,0.9); color: #fff;
          padding: .25rem .7rem; backdrop-filter: blur(4px);
        }

        /* Badge overlay on image */
        .project-img-badges {
          position: absolute; top: .75rem; left: .75rem;
          display: flex; gap: .4rem;
        }
        .project-engine-badge {
          font-family: var(--font-mono); font-size: .6rem;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--bg); background: var(--card-color, var(--accent));
          padding: .2rem .55rem; font-weight: 700;
        }
        .project-year-badge {
          font-family: var(--font-mono); font-size: .6rem;
          letter-spacing: .08em; color: var(--text);
          background: rgba(0,0,0,0.7); padding: .2rem .55rem;
          backdrop-filter: blur(4px);
        }
        .project-status-badge {
          font-family: var(--font-mono); font-size: .6rem;
          letter-spacing: .08em; padding: .2rem .55rem;
          backdrop-filter: blur(4px); font-weight: 700;
        }
        .project-status-completed { color: #0a2e1a; background: rgba(46,204,113,0.92); }
        .project-status-ongoing { color: #2a1800; background: rgba(255,176,32,0.92); }

        /* Card body */
        .project-body { padding: 1.5rem; }
        .project-meta {
          display: flex; gap: .6rem; align-items: center;
          margin-bottom: .5rem; flex-wrap: wrap;
        }
        .project-role-tag {
          font-family: var(--font-mono); font-size: .62rem;
          color: var(--text3); letter-spacing: .08em;
          background: var(--bg3); border: 1px solid var(--border);
          padding: .15rem .5rem;
        }
        .project-type-tag {
          font-family: var(--font-mono); font-size: .62rem;
          color: var(--card-color, var(--accent)); letter-spacing: .08em;
        }
        .project-title {
          font-size: 1.3rem; font-weight: 800; margin-bottom: .2rem;
          letter-spacing: -.01em;
        }
        .project-subtitle {
          font-family: var(--font-mono); font-size: .72rem;
          color: var(--text3); margin-bottom: .85rem;
        }
        .project-desc {
          font-family: var(--font-mono); font-size: .78rem;
          color: var(--text2); line-height: 1.75; font-weight: 300;
          margin-bottom: 1.2rem;
        }

        /* Expand toggle */
        .project-expand-btn {
          background: none; border: 1px solid var(--border);
          color: var(--text3); font-family: var(--font-mono);
          font-size: .65rem; letter-spacing: .1em; text-transform: uppercase;
          padding: .35rem .8rem; transition: all .2s; margin-bottom: 1rem;
        }
        .project-expand-btn:hover { border-color: var(--accent); color: var(--accent); }

        /* Expanded details */
        .project-details { border-top: 1px solid var(--border); padding-top: 1rem; }
        .project-highlights { margin-bottom: 1rem; }
        .project-highlights li {
          font-family: var(--font-mono); font-size: .72rem;
          color: var(--text2); line-height: 1.7;
          padding-left: 1rem; position: relative;
          margin-bottom: .3rem; list-style: none;
        }
        .project-highlights li::before {
          content: '▸'; position: absolute; left: 0;
          color: var(--card-color, var(--accent)); font-size: .6rem; top: .15rem;
        }

        .project-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1rem; }
        .project-tag {
          font-family: var(--font-mono); font-size: .63rem;
          letter-spacing: .06em; background: var(--bg3); color: var(--text3);
          padding: .22rem .6rem; border: 1px solid var(--border);
        }
        .project-itch {
          display: inline-flex; align-items: center; gap: .4rem;
          font-family: var(--font-mono); font-size: .68rem;
          color: var(--card-color, var(--accent)); letter-spacing: .06em;
          border: 1px solid var(--card-color, var(--accent));
          padding: .3rem .8rem; transition: background .2s, color .2s;
        }
        .project-itch:hover {
          background: var(--card-color, var(--accent)); color: var(--bg);
        }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
          .project-img { height: 180px; }
        }
      `}</style>
      <section className="projects" id="projects">
        <div className="section-label" style={{ fontFamily:"var(--font-mono)",fontSize:".7rem",color:"var(--accent)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".8rem" }}>
          <span style={{ color:"var(--text3)" }}>//</span> {t("proj_label")}
        </div>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,letterSpacing:"-.02em",lineHeight:1.1,marginBottom:"3rem" }}>
          {t("proj_title").split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}
        </h2>
        <div className="filter-bar">
          {filters.map((f) => (
            <button key={f.key} className={`filter-btn${active===f.key?" active":""}`} onClick={()=>setActive(f.key)}>{f.label}</button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((p) => (
            <div
              className={`project-card`}
              key={p.id}
              style={{ "--card-color": p.color }}
            >
              {/* Image */}
              <div className="project-img">
                {p.images && p.images.length > 0
                  ? <img src={p.images[0]} alt={p.title} loading="lazy" />
                  : p.id === "claude-ue5"
                    ? (
                      <div className="project-img-placeholder" style={{ background: "var(--bg3)", flexDirection:"column", gap:"1rem" }}>
                        <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.1rem", color:"var(--accent)", letterSpacing:".05em" }}>MCP · C++ · Python</div>
                        <div style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--text3)", letterSpacing:".15em", textAlign:"center", lineHeight:1.8 }}>
                          Claude AI ←→ UE5<br/>Remote Execution API<br/>Behavior Trees · AI Perception
                        </div>
                      </div>
                    )
                  : <div className="project-img-placeholder"><span>{t("proj_placeholder")}</span></div>
                }
                {p.id === "claude-ue5" && (
                  <div className="project-featured-label">{t("proj_featured")}</div>
                )}
                <div className="project-img-badges">
                  <span className="project-engine-badge">{p.engine}</span>
                  {p.id === "claude-ue5" && (
                    <span className="project-engine-badge" style={{ background: "#7b61ff" }}>Claude AI</span>
                  )}
                  <span className="project-year-badge">{p.year}</span>
                  <span className={`project-status-badge project-status-${p.status}`}>
                    {p.status === "completed" ? t("status_completed") : t("status_ongoing")}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="project-body">
                {(() => { const pTr = tProject(p.id); return (<>
                <div className="project-meta">
                  {pTr.role && <span className="project-role-tag">{pTr.role}</span>}
                  {pTr.type && <span className="project-type-tag">/ {pTr.type}</span>}
                </div>
                <div className="project-title">{pTr.title}</div>
                <div className="project-subtitle">{pTr.subtitle}</div>
                <div className="project-desc">{pTr.description}</div>

                <div style={{ display:"flex", gap:".6rem", flexWrap:"wrap", marginBottom:"1rem" }}>
                  <button
                    className="project-expand-btn"
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                  >
                    {expanded === p.id ? t("proj_details_close") : t("proj_details")}
                  </button>
                  {(p.gallery?.length > 0 || p.sections?.length > 0) && (
                    <Link
                      to={`/project/${p.id}`}
                      className="project-expand-btn"
                      style={{ borderColor: "var(--card-color)", color: "var(--card-color)" }}
                    >
                      {t("proj_see")}
                    </Link>
                  )}
                </div>

                {expanded === p.id && (
                  <div className="project-details">
                    <ul className="project-highlights">
                      {pTr.highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                    <div className="project-tags">
                      {p.tech.map((tech) => <span className="project-tag" key={tech}>{tech}</span>)}
                    </div>
                    {p.itchUrl && (
                      <a className="project-itch" href={p.itchUrl} target="_blank" rel="noreferrer">
                        {t("detail_itch")}
                      </a>
                    )}
                  </div>
                )}
                </>); })()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
