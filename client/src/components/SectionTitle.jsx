import { useReveal } from "../hooks/useReveal.js";

export default function SectionTitle({ eyebrow, title, description, align = "center" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`section-title section-title--${align} reveal ${visible ? "is-visible" : ""}`}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title__heading">{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </div>
  );
}
