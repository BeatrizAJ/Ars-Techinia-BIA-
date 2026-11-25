
import React, { useState } from 'react';
import Heading from '../components/Heading.jsx';

export default function TelaInicialGESTAO({
  go,
  salas = [],
  onSelectRoom,
  profileData
}) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  const filtradas = salas
    .map((sala, index) => ({
      ...sala,
      indexOriginal: index
    }))
    .filter((sala) => {
      const nome = sala.nome || '';

      const combinaBusca = nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const combinaFiltro =
        filtro === 'Todas' || sala.status === filtro;

      return combinaBusca && combinaFiltro;
    });

  const abrirSala = (sala) => {
    if (typeof onSelectRoom === 'function') {
      onSelectRoom(sala);
    }
  };

  return (
    <>
      <Heading
        title="Minhas salas"
        desc="Gerencie as salas cadastradas e acompanhe suas condições de uso."
      />

      <div className="welcome">
        Olá, {profileData?.nome || 'Juscelino'}!
      </div>

      <div className="home-title-row">
        <div className="search-box">
          <span className="icon">⌕</span>

          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar sala..."
          />
        </div>

        <button
          className="add-button"
          onClick={() => go('cadastroSalas')}
          title="Adicionar sala"
        >
          +
        </button>
      </div>

      <div className="filters">
        {[
          'Todas',
          'Aberta',
          'Reservada',
          'Em manutenção',
          'Fechada'
        ].map((opcao) => (
          <button
            key={opcao}
            className={filtro === opcao ? 'active' : ''}
            onClick={() => setFiltro(opcao)}
          >
            {opcao}
          </button>
        ))}
      </div>

      <div className="results-head">
        <h2>Salas cadastradas</h2>

        <button onClick={() => go('solicitacaoGestao')}>
          Solicitações
        </button>
      </div>

      <div className="room-grid">
        {filtradas.map((sala) => (
          <article
            className="room-card"
            key={sala.indexOriginal}
            onClick={() => abrirSala(sala)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirSala(sala);
              }
            }}
            role="button"
            tabIndex={0}
            title={`Ver detalhes de ${sala.nome}`}
          >
            <span className={`status ${sala.classe || ''}`}>
              {sala.status}
            </span>

            <b>{sala.nome}</b>
            <p>{sala.local}</p>

            <button
              className="edit-room"
              title="Editar sala"
              onClick={(e) => {
                e.stopPropagation();
                go(`cadastroSalas?editar=${sala.indexOriginal}`);
              }}
            >
              ✎
            </button>
          </article>
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="empty">
          Nenhuma sala encontrada.
        </div>
      )}
    </>
  );
}
