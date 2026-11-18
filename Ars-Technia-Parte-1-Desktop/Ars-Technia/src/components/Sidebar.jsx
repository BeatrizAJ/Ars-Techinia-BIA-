
import React from 'react';

const PROFESSOR_ITEMS = [
  { label: 'Início', page: 'home', icon: 'home' },
  { label: 'Solicitações', page: 'solicitacao', icon: 'clipboard' },
  { label: 'Perfil', page: 'profile', icon: 'user' },
];

const MANAGER_ITEMS = [
  { label: 'Início', page: 'homeManager', icon: 'home' },
  { label: 'Solicitações', page: 'solicitacaoGestao', icon: 'clipboard' },
  { label: 'Salas', page: 'cadastroSalas', icon: 'door' },
  { label: 'Perfil', page: 'profile', icon: 'user' },
];

function MenuIcon({ name }) {
  const common = {
    width: 21,
    height: 21,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v12h14V9" />
          <path d="M9 21v-7h6v7" />
        </svg>
      );

    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3h6v1" />
          <path d="M9 10h6M9 14h6M9 18h4" />
        </svg>
      );

    case 'door':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M9 3v18" />
          <circle cx="15" cy="12" r="0.8" fill="currentColor" />
        </svg>
      );

    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Sidebar({
  go,
  page,
  manager = false,
}) {
  const items = manager ? MANAGER_ITEMS : PROFESSOR_ITEMS;

  const isHome =
    page === 'home' || page === 'homeManager';

  return (
    <aside className="sidebar">
      <div className="menu-label">
        MENU PRINCIPAL
      </div>

      <nav aria-label="Menu principal">
        {items.map((item) => {
          const selected = item.label === 'Início'
            ? isHome
            : page === item.page ||
              (item.page === 'profile' && page === 'managerProfile');

          return (
            <button
              type="button"
              key={item.page}
              className={`nav-item${selected ? ' selected' : ''}`}
              onClick={() => go(item.page)}
              aria-current={selected ? 'page' : undefined}
            >
              <span className="icon">
                <MenuIcon name={item.icon} />
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="side-footer">
        <b>
          {manager ? 'Portal da gestão' : 'Portal do professor'}
        </b>

        <small>Versão Desktop</small>
      </div>
    </aside>
  );
}
