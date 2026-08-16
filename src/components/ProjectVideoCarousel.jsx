import { useRef, useState } from "react";

const SLIDES = [
  {
    id: "hovergame",
    title: "Pilotage Anti-gravité",
    subtitle: "HoverGame — Unreal Engine 5.8",
    src: "/videos/hovergame_hero.mp4",
  },
  {
    id: "horrorgame",
    title: "IA de Poursuite",
    subtitle: "HorrorGame — Unreal Engine 5.7",
    src: "/videos/horrorgame_hero.mp4",
  },
  {
    id: "leveldesigntools",
    title: "Outils de Level Design",
    subtitle: "RPG_Test — Panneau no-code C++/Slate",
    src: "/videos/leveldesigntools_hero.mp4",
  },
];

export default function ProjectVideoCarousel() {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef([]);

  const go = (dir) => {
    setIndex((prev) => {
      const next = (prev + dir + SLIDES.length) % SLIDES.length;
      const prevVideo = videoRefs.current[prev];
      if (prevVideo) prevVideo.pause();
      const v = videoRefs.current[next];
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      return next;
    });
  };

  return (
    <>
      <style>{`
        .vcarousel { position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 5rem; }
        .vcarousel-frame {
          position: relative; width: 100%; aspect-ratio: 16 / 9;
          overflow: hidden; background: var(--bg3);
          border: 1px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .vcarousel-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; opacity: 0; transition: opacity .4s ease;
          pointer-events: none;
        }
        .vcarousel-video.active { opacity: 1; pointer-events: auto; }
        .vcarousel-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(8,10,15,0.55); backdrop-filter: blur(6px);
          border: 1px solid var(--border2); color: var(--text);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 2; transition: border-color .2s, color .2s, background .2s;
          font-size: 1.2rem; user-select: none;
        }
        .vcarousel-arrow:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.12); }
        .vcarousel-arrow.prev { left: 1rem; }
        .vcarousel-arrow.next { right: 1rem; }
        .vcarousel-dots {
          display: flex; justify-content: center; gap: .5rem;
          margin-top: 1.25rem;
        }
        .vcarousel-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border2); border: none; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .vcarousel-dot.active { background: var(--accent); transform: scale(1.3); }
        @media (max-width: 640px) {
          .vcarousel { padding: 1rem 1rem 3rem; }
          .vcarousel-arrow { width: 38px; height: 38px; font-size: 1rem; }
        }
      `}</style>
      <div className="vcarousel">
        <div className="vcarousel-frame">
          {SLIDES.map((s, i) => (
            <video
              key={s.id}
              ref={(el) => (videoRefs.current[i] = el)}
              className={`vcarousel-video${i === index ? " active" : ""}`}
              src={s.src}
              muted
              loop
              playsInline
              autoPlay={i === 0}
              preload="metadata"
              aria-label={s.title}
            />
          ))}
          <button className="vcarousel-arrow prev" onClick={() => go(-1)} aria-label="Vidéo précédente">‹</button>
          <button className="vcarousel-arrow next" onClick={() => go(1)} aria-label="Vidéo suivante">›</button>
        </div>
        <div className="vcarousel-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`vcarousel-dot${i === index ? " active" : ""}`}
              onClick={() => go(i - index)}
              aria-label={`Aller à ${s.title}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
