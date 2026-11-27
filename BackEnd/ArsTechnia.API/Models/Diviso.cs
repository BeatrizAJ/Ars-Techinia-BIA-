using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Diviso
{
    public int IdDivisao { get; set; }

    public int? IdLocal { get; set; }

    public string? Nome { get; set; }

    public int? CapacidadePessoas { get; set; }

    public string? EquipamentosAssociados { get; set; }

    public virtual Locai? IdLocalNavigation { get; set; }
}
