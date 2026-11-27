
namespace ArsTechnia.API.DTOs
{
    public class LocalDTO
    {
        public int IdLocal { get; set; }

        public string Nome { get; set; } = "";

        public int? CapacidadePessoas { get; set; }

        public int? QuantidadeDivisoes { get; set; }

        public int? QuantidadeEquipamentos { get; set; }

        public int? QuantidadeRecursosDidaticos { get; set; }
    }
}
