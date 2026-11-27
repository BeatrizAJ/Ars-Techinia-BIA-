using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class CriarUsuarioDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, MinimumLength = 3,
            ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
        public string Nome { get; set; } = "";

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
        [StringLength(150)]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(100, MinimumLength = 8,
            ErrorMessage = "A senha deve ter pelo menos 8 caracteres.")]
        public string Senha { get; set; } = "";

        [Required(ErrorMessage = "O papel é obrigatório.")]
        [RegularExpression("^(2|4)$",
            ErrorMessage = "Somente Professor ou Empresa podem se cadastrar.")]
        public int IdPapel { get; set; }
    }
}