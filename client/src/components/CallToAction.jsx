import Icon from "./Icon.jsx";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function CallToAction() {
  const [ref, visible] = useReveal();
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="container">
        <div ref={ref} className={`cta__card reveal ${visible ? "is-visible" : ""}`}>
          <div className="cta__content">
            <span className="eyebrow">Vamos juntos</span>
            <h2 id="cta-title" className="cta__title">
              Tire sua ideia do papel com a <span className="text-gradient">OrderUp</span>.
            </h2>
            <p className="cta__text">
              Conte para nós o que você precisa. Podemos transformar sua necessidade em um sistema
              moderno, prático e feito sob medida para o seu negócio.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              WHATSAPP_MESSAGE
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg cta__btn"
          >
            <Icon name="whatsapp" size={18} /> Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
