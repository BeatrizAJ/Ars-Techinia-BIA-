
using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class HistoricoReservaDTO
    {
        public int IdHistorico { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int? IdReserva { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int? IdUsuario { get; set; }

        [StringLength(30)]
        public string? StatusAnterior { get; set; }

        [Required]
        [StringLength(30)]
        public string? StatusNovo { get; set; }

        [StringLength(500)]
        public string? Observacao { get; set; }

        [Required]
        public DateTime? DataAlteracao { get; set; }
    }
}
