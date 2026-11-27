using ArsTechnia.API.DTOs;

namespace ArsTechnia.API.Interfaces
{
    public interface ILocalService
    {
        Task<List<LocalDTO>> ListarAsync();

        Task<LocalDTO?> BuscarPorIdAsync(int id);

        Task<LocalDTO> CriarAsync(CriarLocalDTO local);

        Task<bool> AtualizarAsync(int id, AtualizarLocalDTO local);

        Task<bool> ExcluirAsync(int id);
    }
}