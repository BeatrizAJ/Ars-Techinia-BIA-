
using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArsTechnia.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        // Realizar login
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login(
            [FromBody] LoginDTO dados)
        {
            try
            {
                var token = await _loginService.LoginAsync(dados);

                if (token == null)
                {
                    return Unauthorized(
                        "E-mail ou senha incorretos.");
                }

                return Ok(new
                {
                    mensagem = "Login realizado com sucesso.",
                    token = token
                }); 
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
