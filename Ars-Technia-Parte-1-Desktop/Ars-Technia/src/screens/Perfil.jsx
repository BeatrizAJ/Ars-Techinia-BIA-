
import React from 'react';
import Heading from '../components/Heading.jsx';

export default function Perfil({ go, profilePhoto = '' }) {
  return (
    <>
      <Heading
        eyebrow="MINHA CONTA"
        title="Meu Perfil"
        desc="Confira suas informações pessoais e sua atividade no sistema."
      />

      <section className="profile-card">

        <div className="profile-top">

          <div className="profile-placeholder">
            <img
              src={profilePhoto || '/assets/IconePerfilPreto.png'}
              alt="Foto de perfil"
              className="account-profile-photo"
            />
          </div>

          <div>
            <h2>Alexia Vitória</h2>
            <p>Professora</p>
          </div>

        </div>

        <div className="stats">

          <div>
            <b>Reservas</b>
            <strong>12</strong>
          </div>

          <div>
            <b>Solicitações</b>
            <strong>08</strong>
          </div>

          <div>
            <b>Concluídas</b>
            <strong>10</strong>
          </div>

        </div>

        <div className="account-details">

          <h3>Informações da conta</h3>

          <p>
            <span>Nome</span>
            <b>Alexia Vitória</b>
          </p>

          <p>
            <span>E-mail</span>
            <b>Alexia@gmail.com</b>
          </p>

          <p>
            <span>Tipo de conta</span>
            <b><em>Professor</em></b>
          </p>

        </div>

      </section>

      <button
        className="outline-wide"
        onClick={() => go('editarPerfil')}
      >
        Editar Perfil
      </button>

    </>
  );
}
