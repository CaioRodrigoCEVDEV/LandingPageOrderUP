const icons = {
  arrow: (
    <path
      d="M5 12h14M13 5l7 7-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  code: (
    <>
      <path
        d="M8 6 2 12l6 6M16 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  bolt: (
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  plug: (
    <>
      <path
        d="M9 2v4M15 2v4M7 6h10v6a5 5 0 0 1-5 5 5 5 0 0 1-5-5V6ZM12 17v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  cloud: (
    <path
      d="M17 18H7a4 4 0 0 1 0-8 6 6 0 0 1 11.6 1.5A4 4 0 0 1 17 18Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M9 21V9" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="m15.5 8.5-2 5-5 2 2-5 5-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  ),
  cart: (
    <>
      <path
        d="M3 4h2l2.4 11.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  headset: (
    <>
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="2" y="14" width="4" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="18" y="14" width="4" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-6M22 20H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  chat: (
    <path
      d="M21 12a8 8 0 1 1-3.6-6.7L21 4l-1 4.2A8 8 0 0 1 21 12Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  store: (
    <>
      <path d="M3 9 4 4h16l1 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M5 9v11h14V9M9 13a3 3 0 0 0 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  truck: (
    <>
      <path
        d="M3 7h11v9H3zM14 11h4l3 3v2h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  sparkles: (
    <>
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  device: (
    <>
      <rect x="2" y="5" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="9" width="6" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 5.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6M4 11.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  growth: (
    <>
      <path
        d="M3 20h18M5 16l5-6 4 3 6-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  check: (
    <path
      d="m5 12 4 4 10-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <path
      d="M20.5 3.5A10 10 0 0 0 3.6 17.4L2 22l4.7-1.5A10 10 0 1 0 20.5 3.5Zm-2.6 13.2c-.4 1.1-2.2 2-3 2.1-.8.1-1.7.2-5.5-1.2-4.6-1.7-7.5-6.5-7.7-6.8-.2-.3-1.8-2.5-1.8-4.7s1.1-3.3 1.6-3.7c.4-.4 1-.6 1.3-.6h.9c.3 0 .7-.1 1.1.8l1.5 3.6c.1.3.2.7 0 1-.2.3-.3.5-.6.8l-.7.8c-.2.2-.4.5-.2.9.3.5 1.2 2 2.6 3.2 1.8 1.5 3.3 2 3.7 2.2.5.2.8.2 1.1-.1.3-.3 1.1-1.3 1.4-1.8.3-.5.6-.4 1-.3.5.1 2.8 1.3 3.3 1.6.5.2.8.4.9.6.2.2.2 1.1-.2 2.2Z"
      fill="currentColor"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m3 7 9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
  close: (
    <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
  plus: (
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),
  spark: (
    <>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = "", strokeWidth }) {
  const node = icons[name];
  if (!node) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {node}
    </svg>
  );
}
