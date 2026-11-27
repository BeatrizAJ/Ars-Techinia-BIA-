using ArsTechnia.API.DTOs;

namespace ArsTechnia.API.Interfaces
{
    public interface IHistoricoReservaService
    {
        Task<List<HistoricoReservaDTO>> ListarAsync();

        Task<List<HistoricoReservaDTO>> BuscarPorReservaAsync(int idReserva);
    }
}