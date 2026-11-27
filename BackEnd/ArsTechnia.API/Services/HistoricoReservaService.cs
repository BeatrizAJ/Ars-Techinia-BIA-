
using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ArsTechnia.API.Services
{
    public class HistoricoReservaService : IHistoricoReservaService
    {
        private readonly ArsTechniaContext _context;

        public HistoricoReservaService(ArsTechniaContext context)
        {
            _context = context;
        }

        // Listar todo o histórico
        public async Task<List<HistoricoReservaDTO>> ListarAsync()
        {
            var historicos = await _context.HistoricoReservas
                .OrderBy(h => h.DataAlteracao)
                .ThenBy(h => h.IdHistorico)
                .ToListAsync();

            return historicos
                .Select(h => ConverterParaDTO(h))
                .ToList();
        }

        // Buscar histórico de uma reserva específica
        public async Task<List<HistoricoReservaDTO>> BuscarPorReservaAsync(
            int idReserva)
        {
            if (idReserva <= 0)
            {
                throw new ArgumentException(
                    "Informe um ID de reserva válido.");
            }

            // Verificar se a reserva existe
            bool reservaExiste = await _context.Reservas
                .AnyAsync(r => r.IdReserva == idReserva);

            if (!reservaExiste)
            {
                throw new ArgumentException(
                    "Reserva não encontrada.");
            }

            var historicos = await _context.HistoricoReservas
                .Where(h => h.IdReserva == idReserva)
                .OrderBy(h => h.DataAlteracao)
                .ThenBy(h => h.IdHistorico)
                .ToListAsync();

            return historicos
                .Select(h => ConverterParaDTO(h))
                .ToList();
        }

        // Converter os dados para DTO
        private HistoricoReservaDTO ConverterParaDTO(
            HistoricoReserva historico)
        {
            return new HistoricoReservaDTO
            {
                IdHistorico = historico.IdHistorico,
                IdReserva = historico.IdReserva,
                IdUsuario = historico.IdUsuario,
                StatusAnterior = historico.StatusAnterior,
                StatusNovo = historico.StatusNovo,
                Observacao = historico.Observacao,
                DataAlteracao = historico.DataAlteracao
            };
        }
    }
}
