using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ArsTechnia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // Listar todos os usuários
        [HttpGet]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _usuarioService.ListarAsync();

            return Ok(usuarios);
        }

        // Buscar usuário pelo ID
        [HttpGet("{id}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> GetUsuario(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de usuário válido.");
            }

            var usuario = await _usuarioService.BuscarPorIdAsync(id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(usuario);
        }

        // Cadastrar usuário
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostUsuario(CriarUsuarioDTO dados)
        {
            try
            {
                var usuario = await _usuarioService.CriarAsync(dados);

                return CreatedAtAction(
                    nameof(GetUsuario),
                    new { id = usuario.IdUsuario },
                    usuario
                );
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Atualizar usuário
        [HttpPut("{id}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> PutUsuario(
            int id, AtualizarUsuarioDTO dados)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de usuário válido.");
            }

            try
            {
                bool atualizado = await _usuarioService.AtualizarAsync(
                    id, dados);

                if (!atualizado)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return Ok("Usuário atualizado com sucesso.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Excluir usuário
        [HttpDelete("{id}")]
        [Authorize(Roles = "3")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Informe um ID de usuário válido.");
            }

            try
            {
                bool excluido = await _usuarioService.ExcluirAsync(id);

                if (!excluido)
                {
                    return NotFound("Usuário não encontrado.");
                }

                return NoContent();
            }
            catch (DbUpdateException)
            {
                return Conflict(
                    "Não foi possível excluir este usuário porque existem registros vinculados a ele."
                );
            }
        }
    }
}