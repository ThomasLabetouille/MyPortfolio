import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LangProvider from "./context/LangProvider";
import { useLang } from "./context/useLang";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

// Les pages de détail (textes longs, FR et EN) ne se chargent que si on les ouvre.
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));

function Loading() {
  const { s } = useLang();
  return (
    <main id="contenu" className="wrap loading" aria-busy="true">
      <p>{s.detail.loading}</p>
    </main>
  );
}

function Shell() {
  const { s } = useLang();
  return (
    <>
      <a className="skip" href="#contenu">{s.nav.skip}</a>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}
