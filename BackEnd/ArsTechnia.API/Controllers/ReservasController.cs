using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ArsTechnia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservasController : ControllerBase
    {
        private readonly IReservaService _reservaService;

        public ReservasController(IReservaService reservaService)
        {
            _reservaService = reservaService;
        }

        // Obter ID e papel do usuário pelo token JWT
        private bool TentarObterDadosUsuario(
            out int idUsuario, out int idPapel)
        {
            idUsuario = 0;
            idPapel = 0;

            var identificador = User.FindFirst(
                ClaimTypes.NameIdentifier)?.Value;

            var papel = User.FindFirst(
                ClaimTypes.Role)?.Value;

            if (!int.TryParse(identificador, out idUsuario))
            {
                return false;
            }

            if (!int.TryParse(papel, out idPapel))
            {
                return false;
            }

            // Verificar se os identificadores são válidos
            if (idUsuario <= 0 || idPapel <= 0)
            {
                return false;
            }

            return true;
        }

        // Listar reservas
        [HttpGet]
        public async Task<IActionResult> GetReservas()
        {
            if (!TentarObterDadosUsuario(
                out int idUsuario, out int idPapel))
            {
                return Unauthorized("Token inválido.");
            }

            var reservas = await _reservaService.ListarAsync(
                idUsuario, idPapel);

            return Ok(reservas);
        }

        // Buscar reserva pelo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReserva(int id)
        {
            if (id <= 0)
            {
                return BadRequest(
                    "Informe um ID de reserva válido.");
            }

            if (!TentarObterDadosUsuario(
                out int idUsuario, out int idPapel))
            {
                return Unauthorized("Token inválido.");
            }

            var reserva = await _reservaService.BuscarPorIdAsync(
                id, idUsuario, idPapel);

            if (reserva == null)
            {
                return NotFound("Reserva não encontrada.");
            }

            return Ok(reserva);
        }

        // Criar uma nova reserva
        [HttpPost]
        [Authorize(Roles = "2,4")]
        public async Task<IActionResult> PostReserva(
            CriarReservaDTO dados)
        {
            try
            {
                if (!TentarObterDadosUsuario(
                    out int idUsuario, out _))
                {
                    return Unauthorized("Token inválido.");
                }

                var reserva = await _reservaService.CriarAsync(
                    dados, idUsuario);

                return CreatedAtAction(
                    nameof(GetReserva),
                    new { id = reserva.IdReserva },
                    reserva
                );
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Aprovar, rejeitar ou cancelar uma reserva
        [HttpPut("{id}/decisao")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> DecidirReserva(
            int id, DecidirReservaDTO decisao)
        {
            if (id <= 0)
            {
                return BadRequest(
                    "Informe um ID de reserva válido.");
            }

            try
            {
                if (!TentarObterDadosUsuario(
                    out int idAdministrador, out _))
                {
                    return Unauthorized("Token inválido.");
                }

                bool resultado = await _reservaService.DecidirAsync(
                    id, decisao, idAdministrador);

                if (!resultado)
                {
                    return NotFound("Reserva não encontrada.");
                }

                return Ok("Decisão registrada com sucesso.");
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}