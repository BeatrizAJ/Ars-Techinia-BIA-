
using ArsTechnia.API.DTOs;

namespace ArsTechnia.API.Interfaces
{
    public interface IReservaService
    {
        Task<List<ReservaDTO>> ListarAsync(int idUsuario, int idPapel);

        Task<ReservaDTO?> BuscarPorIdAsync(int id, int idUsuario, int idPapel);

        Task<ReservaDTO> CriarAsync(CriarReservaDTO reserva, int idUsuario);

        Task<bool> DecidirAsync(int id, DecidirReservaDTO decisao, int idAdministrador);
    }
}
