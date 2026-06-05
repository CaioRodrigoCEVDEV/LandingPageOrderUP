import SectionTitle from "./SectionTitle.jsx";
import { PROCESS } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Process() {
  const [ref, visible] = useReveal();
  return (
    <section id="processo" className="section process" aria-labelledby="process-title">
      <div className="container">
        <SectionTitle
          eyebrow="Como trabalhamos"
          title={
            <>
              Um processo claro, do <span className="text-gradient">briefing à entrega</span>.
            </>
          }
          description="Cada projeto da OrderUp segue etapas bem definidas para garantir qualidade, prazo e alinhamento com o seu objetivo."
        />
        <ol ref={ref} className={`process__steps reveal ${visible ? "is-visible" : ""}`}>
          {PROCESS.map((step, i) => (
            <li
              key={step.step}
              className="process__step"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="process__number">{step.step}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__description">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
