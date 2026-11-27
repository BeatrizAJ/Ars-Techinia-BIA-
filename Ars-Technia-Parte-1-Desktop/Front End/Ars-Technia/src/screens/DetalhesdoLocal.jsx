
import React from 'react';
import Heading from '../components/Heading.jsx';

export default function DetalhesdoLocal({
  go,
  sala,
  onRequest
}) {
  const altoFalante = '/assets/AltoFalanteIcone.png';

  if (!sala) {
    return (
      <div className="details-page">
        <Heading
          title="Detalhes do Local"
          desc="Reservas / Detalhes do Local"
        />

        <div className="empty">
          Nenhuma sala foi selecionada.
        </div>

        <button
          className="blue-wide"
          onClick={() => go('home')}
        >
          Voltar para Minhas salas
        </button>
      </div>
    );
  }

  const nome = sala.nome || 'Nome não informado';
  const status = sala.status || 'Status não informado';
  const local = sala.local || sala.setor || 'Local não informado';
  const quantidade = sala.quantidade || sala.capacidade;
  const descricao = sala.descricao || '';
  const imagem = sala.imagem;
  const professor = sala.professor || sala.professora || '';
  const horario = sala.horario || sala.horarios || '';

  return (
    <div className="details-page">

      <Heading
        title="Detalhes do Local"
        desc="Reservas / Detalhes do Local"
      />

      <div className="details-layout">

        <section className="place-card">

          <div className="place-title">
            <h2>{nome}</h2>

            <span className={`status ${sala.classe || ''}`}>
              {status}
            </span>
          </div>

          <h3>Detalhes do local</h3>

          <div className="place-preview">

            <b>{nome.toUpperCase()}</b>

            <div className="preview-content">

              <div className="photo-placeholder">
                {imagem ? (
                  <img
                    src={imagem}
                    alt={`Imagem de ${nome}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'inherit'
                    }}
                  />
                ) : (
                  '＋'
                )}
              </div>

              <div className="preview-information">

                <b>{local}</b>

                {professor && (
                  <b>{professor}</b>
                )}

                {quantidade && (
                  <b>Máximo {quantidade} alunos</b>
                )}

                {horario && (
                  <b>{horario}</b>
                )}

                {descricao && (
                  <b>{descricao}</b>
                )}

              </div>

            </div>
          </div>

          {/* COMUNICAÇÃO MOBILE */}
          <div className="communication details-communication">

            <span>Comunicação</span>

            <div className="communication-content">

              <div className="communication-icon">
                <img
                  src={altoFalante}
                  alt="Ícone de comunicação"
                  className="alto-falante-icone"
                />
              </div>

              <p>
                {professor
                  ? `${professor} confirmou a reserva da sala para hoje.`
                  : `${nome} está atualmente com o status: ${status}.`}
              </p>

            </div>

          </div>

          {/* BOTÃO MOBILE */}
          {typeof onRequest === 'function' ? (
            <button
              type="button"
              className="blue-wide details-request-button"
              onClick={onRequest}
            >
              Enviar Solicitação
            </button>
          ) : (
            <button
              type="button"
              className="blue-wide details-request-button"
              onClick={() => go('homeManager')}
            >
              Voltar
            </button>
          )}

        </section>

        {/* COLUNA DESKTOP */}
        <aside className="place-side">

          <b>Detalhes do local</b>

          <div className="communication">

            <span>Comunicação</span>
            <small>Status da sala</small>

            <div className="communication-content">

              <div className="communication-icon">
                <img
                  src={altoFalante}
                  alt="Ícone de comunicação"
                  className="alto-falante-icone"
                />
              </div>

              <p>
                {nome} está atualmente com o status: {status}.
              </p>

            </div>

          </div>

          {typeof onRequest === 'function' ? (
            <button
              type="button"
              className="blue-wide"
              onClick={onRequest}
            >
              Enviar solicitação
            </button>
          ) : (
            <button
              type="button"
              className="blue-wide"
              onClick={() => go('homeManager')}
            >
              Voltar
            </button>
          )}

        </aside>

      </div>
    </div>
  );
}
