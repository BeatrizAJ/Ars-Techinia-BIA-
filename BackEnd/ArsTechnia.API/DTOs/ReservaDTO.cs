
    using System.ComponentModel.DataAnnotations;

    namespace ArsTechnia.API.DTOs
    {
        public class ReservaDTO
        {
            public int IdReserva { get; set; }

            [Required]
            [StringLength(100)]
            public string Titulo { get; set; } = "";

            [Required]
            [StringLength(500)]
            public string Finalidade { get; set; } = "";

            public DateTime DataHoraInicio { get; set; }

            public DateTime DataHoraFim { get; set; }

            [Required]
            [StringLength(30)]
            public string Status { get; set; } = "";

            [Required]
            [StringLength(100)]
            public string NomeUsuario { get; set; } = "";

            [Required]
            [StringLength(100)]
            public string NomeLocal { get; set; } = "";

            [StringLength(100)]
            public string? NomeAdministrador { get; set; }

            public DateTime? DataSolicitacao { get; set; }

            public DateTime? DataDecisao { get; set; }

            [StringLength(500)]
            public string? ObservacaoDecisao { get; set; }
        }
    }
