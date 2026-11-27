using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class HistoricoReserva
{
    public int IdHistorico { get; set; }

    public int? IdReserva { get; set; }

    public int? IdUsuario { get; set; }

    public string? StatusAnterior { get; set; }

    public string? StatusNovo { get; set; }

    public string? Observacao { get; set; }

    public DateTime? DataAlteracao { get; set; }

    public virtual Reserva? IdReservaNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
