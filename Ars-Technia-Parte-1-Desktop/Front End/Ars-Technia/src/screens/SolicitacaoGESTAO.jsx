
import React from 'react';
import Heading from '../components/Heading.jsx';

const pedidos = [
  {
    professor: 'Alexia Vitória',
    sala: 'Sala 14',
    data: '13/11/2026',
    horario: '08:30 às 11:30'
  },
  {
    professor: 'Jéssica Almeida',
    sala: 'Laboratório de Informática',
    data: '14/11/2026',
    horario: '13:00 às 16:00'
  },
  {
    professor: 'Carlos Eduardo',
    sala: 'Sala 08',
    data: '15/11/2026',
    horario: '09:00 às 12:00'
  }
];

export default function SolicitacaoGESTAO({ go }) {
  return (
    <div className="solicitacao-page solicitacao-gestao">

      {/* Cabeçalho desktop */}
      <div className="solicitacao-heading-desktop">
        <Heading
          title="Solicitações"
          desc="Consulte e analise os pedidos de reserva enviados pelos professores."
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
        <h2>Solicitações recebidas</h2>
        <span>03 pendentes</span>
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
                  {pedido.data} • {pedido.horario}
                </small>

                <b>{pedido.sala}</b>

                <p>
                  Professor: {pedido.professor}
                </p>
              </div>

              {/* Informações mobile */}
              <div className="request-mobile-info">

                <div className="request-mobile-top">
                  <small>
                    {pedido.data} · {pedido.horario}
                  </small>

                  <b>{pedido.sala}</b>
                </div>

                <p>
                  Professor <strong>{pedido.professor}</strong>
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
            <h3>Central de solicitações</h3>

            <p>
              Analise os pedidos recebidos e escolha se a reserva
              poderá ser realizada.
            </p>
          </div>

          <div className="info-box">
            <b>Informações</b>

            <p>
              Verifique a disponibilidade da sala antes de aprovar
              uma solicitação.
            </p>
          </div>

        </aside>

      </div>

    </div>
  );
}
