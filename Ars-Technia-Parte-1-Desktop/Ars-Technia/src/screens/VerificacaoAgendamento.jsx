
import React from 'react';
import Heading from '../components/Heading.jsx';

const requests = [
  {
    professor: 'Alexia Vitória',
    email: 'Alexia@gmail.com',
    sala: 'Sala 14',
    data: '13/11/2026',
    horario: '08:30 às 11:30',
    alunos: '25 alunos',
    descricao: 'Aula prática com a turma.',
  },
  {
    professor: 'Jéssica Almeida',
    email: 'jessica@gmail.com',
    sala: 'Laboratório de Informática',
    data: '14/11/2026',
    horario: '13:00 às 16:00',
    alunos: '30 alunos',
    descricao: 'Atividade de informática.',
  },
  {
    professor: 'Carlos Eduardo',
    email: 'carlos@gmail.com',
    sala: 'Sala 08',
    data: '15/11/2026',
    horario: '09:00 às 12:00',
    alunos: '20 alunos',
    descricao: 'Aula de reforço.',
  },
];

export default function VerificacaoAgendamento({
  go,
  requestIndex = 0,
  onDecision,
}) {
  const p = requests[requestIndex] || requests[0];

  return (
    <>
      <Heading
        eyebrow="ÁREA DE GESTÃO"
        title="Verificação de Agendamento"
        desc="Confira os dados enviados pelo professor antes de registrar sua decisão."
      />

      <section className="verify-panel">
        <h2>Dados da solicitação</h2>

        <div className="verify-grid">
          <div><small>Professor</small><b>{p.professor}</b></div>
          <div><small>E-mail</small><b>{p.email}</b></div>
          <div><small>Sala solicitada</small><b>{p.sala}</b></div>
          <div><small>Data</small><b>{p.data}</b></div>
          <div><small>Horário</small><b>{p.horario}</b></div>
          <div><small>Quantidade de alunos</small><b>{p.alunos}</b></div>
        </div>

        <div className="verify-description">
          <small>Descrição da atividade</small>
          <p>{p.descricao}</p>
        </div>

        <div className="verify-actions">
          <button className="accept" onClick={() => onDecision('Aceita')}>
            Aceitar
          </button>

          <button className="deny" onClick={() => onDecision('Recusada')}>
            Negar
          </button>

          <button
            className="maintenance"
            onClick={() => onDecision('Em manutenção')}
          >
            Em Manutenção
          </button>
        </div>
      </section>

      <button className="back-link" onClick={() => go('solicitacaoGestao')}>
        ← Voltar para solicitações
      </button>
    </>
  );
}
