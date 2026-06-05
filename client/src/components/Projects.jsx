import Icon from "./Icon.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { PROJECTS } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Projects() {
  const [ref, visible] = useReveal();
  return (
    <section id="projetos" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionTitle
          eyebrow="Tipos de projetos"
          title={
            <>
              Sistemas que <span className="text-gradient">podemos construir</span> para a sua empresa.
            </>
          }
          description="A OrderUp desenvolve diferentes tipos de sistemas digitais personalizados, sempre de acordo com a necessidade do cliente."
        />
        <ul ref={ref} className={`projects__grid reveal ${visible ? "is-visible" : ""}`}>
          {PROJECTS.map((p, i) => (
            <li
              key={p.key}
              className="project-card"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="project-card__icon" aria-hidden="true">
                <Icon name={p.icon} size={22} />
              </span>
              <div>
                <h3 className="project-card__title">{p.title}</h3>
                <span className="project-card__tag">{p.tag}</span>
              </div>
              <span className="project-card__plus" aria-hidden="true">
                <Icon name="plus" size={16} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
