
import React from 'react';

const ASSETS = '/assets/';

export default function Header({
  go,
  manager = false,
  role,
  profilePhoto = '',
}) {
  const userRole = role || (manager ? 'GESTÃO' : 'PROFESSOR');

  const homePage = manager ? 'homeManager' : 'home';

  const notificationsPage = manager
    ? 'solicitacaoGestao'
    : 'solicitacao';

  const photo = profilePhoto || `${ASSETS}PerfilAzul.png`;

  return (
    <header className="topbar">

      <button
        type="button"
        className="brand"
        onClick={() => go(homePage)}
        aria-label="Ir para a página inicial"
      >
        <img src={`${ASSETS}Logo.png`} alt="Ars-Technia" />

        <span>
          <b>Minhas salas</b>
          <small>{userRole}</small>
        </span>
      </button>

      <div className="top-actions">

        <button
          type="button"
          className="top-icon"
          title="Solicitações"
          aria-label="Abrir solicitações"
          onClick={() => go(notificationsPage)}
        >
          <img
            src={`${ASSETS}SolicitacoesAzul.png`}
            alt=""
            style={{
              width: 24,
              height: 24,
              objectFit: 'contain',
              transform: 'rotate(180deg)',
            }}
          />
        </button>

        <button
          type="button"
          className="avatar"
          title="Meu perfil"
          aria-label="Abrir meu perfil"
          onClick={() => go('profile')}
        >
          <img
            src={photo}
            alt="Foto de perfil"
            className="header-profile-photo"
          />
        </button>

        <button
          type="button"
          className="user-name"
          onClick={() => go('profile')}
        >
          {manager ? 'Juscelino' : 'Alexia Vitória'}
        </button>

      </div>
    </header>
  );
}
