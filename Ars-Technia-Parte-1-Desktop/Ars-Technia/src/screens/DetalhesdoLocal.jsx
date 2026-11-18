import React from 'react';
import Heading from '../components/Heading.jsx';
export default function DetalhesdoLocal({ go }) {
  return <><Heading title="Detalhes do Local" desc="Reservas / Detalhes do Local" />
    <div className="details-layout"><section className="place-card"><div className="place-title"><h2>Sala 14</h2><span className="status status-reservada">Reservada</span></div>
      <h3>Detalhes do local</h3><div className="place-preview"><b>SALA MAC</b><div className="preview-content"><div className="photo-placeholder">＋</div><div><b>Segundo andar</b><b>Professora Jéssica</b><b>Máximo 30 alunos</b><b>08:30 até às 11:30</b></div></div></div>
    </section><aside className="place-side"><b>Detalhes do local</b><div className="communication"><span>Comunicação</span><small>Atualizado hoje</small><p>📢 Professor confirmou a reserva da sala para hoje.</p></div><button className="blue-wide" onClick={() => go('agendamento')}>Enviar Solicitação</button></aside></div>
  </>;
}
