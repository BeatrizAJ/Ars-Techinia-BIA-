using System.ComponentModel.DataAnnotations;

namespace ArsTechnia.API.DTOs
{
    public class AtualizarLocalDTO
    {
        [Required(ErrorMessage = "O nome do local é obrigatório.")]
        [StringLength(100, MinimumLength = 2,
            ErrorMessage = "O nome deve ter entre 2 e 100 caracteres.")]
        public string Nome { get; set; } = "";

        [Required(ErrorMessage = "A capacidade do local é obrigatória.")]
        [Range(1, int.MaxValue,
            ErrorMessage = "A capacidade deve ser maior que zero.")]
        public int? CapacidadePessoas { get; set; }

        [Range(0, int.MaxValue,
            ErrorMessage = "A quantidade de divisões não pode ser negativa.")]
        public int? QuantidadeDivisoes { get; set; }

        [Range(0, int.MaxValue,
            ErrorMessage = "A quantidade de equipamentos não pode ser negativa.")]
        public int? QuantidadeEquipamentos { get; set; }

        [Range(0, int.MaxValue,
            ErrorMessage = "A quantidade de recursos didáticos não pode ser negativa.")]
        public int? QuantidadeRecursosDidaticos { get; set; }
    }
}