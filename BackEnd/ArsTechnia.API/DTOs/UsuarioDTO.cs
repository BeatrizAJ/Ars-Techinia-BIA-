namespace ArsTechnia.API.DTOs
{
    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public int IdPapel { get; set; }
        public string Nome { get; set; } = "";
        public string Email { get; set; } = "";
        public bool Ativo { get; set; }
    }
}