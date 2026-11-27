
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

  const nomeUsuario = profileData?.nome || 'Alexia';

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

  const verTodas = () => {
    setBusca('');
    setFiltro('Todas');
  };

  return (
    <div className="home-page home-page-gestao">

      <div className="welcome">
        Olá, {nomeUsuario}
      </div>

      <Heading
        title="Minhas salas"
        desc="Gerencie as salas cadastradas e acompanhe suas condições de uso."
      />

      <div className="home-title-row">

        <div className="search-box">
          <span className="icon">⌕</span>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por salas, eventos e aulas"
          />
        </div>

        <button
          className="add-button"
          onClick={() => go('cadastroSalas')}
          title="Adicionar sala"
          aria-label="Adicionar sala"
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

        <h2>Resultados</h2>

        <button onClick={verTodas}>
          Ver todas
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
              type="button"
              className="edit-room"
              title="Editar sala"
              aria-label={`Editar ${sala.nome}`}
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

    </div>
  );
}
