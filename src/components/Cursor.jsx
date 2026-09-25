import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px,${my}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.current?.classList.add("cursor-hover");
    const onLeave = () => ring.current?.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: -4px; left: -4px;
          width: 8px; height: 8px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none; z-index: 9999;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: -18px; left: -18px;
          width: 36px; height: 36px;
          border: 1.5px solid var(--accent);
          border-radius: 50%;
          pointer-events: none; z-index: 9998;
          will-change: transform;
          transition: width .2s, height .2s, top .2s, left .2s, border-color .2s, background .2s;
          opacity: 0.7;
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
        .cursor-ring.cursor-hover {
          width: 56px; height: 56px;
          top: -28px; left: -28px;
          border-color: var(--accent2);
          background: rgba(0,212,255,0.06);
        }
      `}</style>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}
