using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public int? IdPapel { get; set; }

    public string? Nome { get; set; }

    public string? Email { get; set; }

    public string? Senha { get; set; }

    public bool? Ativo { get; set; }

    public virtual ICollection<HistoricoReserva> HistoricoReservas { get; set; } = new List<HistoricoReserva>();

    public virtual Papei? IdPapelNavigation { get; set; }

    public virtual ICollection<Reserva> ReservaIdAdministradorNavigations { get; set; } = new List<Reserva>();

    public virtual ICollection<Reserva> ReservaIdUsuarioNavigations { get; set; } = new List<Reserva>();
}
