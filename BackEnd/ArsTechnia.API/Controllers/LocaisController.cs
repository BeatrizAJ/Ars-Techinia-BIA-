using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ArsTechnia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LocaisController : ControllerBase
    {
        private readonly ILocalService _localService;

        public LocaisController(ILocalService localService)
        {
            _localService = localService;
        }

        // Listar todos os locais
        [HttpGet]
        public async Task<IActionResult> GetLocais()
        {
            var locais = await _localService.ListarAsync();

            return Ok(locais);
        }

        // Buscar local pelo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocal(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de local válido.");
            }

            var local = await _localService.BuscarPorIdAsync(id);

            if (local == null)
            {
                return NotFound("Local não encontrado.");
            }

            return Ok(local);
        }

        // Cadastrar um novo local
        [HttpPost]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> PostLocal(CriarLocalDTO dados)
        {
            try
            {
                var local = await _localService.CriarAsync(dados);

                return CreatedAtAction(
                    nameof(GetLocal),
                    new { id = local.IdLocal },
                    local
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Atualizar um local
        [HttpPut("{id}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> PutLocal(
            int id, AtualizarLocalDTO dados)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de local válido.");
            }

            try
            {
                bool atualizado = await _localService.AtualizarAsync(
                    id, dados);

                if (!atualizado)
                {
                    return NotFound("Local não encontrado.");
                }

                return Ok("Local atualizado com sucesso.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Excluir um local
        [HttpDelete("{id}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> DeleteLocal(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de local válido.");
            }

            try
            {
                bool excluido = await _localService.ExcluirAsync(id);

                if (!excluido)
                {
                    return NotFound("Local não encontrado.");
                }

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (DbUpdateException)
            {
                return Conflict(
                    "Não foi possível excluir este local porque existem registros vinculados a ele."
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}