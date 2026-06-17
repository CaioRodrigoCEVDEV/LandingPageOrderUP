import { useState } from "react";
import Icon from "./Icon.jsx";
import { PROJECT_TYPES, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

const initialState = {
  nome: "",
  empresa: "",
  whatsapp: "",
  email: "",
  tipo: "",
  descricao: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [feedback, setFeedback] = useState(null);
  const [ref, visible] = useReveal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      WHATSAPP_MESSAGE,
      "",
      `Nome: ${form.nome || "—"}`,
      `Empresa: ${form.empresa || "—"}`,
      `WhatsApp: ${form.whatsapp || "—"}`,
      `E-mail: ${form.email || "—"}`,
      `Tipo de projeto: ${form.tipo || "—"}`,
      "",
      "Descrição da necessidade:",
      form.descricao || "—",
    ];
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setFeedback({
      type: "success",
      message: "Abrimos o WhatsApp com a sua mensagem pronta para envio.",
    });
  };

  return (
    <section id="contato" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__container">
        <div ref={ref} className={`contact__intro reveal ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">Contato</span>
          <h2 id="contact-title" className="section-title__heading">
            Solicite um orçamento <span className="text-gradient">sem compromisso</span>.
          </h2>
          <p className="contact__text">
            Preencha o formulário com os dados do seu projeto. Ao enviar, preparamos uma mensagem
            completa no WhatsApp para conversarmos sobre a sua necessidade.
          </p>
          <ul className="contact__list">
            <li>
              <span className="contact__list-icon"><Icon name="check" size={14} /></span>
              Resposta rápida em horário comercial
            </li>
            <li>
              <span className="contact__list-icon"><Icon name="check" size={14} /></span>
              Briefing técnico sem custo
            </li>
            <li>
              <span className="contact__list-icon"><Icon name="check" size={14} /></span>
              Proposta personalizada por etapa
            </li>
          </ul>
        </div>

        <form
          className={`contact__form reveal ${visible ? "is-visible" : ""}`}
          onSubmit={handleSubmit}
          aria-label="Formulário de solicitação de orçamento"
        >
          <div className="form-grid">
            <label className="field">
              <span>Nome</span>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span>Empresa</span>
              <input
                type="text"
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                placeholder="Nome da empresa"
                autoComplete="organization"
              />
            </label>
            <label className="field">
              <span>WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
                autoComplete="tel"
                inputMode="tel"
              />
            </label>
            <label className="field">
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="voce@empresa.com.br"
                required
                autoComplete="email"
              />
            </label>
            <label className="field field--full">
              <span>Tipo de projeto</span>
              <select name="tipo" value={form.tipo} onChange={handleChange} required>
                <option value="" disabled>Selecione uma opção</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="Outro">Outro</option>
              </select>
            </label>
            <label className="field field--full">
              <span>Descrição da necessidade</span>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows={5}
                placeholder="Conte rapidamente o que você precisa, objetivos e prazo ideal."
                required
              />
            </label>
          </div>
          {feedback ? (
            <p className={`form-feedback form-feedback--${feedback.type}`} role="status">
              {feedback.message}
            </p>
          ) : null}
          <button type="submit" className="btn btn--primary btn--lg btn--block">
            <Icon name="whatsapp" size={18} /> Enviar solicitação
          </button>
          <p className="form-terms">
            Ao enviar, você concorda com o uso dos dados para fins de contato comercial referente à
            sua solicitação.
          </p>
        </form>
      </div>
    </section>
  );
}
