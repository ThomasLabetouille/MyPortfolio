import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/portfolio";
import { projectsData } from "../data/projectsData";
import { useLang } from "../context/useLang";
import { IconBack, IconClose, IconExternal } from "./Icons";

// Les graphiques (PNG à fond clair) sont posés sur une planche claire ; les captures de jeu restent telles quelles.
function Zoomable({ src, alt, label, onOpen, eager = false }) {
  return (
    <button type="button" onClick={() => onOpen({ src, alt })} aria-label={`${label} : ${alt}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </button>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { lang, s } = useLang();
  // L'image agrandie est liée au projet affiché : changer de projet la referme.
  const [zoomed, setZoomed] = useState(null);
  const lightbox = zoomed?.id === id ? zoomed : null;
  const setLightbox = (img) => setZoomed(img ? { ...img, id } : null);

  const project = projects.find((p) => p.id === id);
  const text = projectsData[lang]?.[id] ?? projectsData.fr[id];
  const title = text?.title ?? project?.title;

  // Ordre de lecture identique à celui de la page d'accueil.
  const order = [...s.results.rows, ...s.tools.rows, ...s.games.rows];
  const index = order.findIndex((r) => r.id === id);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index >= 0 && index < order.length - 1 ? order[index + 1] : null;
  const flagship = s.results.rows.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (title) document.title = `${title} — Thomas Labetouille`;
  }, [title]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => e.key === "Escape" && setZoomed(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!project) {
    return (
      <main id="contenu" className="detail">
        <div className="wrap">
          <p className="lead">{s.detail.notFound}</p>
          <Link className="btn" to="/#projets"><IconBack />{s.detail.back}</Link>
        </div>
      </main>
    );
  }

  const sections = text?.sections ?? project.sections ?? [];
  const highlights = text?.highlights ?? project.highlights ?? [];
  const gallery = project.gallery ?? [];
  const status = project.status === "completed" ? s.status.completed : s.status.ongoing;

  const actions = (
    <div className="row">
      {project.githubUrl && (
        <a className="btn primary" href={project.githubUrl} target="_blank" rel="noreferrer">{s.detail.github}<IconExternal /></a>
      )}
      {project.demoUrl && (
        <a className="btn" href={project.demoUrl} target="_blank" rel="noreferrer">{s.detail.demo}<IconExternal /></a>
      )}
      {project.itchUrl && (
        <a className="btn" href={project.itchUrl} target="_blank" rel="noreferrer">{s.detail.itch}<IconExternal /></a>
      )}
    </div>
  );
  const hasActions = project.githubUrl || project.demoUrl || project.itchUrl;

  return (
    <main id="contenu" className="detail">
      <div className="wrap">
        <Link className="back" to="/#projets"><IconBack />{s.detail.back}</Link>

        <ul className="detail-meta">
          {text?.type && <li>{text.type}</li>}
          <li>{project.year}</li>
          <li>{status}</li>
        </ul>
        <h1>{title}</h1>
        <p className="detail-sub">{text?.subtitle ?? project.subtitle}</p>

        <section className="brief" aria-label={s.detail.summary}>
          <h2>{s.detail.summary}</h2>
          {flagship && (
            <div className="brief-grid">
              <span className="p-val">
                {flagship.value}
                {flagship.versus && <small>{flagship.versus}</small>}
              </span>
              <div>
                <p>{flagship.result}</p>
                {flagship.extra && <p>{flagship.extra}</p>}
              </div>
            </div>
          )}
          <dl className="facts" style={flagship ? undefined : { marginTop: 0, paddingTop: 0, borderTop: 0 }}>
            {text?.role && <div><dt>{s.detail.role}</dt><dd>{text.role}</dd></div>}
            <div><dt>{s.detail.engine}</dt><dd>{project.engine}</dd></div>
            <div><dt>{s.detail.year}</dt><dd>{project.year}</dd></div>
          </dl>
        </section>

        <p className="lead">{text?.description ?? project.description}</p>
        {hasActions && actions}

        {gallery.length === 0 && project.images?.[0] && (
          <figure className="fig cover">
            <img src={project.images[0]} alt={title} />
          </figure>
        )}

        {gallery.length > 0 && (
          <div className="gallery">
            {gallery.map((img, i) => {
              const caption = img.captionKey ? s.gallery[img.captionKey] ?? "" : img.caption ?? "";
              return (
                <figure className="fig" key={img.src}>
                  <Zoomable src={img.src} alt={caption || title} label={s.detail.zoom} onOpen={setLightbox} eager={i === 0} />
                  {caption && <figcaption><b>Fig. {i + 1}</b>{caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        )}

        {sections.map((sec) => (
          <section className="detail-sec" key={sec.title}>
            <h2>{sec.title}</h2>
            <p>{sec.text}</p>
            {sec.images?.length > 0 && (
              <div className="sec-imgs">
                {sec.images.map((src) => (
                  <Zoomable key={src} src={src} alt={sec.title} label={s.detail.zoom} onOpen={setLightbox} />
                ))}
              </div>
            )}
          </section>
        ))}

        {highlights.length > 0 && (
          <section className="built">
            <h2>{s.detail.highlights}</h2>
            <ul>{highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </section>
        )}

        <section className="tech">
          <h2>{s.detail.tech}</h2>
          <p>{project.tech.join(" · ")}</p>
        </section>

        {hasActions && actions}

        <nav className="pager" aria-label={s.detail.all}>
          {prev && (
            <Link to={`/project/${prev.id}`}>
              <small>{s.detail.prev}</small>
              <strong>{prev.name}</strong>
            </Link>
          )}
          {next && (
            <Link className="next" to={`/project/${next.id}`}>
              <small>{s.detail.next}</small>
              <strong>{next.name}</strong>
            </Link>
          )}
        </nav>
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" autoFocus aria-label={s.detail.close} onClick={() => setLightbox(null)}><IconClose /></button>
        </div>
      )}
    </main>
  );
}
