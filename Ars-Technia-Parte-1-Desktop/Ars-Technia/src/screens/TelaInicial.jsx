
import React, { useState } from 'react';
import Heading from '../components/Heading.jsx';

const salas = [
  { nome: 'Sala 14', local: 'Segundo andar', status: 'Reservada', classe: 'status-reservada' },
  { nome: 'Sala 08', local: 'Primeiro andar', status: 'Aberta', classe: 'status-aberta' },
  { nome: 'Laboratório de Informática', local: 'Bloco A', status: 'Aberta', classe: 'status-aberta' },
  { nome: 'Sala 05', local: 'Segundo andar', status: 'Em manutenção', classe: 'status-manutencao' },
  { nome: 'Sala 12', local: 'Primeiro andar', status: 'Fechada', classe: 'status-fechada' },
  { nome: 'Sala 03', local: 'Bloco B', status: 'Aberta', classe: 'status-aberta' }
];

export default function TelaInicial({ go }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  const filtradas = salas.filter(sala => {
    const combinaBusca = sala.nome.toLowerCase().includes(busca.toLowerCase());
    const combinaFiltro = filtro === 'Todas' || sala.status === filtro;
    return combinaBusca && combinaFiltro;
  });

  return (
    <>
      <Heading
        title="Minhas salas"
        desc="Encontre uma sala e consulte as informações para realizar sua reserva."
      />

      <div className="welcome">Olá, Alexia!</div>

      <div className="home-title-row">
        <div className="search-box">
          <span className="icon">⌕</span>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Pesquisar sala..."
          />
        </div>
      </div>

      <div className="filters">
        {['Todas', 'Aberta', 'Reservada', 'Em manutenção', 'Fechada'].map(opcao => (
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
        <button onClick={() => go('solicitacao')}>Minhas solicitações</button>
      </div>

      <div className="room-grid">
        {filtradas.map((sala, index) => (
          <button
            className="room-card"
            key={index}
            onClick={() => go('detalhes')}
          >
            <span className={`status ${sala.classe}`}>
              {sala.status}
            </span>

            <b>{sala.nome}</b>
            <p>{sala.local}</p>
          </button>
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="empty">Nenhuma sala encontrada.</div>
      )}
    </>
  );
}
