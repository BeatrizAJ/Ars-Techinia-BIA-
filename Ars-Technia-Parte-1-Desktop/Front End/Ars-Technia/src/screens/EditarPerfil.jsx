
import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading.jsx';

export default function EditarPerfil({
  go,
  manager = false,
  profileData,
  profilePhoto = '',
  onPhotoChange,
  onSave,
}) {
  const name = profileData?.nome || (manager ? 'Juscelino' : 'Alexia Vitória');
  const email = profileData?.email || (manager ? 'jussaADM@gmail.com' : 'Alexia@gmail.com');

  const [nome, setNome] = useState(name);
  const [emailAtual, setEmailAtual] = useState(email);

  useEffect(() => {
    setNome(name);
    setEmailAtual(email);
  }, [name, email]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file && onPhotoChange) {
      onPhotoChange(file);
    }

    event.target.value = '';
  };

  const handleSave = () => {
    if (!nome.trim() || !emailAtual.trim()) {
      window.alert('Preencha o nome e o e-mail.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAtual)) {
      window.alert('Digite um e-mail válido.');
      return;
    }

    onSave({
      nome: nome.trim(),
      email: emailAtual.trim(),
    });
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
          <b>{nome}</b>
          <p>{emailAtual}</p>
        </div>

      </div>

      <section className="edit-panel">
        <h3>Informações pessoais</h3>

        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            value={emailAtual}
            onChange={(e) => setEmailAtual(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>

        <button
          className="save-button"
          onClick={handleSave}
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
