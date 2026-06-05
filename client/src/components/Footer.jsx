import Icon from "./Icon.jsx";
import { CONTACT_EMAIL, NAV_LINKS, WHATSAPP_NUMBER } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <a href="#inicio" className="brand brand--footer" aria-label="OrderUp — início">
            <span className="brand__mark" aria-hidden="true">
              <Icon name="spark" size={18} />
            </span>
            <span className="brand__text">
              <strong>OrderUp</strong>
              <small>Software House</small>
            </span>
          </a>
          <p className="site-footer__text">
            Desenvolvemos sistemas sob medida, automações e integrações para empresas que precisam
            de tecnologia eficiente, escalável e feita para o seu negócio.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Links rápidos">
          <h3>Links rápidos</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h3>Contato</h3>
          <ul className="site-footer__contact">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__contact-link"
              >
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <Icon name="whatsapp" size={16} />
                </span>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer__contact-link">
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <Icon name="mail" size={16} />
                </span>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href="https://orderup.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__contact-link"
              >
                <span className="site-footer__contact-icon" aria-hidden="true">
                  <Icon name="compass" size={16} />
                </span>
                orderup.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} OrderUp. Todos os direitos reservados.</p>
        <p className="site-footer__signature">
          Feito com tecnologia pela <strong>OrderUp</strong> · software house
        </p>
      </div>
    </footer>
  );
}
