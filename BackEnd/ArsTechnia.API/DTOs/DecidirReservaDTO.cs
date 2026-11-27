
using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class DecidirReservaDTO
    {
        [Required(ErrorMessage = "A ação é obrigatória.")]
        [RegularExpression("^(Aprovar|Rejeitar|Cancelar)$",
            ErrorMessage = "A ação deve ser Aprovar, Rejeitar ou Cancelar.")]
        public string Acao { get; set; } = "";

        [StringLength(500,
            ErrorMessage = "A observação deve ter no máximo 500 caracteres.")]
        public string? ObservacaoDecisao { get; set; }
    }
}
