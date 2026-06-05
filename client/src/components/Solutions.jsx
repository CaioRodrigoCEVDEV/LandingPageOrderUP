import Icon from "./Icon.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { SOLUTIONS } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Solutions() {
  const [ref, visible] = useReveal();
  return (
    <section id="solucoes" className="section solutions" aria-labelledby="solutions-title">
      <div className="container">
        <SectionTitle
          eyebrow="O que entregamos"
          title={
            <>
              Soluções <span className="text-gradient">completas em tecnologia</span> para o seu negócio.
            </>
          }
          description="Da prototipação à entrega, atuamos em todas as camadas do desenvolvimento: front-end, back-end, integrações, automações e infraestrutura."
        />
        <ul ref={ref} className={`solutions__grid reveal ${visible ? "is-visible" : ""}`}>
          {SOLUTIONS.map((s, i) => (
            <li
              key={s.key}
              className="solution-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="solution-card__icon" aria-hidden="true">
                <Icon name={s.icon} size={22} />
              </span>
              <h3 className="solution-card__title">{s.title}</h3>
              <p className="solution-card__description">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
