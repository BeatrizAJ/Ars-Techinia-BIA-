
import React, { useState } from 'react';
import Heading from '../components/Heading.jsx';

const salasIniciais = [
  { nome: 'Sala 14', local: 'Segundo andar', status: 'Reservada', classe: 'status-reservada' },
  { nome: 'Sala 08', local: 'Primeiro andar', status: 'Aberta', classe: 'status-aberta' },
  { nome: 'Laboratório de Informática', local: 'Bloco A', status: 'Aberta', classe: 'status-aberta' },
  { nome: 'Sala 05', local: 'Segundo andar', status: 'Em manutenção', classe: 'status-manutencao' },
  { nome: 'Sala 12', local: 'Primeiro andar', status: 'Fechada', classe: 'status-fechada' },
  { nome: 'Sala 03', local: 'Bloco B', status: 'Aberta', classe: 'status-aberta' }
];

export default function TelaInicialGESTAO({ go }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  const filtradas = salasIniciais.filter((sala) => {
    const combinaBusca = sala.nome.toLowerCase().includes(busca.toLowerCase());
    const combinaFiltro = filtro === 'Todas' || sala.status === filtro;

    return combinaBusca && combinaFiltro;
  });

  return (
    <>
      <Heading
        title="Minhas salas"
        desc="Gerencie as salas cadastradas e acompanhe suas condições de uso."
      />

      <div className="welcome">Olá, Juscelino!</div>

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
        {['Todas', 'Aberta', 'Reservada', 'Em manutenção', 'Fechada'].map((opcao) => (
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
        {filtradas.map((sala) => {
          const indexOriginal = salasIniciais.indexOf(sala);

          return (
            <div className="room-card" key={sala.nome}>
              <span className={`status ${sala.classe}`}>
                {sala.status}
              </span>

              <b>{sala.nome}</b>
              <p>{sala.local}</p>

              <button
                className="edit-room"
                title="Editar sala"
                onClick={() => go(`cadastroSalas?editar=${indexOriginal}`)}
              >
                ✎
              </button>
            </div>
          );
        })}
      </div>

      {filtradas.length === 0 && (
        <div className="empty">Nenhuma sala encontrada.</div>
      )}
    </>
  );
}
