import Icon from "./Icon.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { DIFFERENTIALS } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Differentials() {
  const [ref, visible] = useReveal();
  return (
    <section className="section differentials" aria-labelledby="differentials-title">
      <div className="container">
        <SectionTitle
          eyebrow="Nossos diferenciais"
          title={
            <>
              Por que empresas escolhem a <span className="text-gradient">OrderUp</span>.
            </>
          }
          description="Combinamos tecnologia, proximidade e foco em resultado para entregar sistemas que realmente fazem diferença no seu dia a dia."
        />
        <ul ref={ref} className={`differentials__grid reveal ${visible ? "is-visible" : ""}`}>
          {DIFFERENTIALS.map((d, i) => (
            <li
              key={d.key}
              className="differential-card"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="differential-card__icon" aria-hidden="true">
                <Icon name={d.icon} size={20} />
              </span>
              <h3 className="differential-card__title">{d.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
