import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/useLang";
import { links } from "../data/site";
import Figure from "./Figure";
import { IconDownload, IconExternal } from "./Icons";

function CompactList({ rows, one = false }) {
  return (
    <ul className={one ? "list one" : "list"}>
      {rows.map((r) => (
        <li key={r.id}>
          <Link to={`/project/${r.id}`}>
            <span className="l-name">{r.name}</span>
            <span className="l-year">{r.year}</span>
            <span className="l-sub">{r.sub}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { s } = useLang();
  const { hash } = useLocation();

  useEffect(() => {
    document.title = s.meta.title;
  }, [s]);

  // Arrivée sur /#projets depuis une page de détail : on défile jusqu'à la section.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) el.scrollIntoView();
  }, [hash]);

  return (
    <main id="contenu">
      <section className="hero">
        <div className="wrap">
          <div>
            <ul className="status">
              {s.hero.status.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <h1>Thomas Labetouille</h1>
            <p className="role">{s.hero.role}</p>
            <p className="pitch">{s.hero.pitch}</p>
            <div className="ctas">
              <a className="btn primary" href="#projets">{s.hero.ctaResults}</a>
              <a className="btn" href={s.cvFile} target="_blank" rel="noreferrer">
                <IconDownload />{s.hero.ctaCv}
              </a>
            </div>
          </div>
          <Figure
            src="/images/drone-nav-estimation/real_flights_outages.png"
            width={1500}
            height={1080}
            alt={s.hero.figAlt}
            label={s.hero.figLabel}
            caption={s.hero.figCaption}
            trace
            eager
          />
        </div>
      </section>

      <section className="section" id="projets">
        <div className="wrap">
          <div className="sec-head">
            <h2>{s.results.title}</h2>
            <p>{s.results.lede}</p>
          </div>
          <table className="results">
            <caption className="sr-only">{s.results.title}</caption>
            <thead>
              <tr>
                <th scope="col" style={{ width: "24%" }}>{s.results.cols[0]}</th>
                <th scope="col" style={{ width: "30%" }}>{s.results.cols[1]}</th>
                <th scope="col" style={{ width: "26%" }}>{s.results.cols[2]}</th>
                <th scope="col">{s.results.cols[3]}</th>
              </tr>
            </thead>
            <tbody>
              {s.results.rows.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    <Link className="p-name" to={`/project/${r.id}`}>{r.name}</Link>
                    <span className="p-ctx">{r.ctx}</span>
                  </th>
                  <td className="p-what">{r.what}</td>
                  <td className="p-res">
                    <span className="p-val">
                      {r.value}
                      {r.versus && <small>{r.versus}</small>}
                    </span>
                    {r.result}
                    {r.extra && <span className="p-extra">{r.extra}</span>}
                  </td>
                  <td className="p-stack">
                    {r.tools.map((t) => <span key={t}>{t}</span>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="dive">
            <Figure
              src="/images/drone-nav-estimation/cpp_python_agreement.png"
              width={1500}
              height={570}
              alt={s.dive.figAlt}
              label={s.dive.figLabel}
              caption={<>{s.dive.figCaption[0]}<sup>{s.dive.figCaption[1]}</sup>{s.dive.figCaption[2]}</>}
            />
            <div>
              <h3>{s.dive.title}</h3>
              <p>{s.dive.text}</p>
              <ul>
                {s.dive.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="row">
                <Link className="btn sm" to="/project/drone-nav-estimation">{s.dive.read}</Link>
                <a className="btn sm" href={links.droneRepo} target="_blank" rel="noreferrer">
                  {s.dive.github}<IconExternal />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head"><h2>{s.tools.title}</h2></div>
          <CompactList rows={s.tools.rows} one />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>{s.games.title}</h2>
            <p>{s.games.lede}</p>
          </div>
          <CompactList rows={s.games.rows} />
        </div>
      </section>

      <section className="section" id="parcours">
        <div className="wrap">
          <div className="sec-head"><h2>{s.experience.title}</h2></div>
          <ol className="exp">
            {s.experience.rows.map((e) => (
              <li key={e.org}>
                <time>{e.period}</time>
                <div>
                  <h3>{e.role} · <span>{e.org}</span></h3>
                  <p>{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="competences">
        <div className="wrap">
          <div className="sec-head"><h2>{s.skills.title}</h2></div>
          <div className="skills">
            {s.skills.groups.map((g) => (
              <div key={g.name}>
                <h3>{g.name}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap">
          <div className="contact">
            <div>
              <h2>{s.contact.title}</h2>
              <p>{s.contact.text}</p>
            </div>
            <ul>
              <li><a href={`mailto:${links.email}`}>{links.email} <span>{s.contact.email}</span></a></li>
              <li><a href={links.linkedin} target="_blank" rel="noreferrer">thomas-labetouille <span>LinkedIn</span></a></li>
              <li><a href={links.github} target="_blank" rel="noreferrer">ThomasLabetouille <span>GitHub</span></a></li>
              <li><a href={s.cvFile} target="_blank" rel="noreferrer">{s.contact.cvValue} <span>{s.contact.cv}</span></a></li>
              <li><a href={links.freelance} target="_blank" rel="noreferrer">{s.contact.freelanceValue} <span>{s.contact.freelance}</span></a></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
