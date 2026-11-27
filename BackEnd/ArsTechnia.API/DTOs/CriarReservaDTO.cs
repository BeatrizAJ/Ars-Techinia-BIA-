
using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class CriarReservaDTO
    {
        [Range(1, int.MaxValue,
            ErrorMessage = "Selecione um local válido.")]
        public int IdLocal { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100, MinimumLength = 3,
            ErrorMessage = "O título deve ter entre 3 e 100 caracteres.")]
        public string Titulo { get; set; } = "";

        [Required(ErrorMessage = "A finalidade é obrigatória.")]
        [StringLength(500, MinimumLength = 5,
            ErrorMessage = "A finalidade deve ter entre 5 e 500 caracteres.")]
        public string Finalidade { get; set; } = "";

        [Required(ErrorMessage = "A data e hora de início são obrigatórias.")]
        public DateTime DataHoraInicio { get; set; }

        [Required(ErrorMessage = "A data e hora de término são obrigatórias.")]
        public DateTime DataHoraFim { get; set; }
    }
}
