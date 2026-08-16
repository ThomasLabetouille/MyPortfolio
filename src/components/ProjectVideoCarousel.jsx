import { useRef, useState, useEffect } from "react";

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
    src: "/videos/LevelDesignTools_Demo.mp4",
  },
];

function formatTime(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ProjectVideoCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRefs = useRef([]);
  const barRef = useRef(null);
  const draggingRef = useRef(false);

  const activeVideo = () => videoRefs.current[index];

  const go = (dir) => {
    setIndex((prev) => {
      const next = (prev + dir + SLIDES.length) % SLIDES.length;
      const prevVideo = videoRefs.current[prev];
      if (prevVideo) prevVideo.pause();
      const v = videoRefs.current[next];
      if (v) {
        v.currentTime = 0;
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
      setCurrentTime(0);
      setDuration(v && !isNaN(v.duration) ? v.duration : 0);
      return next;
    });
  };

  const togglePlay = () => {
    const v = activeVideo();
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = (i) => (e) => {
    if (i !== index) return;
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (i) => (e) => {
    if (i !== index) return;
    setDuration(e.target.duration);
  };

  const seekToClientX = (clientX) => {
    const bar = barRef.current;
    const v = activeVideo();
    if (!bar || !v || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setCurrentTime(v.currentTime);
  };

  const handleBarMouseDown = (e) => {
    draggingRef.current = true;
    seekToClientX(e.clientX);
  };

  const handleBarTouchStart = (e) => {
    draggingRef.current = true;
    seekToClientX(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggingRef.current) seekToClientX(e.clientX);
    };
    const handleMouseUp = () => {
      draggingRef.current = false;
    };
    const handleTouchMove = (e) => {
      if (draggingRef.current) seekToClientX(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [duration, index]);

  const pct = duration ? (currentTime / duration) * 100 : 0;

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
        .vcarousel-video.active { opacity: 1; pointer-events: auto; cursor: pointer; }
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
        .vcarousel-controls {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 3;
          display: flex; align-items: center; gap: .75rem;
          padding: 1.5rem 1rem .6rem;
          background: linear-gradient(to top, rgba(8,10,15,0.85), rgba(8,10,15,0));
        }
        .vcarousel-playbtn {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          background: rgba(8,10,15,0.55); border: 1px solid var(--border2);
          color: var(--text); display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: .8rem; transition: border-color .2s, color .2s;
        }
        .vcarousel-playbtn:hover { border-color: var(--accent); color: var(--accent); }
        .vcarousel-time {
          font-size: .75rem; color: var(--text); opacity: .85;
          font-variant-numeric: tabular-nums; flex-shrink: 0; min-width: 2.6em; text-align: center;
          user-select: none;
        }
        .vcarousel-bar {
          position: relative; flex: 1; height: 16px; display: flex; align-items: center; cursor: pointer;
        }
        .vcarousel-bar::before {
          content: ""; position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);
          height: 4px; border-radius: 2px; background: rgba(255,255,255,0.22);
        }
        .vcarousel-bar-fill {
          position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          height: 4px; border-radius: 2px; background: var(--accent); pointer-events: none;
        }
        .vcarousel-bar-handle {
          position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%;
          background: var(--accent); transform: translate(-50%, -50%);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.25); pointer-events: none;
        }
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
              onTimeUpdate={handleTimeUpdate(i)}
              onLoadedMetadata={handleLoadedMetadata(i)}
              onClick={i === index ? togglePlay : undefined}
            />
          ))}
          <button className="vcarousel-arrow prev" onClick={() => go(-1)} aria-label="Vidéo précédente">‹</button>
          <button className="vcarousel-arrow next" onClick={() => go(1)} aria-label="Vidéo suivante">›</button>
          <div className="vcarousel-controls">
            <button
              className="vcarousel-playbtn"
              onClick={togglePlay}
              aria-label={playing ? "Mettre en pause" : "Lecture"}
            >
              {playing ? "❚❚" : "►"}
            </button>
            <span className="vcarousel-time">{formatTime(currentTime)}</span>
            <div
              className="vcarousel-bar"
              ref={barRef}
              onMouseDown={handleBarMouseDown}
              onTouchStart={handleBarTouchStart}
            >
              <div className="vcarousel-bar-fill" style={{ width: `${pct}%` }} />
              <div className="vcarousel-bar-handle" style={{ left: `${pct}%` }} />
            </div>
            <span className="vcarousel-time">{formatTime(duration)}</span>
          </div>
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
