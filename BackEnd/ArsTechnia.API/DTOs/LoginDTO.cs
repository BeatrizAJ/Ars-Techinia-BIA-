using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
        [StringLength(150)]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(100,
            MinimumLength = 1,
            ErrorMessage = "A senha deve ter no máximo 100 caracteres.")]
        public string Senha { get; set; } = "";
    }
}