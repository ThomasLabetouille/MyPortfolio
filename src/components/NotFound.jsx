import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/useLang";
import { IconBack } from "./Icons";

export default function NotFound() {
  const { s } = useLang();

  useEffect(() => {
    document.title = `${s.detail.pageNotFound} — Thomas Labetouille`;
  }, [s]);

  return (
    <main id="contenu" className="detail">
      <div className="wrap">
        <p className="lead">{s.detail.pageNotFound}</p>
        <Link className="btn" to="/"><IconBack />{s.detail.backHome}</Link>
      </div>
    </main>
  );
}
