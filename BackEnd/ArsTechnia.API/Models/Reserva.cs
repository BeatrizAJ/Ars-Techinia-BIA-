using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Reserva
{
    public int IdReserva { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdLocal { get; set; }

    public string? Titulo { get; set; }

    public string? Finalidade { get; set; }

    public DateTime? DataHoraInicio { get; set; }

    public DateTime? DataHoraFim { get; set; }

    public string? Status { get; set; }

    public DateTime? DataSolicitacao { get; set; }

    public int? IdAdministrador { get; set; }

    public DateTime? DataDecisao { get; set; }

    public string? ObservacaoDecisao { get; set; }

    public virtual ICollection<HistoricoReserva> HistoricoReservas { get; set; } = new List<HistoricoReserva>();

    public virtual Usuario? IdAdministradorNavigation { get; set; }

    public virtual Locai? IdLocalNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
