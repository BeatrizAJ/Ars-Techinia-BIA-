using System;
using System.Collections.Generic;

namespace ArsTechnia.API.Models;

public partial class Papei
{
    public int IdPapel { get; set; }

    public string? Nome { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
    