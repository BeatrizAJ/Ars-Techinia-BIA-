using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Equipamento
{
    public int IdEquipamento { get; set; }

    public int? IdLocal { get; set; }

    public string? Nome { get; set; }

    public int? Quantidade { get; set; }

    public virtual Locai? IdLocalNavigation { get; set; }
}
