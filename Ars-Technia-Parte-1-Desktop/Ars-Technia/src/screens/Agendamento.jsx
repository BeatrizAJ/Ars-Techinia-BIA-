
import React from 'react';

export default function Agendamento({
  initialData = null,
  onBack = () => {},
  onFinish = () => {}
}) {
  const visualizando = initialData !== null;

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
        onSubmit={(e) => {
          e.preventDefault();

          if (!visualizando) {
            onFinish();
          }
        }}
      >
        <label>
          Nome do professor *
          <input
            required
            readOnly={visualizando}
            defaultValue={initialData?.professor || ''}
            placeholder="Ex.: Marcos/Caique"
          />
        </label>

        <label>
          Quantidade alunos *
          <input
            required
            readOnly={visualizando}
            defaultValue={initialData?.alunos || ''}
            placeholder="Ex.: Máx.20"
          />
        </label>

        <label>
          Local / Setor *
          <input
            required
            readOnly={visualizando}
            defaultValue={initialData?.sala || ''}
            placeholder="Ex.: Sala 02 / Administração"
          />
        </label>

        <label>
          Descrição do evento *
          <textarea
            required
            readOnly={visualizando}
            defaultValue={initialData?.descricao || ''}
            placeholder="Ex.: Local reservado para aulas práticas[...]"
          />
        </label>

        {visualizando && (
          <>
            <label>
              Data
              <input
                readOnly
                defaultValue={initialData.data || ''}
              />
            </label>

            <label>
              Horário
              <input
                readOnly
                defaultValue={initialData.horario || ''}
              />
            </label>

            <label>
              Status da solicitação
              <input
                readOnly
                defaultValue={initialData.status || ''}
              />
            </label>
          </>
        )}

        {!visualizando && (
          <>
            <p>Os campos com * são obrigatórios.</p>

            <button
              className="blue-wide"
              type="submit"
            >
              Cadastrar
            </button>
          </>
        )}

      </form>
    </div>
  );
}
