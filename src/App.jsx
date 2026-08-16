import { Routes, Route } from "react-router-dom";
import "./index.css";
import { LangProvider } from "./context/LangContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectVideoCarousel from "./components/ProjectVideoCarousel";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";

function Home() {
  return (
    <>
      <Hero />
      <ProjectVideoCarousel />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </LangProvider>
  );
}
