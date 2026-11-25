
import React, { useState } from 'react';
import Heading from '../components/Heading.jsx';

export default function TelaInicial({
  go,
  profileData,
  salas = [],
  onSelectRoom
}) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  const nomeUsuario = profileData?.nome || 'Alexia Vitória';

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
        desc="Encontre uma sala e consulte as informações para realizar sua reserva."
      />

      <div className="welcome">
        Olá, {nomeUsuario}!
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
        <h2>Salas disponíveis</h2>

        <button onClick={() => go('solicitacao')}>
          Minhas solicitações
        </button>
      </div>

      <div className="room-grid">
        {filtradas.map((sala) => (
          <button
            type="button"
            className="room-card"
            key={sala.indexOriginal}
            onClick={() => abrirSala(sala)}
          >
            <span className={`status ${sala.classe || ''}`}>
              {sala.status}
            </span>

            <b>{sala.nome}</b>
            <p>{sala.local}</p>
          </button>
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
