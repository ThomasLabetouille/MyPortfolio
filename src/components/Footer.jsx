import { useLang } from "../context/useLang";

export default function Footer() {
  const { s } = useLang();
  return (
    <footer className="footer">
      <div className="wrap">{s.footer}</div>
    </footer>
  );
}
