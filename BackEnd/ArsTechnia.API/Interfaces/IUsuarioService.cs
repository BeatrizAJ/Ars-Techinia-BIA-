using ArsTechnia.API.DTOs;

namespace ArsTechnia.API.Interfaces
{
    public interface IUsuarioService
    {
        Task<List<UsuarioDTO>> ListarAsync();

        Task<UsuarioDTO?> BuscarPorIdAsync(int id);

        Task<UsuarioDTO> CriarAsync(CriarUsuarioDTO usuario);

        Task<bool> AtualizarAsync(int id, AtualizarUsuarioDTO usuario);

        Task<bool> ExcluirAsync(int id);
    }
}