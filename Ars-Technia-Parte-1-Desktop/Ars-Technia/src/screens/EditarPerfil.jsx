
import React from 'react';
import Heading from '../components/Heading.jsx';

export default function EditarPerfil({
  go,
  manager = false,
  profilePhoto = '',
  onPhotoChange,
}) {
  const name = manager ? 'Juscelino' : 'Alexia Vitória';
  const email = manager ? 'jussaADM@gmail.com' : 'Alexia@gmail.com';

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file && onPhotoChange) {
      onPhotoChange(file);
    }

    event.target.value = '';
  };

  return (
    <>
      <Heading
        eyebrow="MINHA CONTA"
        title="Editar Perfil"
        desc="Atualize seu nome, e-mail e foto de perfil."
      />

      <div className="edit-user">

        <div className="edit-photo-area">
          <div className="profile-placeholder small">
            <img
              src={profilePhoto || '/assets/IconePerfilPreto.png'}
              alt="Foto de perfil"
              className="edit-profile-photo"
            />
          </div>

          <label
            htmlFor="profile-photo-input"
            className="edit-photo-button"
            title="Adicionar foto de perfil"
          >
            <img
              src="/assets/IconeImagemADD.png"
              alt="Adicionar imagem"
            />
          </label>

          <input
            id="profile-photo-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="profile-photo-input"
          />
        </div>

        <div>
          <b>{name}</b>
          <p>{email}</p>
        </div>

      </div>

      <section className="edit-panel">
        <h3>Informações pessoais</h3>

        <label>
          Nome
          <input defaultValue={name} />
        </label>

        <label>
          E-mail
          <input defaultValue={email} />
        </label>

        <button
          className="save-button"
          onClick={() => window.alert('Dados atualizados!')}
        >
          Salvar
        </button>
      </section>

      <div className="session-panel">
        <div>
          <b>Sessão da conta</b>
          <p>Encerre o acesso neste dispositivo.</p>
        </div>

        <button onClick={() => go('login')}>
          Sair da Conta
        </button>
      </div>
    </>
  );
}
