
import React from 'react';

export default function Agendamento({
  onBack = () => {},
  onFinish = () => {}
}) {
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
        onSubmit={e => {
          e.preventDefault();
          onFinish();
        }}
      >
        <label>
          Nome do professor *
          <input
            required
            placeholder="Ex.: Marcos/Caique"
          />
        </label>

        <label>
          Quantidade alunos *
          <input
            required
            placeholder="Ex.: Máx.20"
          />
        </label>

        <label>
          Local / Setor *
          <input
            required
            placeholder="Ex.: Sala 02 / Administração"
          />
        </label>

        <label>
          Descrição do evento *
          <textarea
            required
            placeholder="Ex.: Local reservado para aulas práticas[...]"
          />
        </label>

        <p>Os campos com * são obrigatórios.</p>

        <button className="blue-wide" type="submit">
          Cadastrar
        </button>
      </form>

    </div>
  );
}
