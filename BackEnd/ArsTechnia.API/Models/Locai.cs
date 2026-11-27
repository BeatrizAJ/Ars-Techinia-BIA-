using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Locai
{
    public int IdLocal { get; set; }

    public string? Nome { get; set; }

    public int? CapacidadePessoas { get; set; }

    public int? QuantidadeDivisoes { get; set; }

    public int? QuantidadeEquipamentos { get; set; }

    public int? QuantidadeRecursosDidaticos { get; set; }

    public virtual ICollection<Diviso> Divisos { get; set; } = new List<Diviso>();

    public virtual ICollection<Equipamento> Equipamentos { get; set; } = new List<Equipamento>();

    public virtual ICollection<RecursosDidatico> RecursosDidaticos { get; set; } = new List<RecursosDidatico>();

    public virtual ICollection<Reserva> Reservas { get; set; } = new List<Reserva>();
}
