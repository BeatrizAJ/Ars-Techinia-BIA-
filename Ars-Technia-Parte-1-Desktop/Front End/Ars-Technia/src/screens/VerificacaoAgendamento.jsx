
import React from 'react';
import Heading from '../components/Heading.jsx';

const requests = [
  {
    professor: 'Alexia Vitória',
    email: 'professor@arstechnia.com',
    sala: 'Sala 14',
    data: '13/11/2026',
    horario: '08:30 às 11:30',
    alunos: '25 alunos',
    descricao: 'Aula prática com a turma.',
  },
  {
    professor: 'Alexia Vitória',
    email: 'professor@arstechnia.com',
    sala: 'Laboratório de Informática',
    data: '14/11/2026',
    horario: '13:00 às 16:00',
    alunos: '30 alunos',
    descricao: 'Atividade de informática.',
  },
  {
    professor: 'Alexia Vitória',
    email: 'professor@arstechnia.com',
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
        eyebrow="GESTÃO"
        title="Verificação de Agendamento"
        desc="Informações de solicitação de Agendamento, verifique-as"
      />

      <section className="verify-panel">

        <div className="verify-form">

          <div className="verify-field">
            <label>Nome do professor *</label>
            <div className="verify-value">
              {p.professor}
            </div>
          </div>

          <div className="verify-field">
            <label>Quantidade alunos *</label>
            <div className="verify-value">
              {p.alunos}
            </div>
          </div>

          <div className="verify-field">
            <label>Local / Setor *</label>
            <div className="verify-value">
              {p.sala}
            </div>
          </div>

          <div className="verify-field">
            <label>Descrição do evento *</label>
            <div className="verify-description">
              {p.descricao}
            </div>
          </div>

          <div className="verify-extra-info">
            <span>Data: {p.data}</span>
            <span>Horário: {p.horario}</span>
            <span>E-mail: {p.email}</span>
          </div>

          <div className="verify-actions">
            <button
              type="button"
              className="accept"
              onClick={() => onDecision('Aceita')}
            >
              Aceitar
            </button>

            <button
              type="button"
              className="deny"
              onClick={() => onDecision('Recusada')}
            >
              Negar
            </button>

            <button
              type="button"
              className="maintenance"
              onClick={() => onDecision('Em manutenção')}
            >
              Manutenção
            </button>
          </div>

        </div>
      </section>

      <button
        className="back-link"
        onClick={() => go('solicitacaoGestao')}
      >
        ← Voltar para solicitações
      </button>
    </>
  );
}
