
import React, { useEffect, useState } from 'react';

export default function Agendamento({
  initialData = null,
  profileData,
  onBack = () => { },
  onFinish = () => { },
}) {
  const novoAgendamento = initialData?.tipo === 'novo';
  const visualizando = initialData !== null && !novoAgendamento;

  const sala = novoAgendamento
    ? initialData.sala
    : null;

  const [nomeProfessor, setNomeProfessor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [local, setLocal] = useState('');
  const [descricaoLocal, setDescricaoLocal] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  useEffect(() => {
    setNomeProfessor(
      profileData?.nome || initialData?.professor || ''
    );

    setQuantidade(
      sala?.quantidade || initialData?.alunos || ''
    );

    setLocal(
      sala
        ? `${sala.nome || ''}${sala.local ? ` - ${sala.local}` : ''}`
        : initialData?.sala || ''
    );

    setDescricaoLocal(
      sala?.descricao || initialData?.descricaoLocal || ''
    );

    setDescricaoEvento(
      visualizando ? initialData?.descricao || '' : ''
    );

    setData(initialData?.data || '');
    setHorario(initialData?.horario || '');

  }, [
    initialData,
    profileData?.nome
  ]);

  // Gera os horários disponíveis de 30 em 30 minutos,
  // das 07:00 até às 23:00.
  const horariosDisponiveis = Array.from(
    { length: 33 },
    (_, index) => {
      const horas = 7 + Math.floor(index / 2);
      const minutos = index % 2 === 0 ? '00' : '30';

      return `${String(horas).padStart(2, '0')}:${minutos}`;
    }
  );

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (!visualizando) {

      if (!horariosDisponiveis.includes(horario)) {
        window.alert(
          'Horário inválido! Escolha um horário entre 07:00 e 23:00.'
        );
        return;
      }

      onFinish({
        professor: nomeProfessor,
        alunos: quantidade,
        sala: local,
        descricaoLocal,
        descricao: descricaoEvento,
        data,
        horario,
        status: 'Aguardando análise'
      });
    }
  };

  return (
    <div className="standalone">

      <div className="standalone-header">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
          title="Voltar"
        >
          <img
            src="/assets/IconeVoltar.png"
            alt="Voltar"
          />
        </button>

        <h1>Cadastro de Agendamento</h1>
      </div>

      <form
        className="standalone-form"
        onSubmit={enviarFormulario}
      >

        <label>
          Nome do professor *
          <input
            required
            readOnly={visualizando}
            value={nomeProfessor}
            onChange={(e) => setNomeProfessor(e.target.value)}
            placeholder="Nome do professor"
          />
        </label>

        <label>
          Quantidade de alunos / Capacidade da sala
          <input
            readOnly
            value={quantidade}
            placeholder="Informação da sala"
          />
        </label>

        <label>
          Sala / Local selecionado
          <input
            readOnly
            value={local}
            placeholder="Sala selecionada"
          />
        </label>

        {descricaoLocal && (
          <label>
            Descrição do local
            <textarea
              readOnly
              value={descricaoLocal}
            />
          </label>
        )}

        <label>
          Descrição do evento *
          <textarea
            required
            readOnly={visualizando}
            value={descricaoEvento}
            onChange={(e) => setDescricaoEvento(e.target.value)}
            placeholder="Descreva a atividade que será realizada."
          />
        </label>

        <label>
          Data *
          <input
            type="date"
            required
            readOnly={visualizando}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        <label>
          Horário *
          <select
            className="horario-select"
            required
            disabled={visualizando}
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          >
            <option value="">--:--</option>

            {horariosDisponiveis.map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </label>

        {!visualizando && (
          <p>
            Horários disponíveis: das 07:00 às 23:00.
          </p>
        )}

        {visualizando && (
          <label>
            Status da solicitação
            <input
              readOnly
              value={initialData?.status || ''}
            />
          </label>
        )}

        {!visualizando && (
          <>
            <p>Os campos com * são obrigatórios.</p>

            <button
              className="blue-wide"
              type="submit"
            >
              Cadastrar solicitação
            </button>
          </>
        )}

      </form>
    </div>
  );
}
