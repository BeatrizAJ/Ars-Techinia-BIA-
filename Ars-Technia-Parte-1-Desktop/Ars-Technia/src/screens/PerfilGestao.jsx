
import React from 'react';

export default function PerfilGestao({ go, profilePhoto = '' }) {
  return (
    <>
      <div className="page-heading">
        <h1>Meu Perfil</h1>
        <p>Confira as informações da sua conta de gestão.</p>
      </div>

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
            <h2>Juscelino</h2>
            <p>Administrador</p>
          </div>

        </div>

        <div className="stats">
          <div>
            <b>Salas</b>
            <strong>18</strong>
          </div>

          <div>
            <b>Solicitações</b>
            <strong>08</strong>
          </div>

          <div>
            <b>Pendentes</b>
            <strong>03</strong>
          </div>
        </div>

        <div className="account-details">
          <h3>Informações da conta</h3>

          <p>
            <span>Nome</span>
            <b>Juscelino</b>
          </p>

          <p>
            <span>E-mail</span>
            <b>jussaADM@gmail.com</b>
          </p>

          <p>
            <span>Tipo de conta</span>
            <b><em>Gestão</em></b>
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
