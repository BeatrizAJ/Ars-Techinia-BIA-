
using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ArsTechnia.API.Services
{
    public class LoginService : ILoginService
    {
        private readonly ArsTechniaContext _context;
        private readonly IConfiguration _configuration;

        public LoginService(
            ArsTechniaContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string?> LoginAsync(LoginDTO dados)
        {
            // Validar dados recebidos
            if (dados == null ||
                string.IsNullOrWhiteSpace(dados.Email) ||
                string.IsNullOrEmpty(dados.Senha))
            {
                return null;
            }

            string email = dados.Email.Trim();

            // Buscar usuário pelo e-mail
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            // Verificar se o usuário existe e está ativo
            if (usuario == null || usuario.Ativo != true)
            {
                return null;
            }

            // Verificar senha com BCrypt
            bool senhaCorreta = BCrypt.Net.BCrypt.Verify(
                dados.Senha,
                usuario.Senha
            );

            if (!senhaCorreta)
            {
                return null;
            }

            // Obter configurações JWT
            var chave = _configuration["Jwt:Chave"];
            var emissor = _configuration["Jwt:Emissor"];
            var audiencia = _configuration["Jwt:Audiencia"];

            if (string.IsNullOrWhiteSpace(chave) ||
                Encoding.UTF8.GetByteCount(chave) < 32)
            {
                throw new InvalidOperationException(
                    "A chave JWT não foi configurada corretamente.");
            }

            if (string.IsNullOrWhiteSpace(emissor) ||
                string.IsNullOrWhiteSpace(audiencia))
            {
                throw new InvalidOperationException(
                    "As configurações de emissor e audiência JWT são obrigatórias.");
            }

            // Criar informações do usuário no token
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    usuario.IdUsuario.ToString()),

                new Claim(
                    ClaimTypes.Name,
                    usuario.Nome ?? ""),

                new Claim(
                    ClaimTypes.Email,
                    usuario.Email ?? ""),

                new Claim(
                    ClaimTypes.Role,
                    Convert.ToString(usuario.IdPapel) ?? "")
            };

            // Criar chave de segurança
            var chaveSeguranca = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chave)
            );

            // Criar credenciais
            var credenciais = new SigningCredentials(
                chaveSeguranca,
                SecurityAlgorithms.HmacSha256
            );

            // Gerar token com validade de duas horas
            var token = new JwtSecurityToken(
                issuer: emissor,
                audience: audiencia,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credenciais
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
