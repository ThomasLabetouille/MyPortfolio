import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { projects } from "../data/portfolio";
import { useLang } from "../context/LangContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState(null);
  const { t, tProject } = useLang();
  const pTr = tProject(id); // translated project data

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text2)", fontFamily: "var(--font-mono)" }}>Projet introuvable.</p>
        <Link to="/" style={{ color: "var(--accent)" }}>← Retour</Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];

  return (
    <>
      <style>{`
        .detail-page { min-height: 100vh; padding-top: 64px; }

        /* Hero */
        .detail-hero {
          padding: 4rem 2rem 3rem;
          max-width: 1100px; margin: 0 auto;
          border-bottom: 1px solid var(--border);
        }
        .detail-back {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: var(--font-mono); font-size: .72rem;
          color: var(--text3); letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 2rem; transition: color .2s;
        }
        .detail-back:hover { color: var(--accent); }
        .detail-badges { display: flex; gap: .6rem; flex-wrap: wrap; margin-bottom: 1.2rem; }
        .detail-badge {
          font-family: var(--font-mono); font-size: .62rem;
          letter-spacing: .1em; text-transform: uppercase;
          padding: .25rem .7rem;
        }
        .detail-badge-engine {
          background: var(--project-color, var(--accent));
          color: var(--bg); font-weight: 700;
        }
        .detail-badge-type {
          border: 1px solid var(--project-color, var(--accent));
          color: var(--project-color, var(--accent));
        }
        .detail-badge-year {
          border: 1px solid var(--border); color: var(--text3);
        }
        .detail-badge-completed { background: rgba(46,204,113,0.92); color: #0a2e1a; font-weight: 700; }
        .detail-badge-ongoing { background: rgba(255,176,32,0.92); color: #2a1800; font-weight: 700; }
        .detail-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 800; letter-spacing: -.03em; line-height: .95;
          margin-bottom: .6rem;
        }
        .detail-subtitle {
          font-family: var(--font-mono); font-size: .85rem;
          color: var(--project-color, var(--accent)); margin-bottom: 1.5rem;
        }
        .detail-desc {
          font-family: var(--font-mono); font-size: .88rem;
          color: var(--text2); line-height: 1.8; max-width: 680px;
          font-weight: 300;
        }
        .detail-meta-row {
          display: flex; gap: 2.5rem; margin-top: 2rem; flex-wrap: wrap;
        }
        .detail-meta-item .meta-label {
          font-family: var(--font-mono); font-size: .62rem;
          color: var(--text3); letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: .3rem;
        }
        .detail-meta-item .meta-val {
          font-size: .9rem; font-weight: 700; color: var(--text);
        }

        /* Body */
        .detail-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; }

        /* Main gallery */
        .detail-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem; margin-bottom: 4rem;
        }
        .detail-gallery-item {
          overflow: hidden; background: var(--surface);
          border: 1px solid var(--border); cursor: pointer;
          transition: border-color .2s, transform .2s; position: relative;
        }
        .detail-gallery-item:first-child {
          grid-column: 1 / -1;
        }
        .detail-gallery-item:hover { border-color: var(--border2); transform: translateY(-2px); }
        .detail-gallery-item img {
          width: 100%; display: block;
          transition: transform .4s;
          max-height: 480px; object-fit: cover;
        }
        .detail-gallery-item:first-child img { max-height: 520px; }
        .detail-gallery-item:hover img { transform: scale(1.03); }
        .detail-gallery-caption {
          padding: .6rem .9rem;
          font-family: var(--font-mono); font-size: .65rem;
          color: var(--text3); letter-spacing: .08em;
          border-top: 1px solid var(--border);
        }

        /* Sections */
        .detail-section { margin-bottom: 4rem; }
        .detail-section-title {
          font-size: 1.3rem; font-weight: 800; margin-bottom: .5rem;
          display: flex; align-items: center; gap: .8rem;
        }
        .detail-section-title::before {
          content: ''; width: 3px; height: 1.3rem;
          background: var(--project-color, var(--accent));
          display: block; flex-shrink: 0;
        }
        .detail-section-text {
          font-family: var(--font-mono); font-size: .82rem;
          color: var(--text2); line-height: 1.8; font-weight: 300;
          max-width: 680px; margin-bottom: 1.5rem;
        }
        .detail-section-imgs {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: .8rem;
        }
        .detail-section-imgs img {
          width: 100%; display: block;
          border: 1px solid var(--border);
          cursor: pointer; transition: transform .2s, border-color .2s;
        }
        .detail-section-imgs img:hover {
          transform: translateY(-2px); border-color: var(--border2);
        }

        /* Highlights */
        .detail-highlights { margin-bottom: 3rem; }
        .detail-highlights h3 {
          font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;
          color: var(--text3); font-family: var(--font-mono);
          letter-spacing: .05em; text-transform: uppercase; font-size: .72rem;
        }
        .detail-highlights ul { list-style: none; }
        .detail-highlights li {
          font-family: var(--font-mono); font-size: .82rem;
          color: var(--text2); line-height: 1.7;
          padding: .5rem 0 .5rem 1.2rem; position: relative;
          border-bottom: 1px solid var(--border);
        }
        .detail-highlights li::before {
          content: '▸'; position: absolute; left: 0;
          color: var(--project-color, var(--accent));
        }

        /* Tech tags */
        .detail-tech { margin-bottom: 3rem; }
        .detail-tech h3 {
          font-family: var(--font-mono); font-size: .72rem;
          color: var(--text3); letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: .8rem;
        }
        .detail-tech-tags { display: flex; flex-wrap: wrap; gap: .5rem; }
        .detail-tech-tag {
          font-family: var(--font-mono); font-size: .72rem;
          background: var(--surface); color: var(--text2);
          border: 1px solid var(--border); padding: .35rem .9rem;
          transition: border-color .2s, color .2s;
        }
        .detail-tech-tag:hover {
          border-color: var(--project-color, var(--accent));
          color: var(--text);
        }

        /* CTA */
        .detail-cta { margin-bottom: 4rem; display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--accent); color: var(--bg);
          border: none; padding: .85rem 2rem;
          font-family: var(--font-display); font-size: .8rem;
          letter-spacing: .12em; text-transform: uppercase; font-weight: 700;
          transition: transform .15s, box-shadow .15s; cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,255,0.35); }
        .btn-outline {
          background: transparent; color: var(--text);
          border: 1px solid var(--border2); padding: .85rem 2rem;
          font-family: var(--font-display); font-size: .8rem;
          letter-spacing: .12em; text-transform: uppercase;
          transition: border-color .2s, color .2s; cursor: pointer;
        }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        /* Nav between projects */
        .detail-nav {
          border-top: 1px solid var(--border);
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--border);
        }
        .detail-nav-item {
          background: var(--bg2); padding: 1.5rem 2rem;
          transition: background .2s;
        }
        .detail-nav-item:hover { background: var(--surface); }
        .detail-nav-label {
          font-family: var(--font-mono); font-size: .62rem;
          color: var(--text3); letter-spacing: .12em; text-transform: uppercase;
          margin-bottom: .4rem;
        }
        .detail-nav-title { font-size: 1rem; font-weight: 700; color: var(--text); }
        .detail-nav-item.next { text-align: right; }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.92);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .lightbox-img {
          max-width: 90vw; max-height: 88vh;
          object-fit: contain; cursor: default;
          border: 1px solid var(--border);
        }
        .lightbox-close {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: none; border: 1px solid var(--border);
          color: var(--text); width: 40px; height: 40px;
          font-size: 1.1rem; cursor: pointer;
          transition: border-color .2s;
        }
        .lightbox-close:hover { border-color: var(--accent); color: var(--accent); }

        @media (max-width: 768px) {
          .detail-gallery { grid-template-columns: 1fr; }
          .detail-gallery-item:first-child { grid-column: auto; }
          .detail-nav { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="detail-page" style={{ "--project-color": project.color }}>
        {/* Hero */}
        <div className="detail-hero">
          <Link to="/#projects" className="detail-back">{t("detail_back")}</Link>
          <div className="detail-badges">
            <span className="detail-badge detail-badge-engine">{project.engine}</span>
            {pTr?.type && <span className="detail-badge detail-badge-type">{pTr.type}</span>}
            <span className="detail-badge detail-badge-year">{project.year}</span>
            <span className={`detail-badge detail-badge-${project.status}`}>
              {project.status === "completed" ? t("status_completed") : t("status_ongoing")}
            </span>
          </div>
          <h1 className="detail-title">{pTr?.title ?? project.title}</h1>
          <div className="detail-subtitle">{pTr?.subtitle ?? project.subtitle}</div>
          <p className="detail-desc">{pTr?.description ?? project.description}</p>
          <div className="detail-meta-row">
            {pTr?.role && (
              <div className="detail-meta-item">
                <div className="meta-label">{t("detail_role")}</div>
                <div className="meta-val">{pTr?.role}</div>
              </div>
            )}
            <div className="detail-meta-item">
              <div className="meta-label">{t("detail_engine")}</div>
              <div className="meta-val">{project.engine}</div>
            </div>
            <div className="detail-meta-item">
              <div className="meta-label">{t("detail_year")}</div>
              <div className="meta-val">{project.year}</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="detail-body">

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="detail-gallery">
              {project.gallery.map((img, i) => {
                const caption = img.captionKey ? t(img.captionKey) : img.caption;
                return (
                  <div className="detail-gallery-item" key={i} onClick={() => setLightbox(img.src)}>
                    <img src={img.src} alt={caption} loading="lazy" />
                    <div className="detail-gallery-caption">{caption}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sections */}
          {(pTr?.sections ?? project.sections ?? []).map((sec, i) => (
            <div className="detail-section" key={i}>
              <h2 className="detail-section-title">{sec.title}</h2>
              <p className="detail-section-text">{sec.text}</p>
              {sec.images && sec.images.length > 0 && (
                <div className="detail-section-imgs">
                  {sec.images.map((src, j) => (
                    <img key={j} src={src} alt={sec.title} loading="lazy" onClick={() => setLightbox(src)} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Highlights */}
          <div className="detail-highlights">
            <h3>{t("detail_highlights")}</h3>
            <ul>
              {(pTr?.highlights ?? project.highlights).map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>

          {/* Tech */}
          <div className="detail-tech">
            <h3>{t("detail_tech")}</h3>
            <div className="detail-tech-tags">
              {project.tech.map((t) => <span className="detail-tech-tag" key={t}>{t}</span>)}
            </div>
          </div>

          {/* CTA */}
          <div className="detail-cta">
            {project.itchUrl && (
              <a className="btn-primary" href={project.itchUrl} target="_blank" rel="noreferrer">
                {t("detail_itch")}
              </a>
            )}
            <Link to="/#projects" className="btn-outline">{t("detail_all")}</Link>
          </div>
        </div>

        {/* Project navigation */}
        <div className="detail-nav">
          {prev ? (
            <Link to={`/project/${prev.id}`} className="detail-nav-item">
              <div className="detail-nav-label">{t("detail_prev")}</div>
              <div className="detail-nav-title">{prev.title}</div>
            </Link>
          ) : <div className="detail-nav-item" />}
          {next ? (
            <Link to={`/project/${next.id}`} className="detail-nav-item next">
              <div className="detail-nav-label">{t("detail_next")}</div>
              <div className="detail-nav-title">{next.title}</div>
            </Link>
          ) : <div className="detail-nav-item" />}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <img className="lightbox-img" src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </>
  );
}
