import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { NAV_LINKS, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../data/content.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a
          href="#inicio"
          className="brand"
          onClick={(e) => handleNavClick(e, "#inicio")}
          aria-label="OrderUp — início"
        >
          <span className="brand__mark" aria-hidden="true">
            <Icon name="spark" size={18} />
          </span>
          <span className="brand__text">
            <strong>OrderUp</strong>
            <small>Software House</small>
          </span>
        </a>

        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={active === link.href ? "is-active" : ""}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm site-nav__cta-mobile"
          >
            <Icon name="whatsapp" size={18} />
            Solicitar Orçamento
          </a>
        </nav>

        <div className="site-header__actions">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm site-header__cta"
          >
            <Icon name="whatsapp" size={18} />
            Solicitar Orçamento
          </a>
          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="site-nav"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
