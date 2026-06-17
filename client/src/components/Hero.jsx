import Icon from "./Icon.jsx";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../data/content.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Hero() {
  const [ref, visible] = useReveal();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div ref={ref} className={`hero__content reveal ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" /> Software House · Soluções Sob Medida
          </span>
          <h1 id="hero-title" className="hero__title">
            Desenvolvemos <span className="text-gradient">sistemas sob medida</span> para transformar ideias em soluções reais.
          </h1>
          <p className="hero__subtitle">
            A OrderUp cria plataformas web, sistemas internos, automações e integrações personalizadas
            para empresas que precisam de tecnologia eficiente, escalável e feita sob medida.
          </p>
          <div className="hero__actions">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                WHATSAPP_MESSAGE
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              <Icon name="whatsapp" size={18} /> Solicitar orçamento
            </a>
            <a href="#solucoes" onClick={(e) => handleScrollTo(e, "#solucoes")} className="btn btn--ghost btn--lg">
              Conhecer soluções <Icon name="arrow" size={18} />
            </a>
          </div>
          <ul className="hero__bullets" aria-label="Diferenciais rápidos">
            <li><Icon name="check" size={16} /> Sistemas web, SaaS e APIs</li>
            <li><Icon name="check" size={16} /> Automações e integrações</li>
            <li><Icon name="check" size={16} /> Atendimento direto e próximo</li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="visual visual--dashboard">
            <div className="visual__chrome">
              <span /><span /><span />
              <em>orderup · dashboard</em>
            </div>
            <div className="visual__body">
              <div className="visual__row">
                <div className="kpi">
                  <span>Pedidos hoje</span>
                  <strong>1.284</strong>
                  <em className="kpi__delta">+18%</em>
                </div>
                <div className="kpi kpi--alt">
                  <span>Conversão</span>
                  <strong>62,4%</strong>
                  <em className="kpi__delta kpi__delta--up">+4,1%</em>
                </div>
              </div>
              <div className="visual__chart">
                {[36, 58, 44, 72, 60, 84, 68, 92, 78, 96, 82, 110].map((h, i) => (
                  <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
                ))}
              </div>
              <div className="visual__legend">
                <span><i style={{ background: "var(--color-accent)" }} /> Vendas</span>
                <span><i style={{ background: "var(--color-accent-2)" }} /> Automações</span>
              </div>
            </div>
          </div>

          <div className="visual visual--code">
            <div className="visual__chrome visual__chrome--dark">
              <span /><span /><span />
              <em>orderup.api.ts</em>
            </div>
            <pre>
              <code>
                <span className="t-pink">const</span> <span className="t-cyan">orderup</span> = <span className="t-pink">await</span> <span className="t-yellow">createSystem</span>(&#123;{"\n"}
                {"  "}<span className="t-cyan">stack</span>: [<span className="t-green">"web"</span>, <span className="t-green">"saas"</span>, <span className="t-green">"api"</span>],{"\n"}
                {"  "}<span className="t-cyan">automations</span>: <span className="t-pink">true</span>,{"\n"}
                {"  "}<span className="t-cyan">integrations</span>: [<span className="t-green">"whatsapp"</span>, <span className="t-green">"erp"</span>],{"\n"}
                {"  "}<span className="t-cyan">delivery</span>: <span className="t-green">"on time · on budget"</span>{"\n"}
                &#125;);
              </code>
            </pre>
          </div>

          <div className="visual visual--flow">
            <div className="flow__node flow__node--a">
              <Icon name="store" size={18} /> ERP
            </div>
            <div className="flow__line" />
            <div className="flow__node flow__node--b">
              <Icon name="spark" size={16} /> OrderUp
            </div>
            <div className="flow__line" />
            <div className="flow__node flow__node--c">
              <Icon name="chat" size={18} /> WhatsApp
            </div>
            <div className="flow__line" />
            <div className="flow__node flow__node--d">
              <Icon name="cloud" size={18} /> Gateway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
