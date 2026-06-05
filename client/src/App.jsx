import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Solutions from "./components/Solutions.jsx";
import Projects from "./components/Projects.jsx";
import Process from "./components/Process.jsx";
import Differentials from "./components/Differentials.jsx";
import CallToAction from "./components/CallToAction.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import Backdrop from "./components/Backdrop.jsx";

export default function App() {
  return (
    <>
      <Backdrop />
      <Header />
      <main id="inicio">
        <Hero />
        <About />
        <Solutions />
        <Projects />
        <Process />
        <Differentials />
        <CallToAction />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
