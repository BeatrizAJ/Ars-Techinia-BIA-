using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class RecursosDidatico
{
    public int IdRecurso { get; set; }

    public int? IdLocal { get; set; }

    public string? Nome { get; set; }

    public int? Quantidade { get; set; }

    public virtual Locai? IdLocalNavigation { get; set; }
}
