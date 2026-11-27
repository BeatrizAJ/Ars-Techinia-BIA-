using ArsTechnia.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ArsTechnia.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HistoricoReservasController : ControllerBase
    {
        private readonly IHistoricoReservaService _historicoService;

        public HistoricoReservasController(
            IHistoricoReservaService historicoService)
        {
            _historicoService = historicoService;
        }

        // Listar todo o histórico
        [HttpGet]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetHistoricos()
        {
            var historicos = await _historicoService.ListarAsync();

            return Ok(historicos);
        }

        // Buscar histórico de uma reserva específica
        [HttpGet("reserva/{idReserva}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetHistoricoPorReserva(
            int idReserva)
        {
            if (idReserva <= 0)
            {
                return BadRequest(
                    "Informe um ID de reserva válido.");
            }

            try
            {
                var historicos =
                    await _historicoService.BuscarPorReservaAsync(
                        idReserva);

                return Ok(historicos);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}