import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Packages from "./components/Packages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Navbar />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Packages />
      <Contact />
      <Footer />
    </>
  );
}
