import Icon from "./Icon.jsx";
import { HIGHLIGHTS } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function About() {
  const [ref, visible] = useReveal();
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div ref={ref} className={`about__grid reveal ${visible ? "is-visible" : ""}`}>
          <div className="about__content">
            <span className="eyebrow">Sobre a OrderUp</span>
            <h2 id="about-title" className="section-title__heading">
              Um grupo de desenvolvimento focado em resolver{" "}
              <span className="text-gradient">problemas reais</span> de empresas.
            </h2>
            <p className="about__text">
              A OrderUp nasceu com o objetivo de desenvolver soluções digitais práticas, modernas e
              acessíveis para empresas que precisam automatizar processos, organizar operações e criar
              produtos digitais sob medida.
            </p>
            <p className="about__text">
              Atuamos como software house parceira do seu negócio: entendemos a sua operação,
              desenhamos a solução técnica ideal e entregamos sistemas confiáveis, evolutivos e
              prontos para crescer junto com você.
            </p>
            <a href="#solucoes" className="link-arrow">
              Conheça nossas soluções <Icon name="arrow" size={16} />
            </a>
          </div>
          <ul className="about__highlights" aria-label="Pilares da OrderUp">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h} style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="about__check" aria-hidden="true">
                  <Icon name="check" size={14} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
