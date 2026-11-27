import React from 'react';
import Heading from '../components/Heading.jsx';

const solicitacoes = [
  {
    professor: 'Alexia Vitória',
    sala: 'Sala 14',
    data: '13/11/2026',
    horario: '08:30 às 11:30',
    alunos: '25 alunos',
    descricao: 'Aula prática com a turma.',
    status: 'Manutenção',
    classe: 'pending',
    icone: '/assets/Manutencao.png'
  },
  {
    professor: 'Alexia Vitória',
    sala: 'Laboratório de Informática',
    data: '10/11/2026',
    horario: '13:00 às 16:00',
    alunos: '30 alunos',
    descricao: 'Atividade de informática.',
    status: 'Solicitação aceita',
    classe: 'approved',
    icone: '/assets/Verificado.png'
  },
  {
    professor: 'Alexia Vitória',
    sala: 'Sala 08',
    data: '08/11/2026',
    horario: '09:00 às 12:00',
    alunos: '20 alunos',
    descricao: 'Aula de reforço.',
    status: 'Solicitação recusada',
    classe: 'rejected',
    icone: '/assets/Negado.png'
  },
  {
    professor: 'Alexia Vitória',
    sala: 'Sala 09',
    data: '04/11/2026',
    horario: '09:00 às 12:00',
    alunos: '10 alunos',
    descricao: 'Aula de reforço.',
    status: 'Solicitação recusada',
    classe: 'rejected',
    icone: '/assets/Negado.png'
  },
  {
    professor: 'Alexia Vitória',
    sala: 'Arena Cyber',
    data: '02/11/2026',
    horario: '14:00 às 17:00',
    alunos: '30 alunos',
    descricao: 'Atividade de informática.',
    status: 'Solicitação aceita',
    classe: 'approved',
    icone: '/assets/Verificado.png'
  }
];

export default function Solicitacao({ go, onDetails }) {
  const irParaAgendamento = () => {
    if (typeof go === 'function') go('agendamento');
  };

  const verDetalhes = (item) => {
    if (typeof onDetails === 'function') onDetails(item);
  };

  return (
    <div className="solicitacao-page">
      {/* Cabeçalho original: aparece no desktop */}
      <div className="solicitacao-heading-desktop">
        <Heading
          eyebrow="MINHAS RESERVAS"
          title="Notificações"
          desc="Acompanhe suas solicitações de reserva e os resultados das análises."
        />
      </div>

      {/* Cabeçalho da referência: aparece somente no mobile */}
      <div className="solicitacao-heading-mobile">
        <Heading
          eyebrow="PROFESSOR"
          title="Notificações"
          desc=""
        />
      </div>

      <div className="results-head">
        <h2>Minhas solicitações</h2>
        <button
          type="button"
          onClick={irParaAgendamento}
          title="Cadastrar agendamento"
        >
          <img
            src="/assets/BotaoAdicao.png"
            alt="Adicionar agendamento"
            className="add-icon"
          />
        </button>
      </div>

      <div className="notification-layout">
        <section>
          {solicitacoes.map((item, index) => (
            <article className="notification-card" key={`${item.sala}-${index}`}>
              <div className={`request-status ${item.classe}`}>
                <img src={item.icone} alt={item.status} />
              </div>

              {/* Conteúdo original do desktop */}
              <div className="request-info">
                <small>
                  {item.data} • {item.horario}
                </small>
                <b>{item.sala}</b>
                <p>{item.status}</p>
              </div>

              {/* Conteúdo organizado para a referência mobile */}
              <div className="request-mobile-info">
                <div className="request-mobile-top">
                  <small>Hoje · 14:05</small>
                  <b>{item.sala}</b>
                </div>
                <p>
                  Professora <strong>{item.professor}</strong>
                </p>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => verDetalhes(item)}
              >
                Ver Detalhes
              </button>
            </article>
          ))}
        </section>

        <aside className="info-column">
          <div className="info-callout">
            <span className="large-line-icon">
              <img src="/assets/SininhoPreto.png" alt="Sininho de notificações" />
            </span>
            <h3>Acompanhe seus pedidos</h3>
            <p>
              Você pode consultar o andamento das suas solicitações
              e verificar as respostas enviadas pela Gestão.
            </p>
          </div>

          <div className="info-box">
            <b>Legenda de status</b>
            <p><span className="dot green"></span> Aceita</p>
            <p><span className="dot red"></span> Recusada</p>
            <p><span className="dot maintenance-yellow"></span> Manutenção</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
