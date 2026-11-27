
import React from 'react';
import Heading from '../components/Heading.jsx';

const pedidos = [
  ...Array.from({ length: 4 }, () => ({
    professor: 'Alexia Vitória',
    sala: 'Sala 01',
    data: 'Hoje',
    horario: '14:05',
  })),
];

export default function SolicitacaoGESTAO({ go }) {
  return (
    <div className="solicitacao-page solicitacao-gestao">

      {/* Cabeçalho desktop */}
      <div className="solicitacao-heading-desktop">
        <Heading
          eyebrow="GESTÃO"
          title="Notificações"
          desc="Consulte as solicitações de reserva recebidas dos professores."
        />
      </div>

      {/* Cabeçalho mobile */}
      <div className="solicitacao-heading-mobile">
        <Heading
          eyebrow="GESTÃO"
          title="Notificações"
          desc=""
        />
      </div>

      {/* Cabeçalho dos resultados */}
      <div className="results-head solicitacao-gestao-results">
        <h2>Hoje · 4 solicitações</h2>
      </div>

      <div className="notification-layout">

        <section className="solicitacao-gestao-lista">

          {pedidos.map((pedido, index) => (
            <article
              className="notification-card"
              key={`${pedido.sala}-${index}`}
            >

              {/* Ícone/coluna do card */}
              <div className="request-status">
                <span aria-hidden="true"></span>
              </div>

              {/* Informações desktop */}
              <div className="request-info">
                <small>
                  {pedido.data} · {pedido.horario}
                </small>

                <b>{pedido.sala}</b>

                <p>
                  Professora <strong>{pedido.professor}</strong>
                </p>
              </div>

              {/* Informações mobile */}
              <div className="request-mobile-info">

                <div className="request-mobile-top">
                  <small>{pedido.data} · {pedido.horario}</small>

                  <b>{pedido.sala}</b>
                </div>

                <p>
                  Professora <strong>{pedido.professor}</strong>
                </p>

              </div>

              {/* Botão de detalhes */}
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  if (typeof go === 'function') {
                    go(`verificacao?pedido=${index}`);
                  }
                }}
              >
                Ver Detalhes
              </button>

            </article>
          ))}

        </section>

        {/* Coluna lateral desktop */}
        <aside className="info-column">

          <div className="info-callout">
            <span className="solicitacao-gestao-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h4" />
              </svg>
            </span>

            <h3>Área de gestão</h3>

            <p>
              Acompanhe as solicitações dos professores e abra os detalhes
              para consultar as informações de cada reserva.
            </p>
          </div>

          <div className="info-box">
            <b>Solicitações de salas</b>

            <p>
              O nome do professor e o horário de envio estão disponíveis em
              cada solicitação.
            </p>
          </div>

        </aside>

      </div>

    </div>
  );
}
