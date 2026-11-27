using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class AtualizarUsuarioDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, MinimumLength = 3,
            ErrorMessage = "O nome deve ter entre 3 e 100 caracteres.")]
        public string Nome { get; set; } = "";

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
        [StringLength(150,
            ErrorMessage = "O e-mail deve ter no máximo 150 caracteres.")]
        public string Email { get; set; } = "";

        // A senha é opcional na atualização.
        // Se informada, deve ter entre 8 e 100 caracteres.
        [MinLength(8,
            ErrorMessage = "A senha deve ter pelo menos 8 caracteres.")]
        [StringLength(100,
            ErrorMessage = "A senha deve ter no máximo 100 caracteres.")]
        public string? Senha { get; set; }
    }
}