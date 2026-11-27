using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ArsTechnia.API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly ArsTechniaContext _context;

        public UsuarioService(ArsTechniaContext context)
        {
            _context = context;
        }

        // Listar todos os usuários
        public async Task<List<UsuarioDTO>> ListarAsync()
        {
            var usuarios = await _context.Usuarios
                .Select(u => new UsuarioDTO
                {
                    IdUsuario = u.IdUsuario,
                    IdPapel = u.IdPapel ?? 0,
                    Nome = u.Nome ?? "",
                    Email = u.Email ?? "",
                    Ativo = u.Ativo ?? false
                })
                .ToListAsync();

            return usuarios;
        }

        // Buscar usuário pelo ID
        public async Task<UsuarioDTO?> BuscarPorIdAsync(int id)
        {
            if (id <= 0)
            {
                return null;
            }

            var usuario = await _context.Usuarios
                .Where(u => u.IdUsuario == id)
                .Select(u => new UsuarioDTO
                {
                    IdUsuario = u.IdUsuario,
                    IdPapel = u.IdPapel ?? 0,
                    Nome = u.Nome ?? "",
                    Email = u.Email ?? "",
                    Ativo = u.Ativo ?? false
                })
                .FirstOrDefaultAsync();

            return usuario;
        }

        // Cadastrar professor ou empresa
        public async Task<UsuarioDTO> CriarAsync(CriarUsuarioDTO dados)
        {
            if (dados == null)
            {
                throw new ArgumentException(
                    "Informe os dados do usuário.");
            }

            if (string.IsNullOrWhiteSpace(dados.Nome) ||
                string.IsNullOrWhiteSpace(dados.Email) ||
                string.IsNullOrWhiteSpace(dados.Senha))
            {
                throw new ArgumentException(
                    "Preencha todos os campos.");
            }

            if (dados.IdPapel != 2 && dados.IdPapel != 4)
            {
                throw new ArgumentException(
                    "Somente professores e empresas podem se cadastrar.");
            }

            string nome = dados.Nome.Trim();
            string email = dados.Email.Trim();

            if (nome.Length < 3 || nome.Length > 100)
            {
                throw new ArgumentException(
                    "O nome deve ter entre 3 e 100 caracteres.");
            }

            if (email.Length > 150)
            {
                throw new ArgumentException(
                    "O e-mail deve ter no máximo 150 caracteres.");
            }

            if (dados.Senha.Length < 8 || dados.Senha.Length > 100)
            {
                throw new ArgumentException(
                    "A senha deve ter entre 8 e 100 caracteres.");
            }

            bool emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email == email);

            if (emailExiste)
            {
                throw new ArgumentException(
                    "Este e-mail já está cadastrado.");
            }

            var usuario = new Usuario
            {
                Nome = nome,
                Email = email,
                Senha = BCrypt.Net.BCrypt.HashPassword(dados.Senha),
                IdPapel = dados.IdPapel,
                Ativo = true
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return new UsuarioDTO
            {
                IdUsuario = usuario.IdUsuario,
                IdPapel = usuario.IdPapel ?? 0,
                Nome = usuario.Nome ?? "",
                Email = usuario.Email ?? "",
                Ativo = usuario.Ativo ?? false
            };
        }

        // Atualizar usuário
        public async Task<bool> AtualizarAsync(
            int id, AtualizarUsuarioDTO dados)
        {
            if (id <= 0)
            {
                throw new ArgumentException(
                    "Informe um ID de usuário válido.");
            }

            if (dados == null)
            {
                throw new ArgumentException(
                    "Informe os dados para atualização.");
            }

            if (string.IsNullOrWhiteSpace(dados.Nome) ||
                string.IsNullOrWhiteSpace(dados.Email))
            {
                throw new ArgumentException(
                    "Preencha nome e e-mail.");
            }

            string nome = dados.Nome.Trim();
            string email = dados.Email.Trim();

            if (nome.Length < 3 || nome.Length > 100)
            {
                throw new ArgumentException(
                    "O nome deve ter entre 3 e 100 caracteres.");
            }

            if (email.Length > 150)
            {
                throw new ArgumentException(
                    "O e-mail deve ter no máximo 150 caracteres.");
            }

            if (!string.IsNullOrWhiteSpace(dados.Senha) &&
                (dados.Senha.Length < 8 || dados.Senha.Length > 100))
            {
                throw new ArgumentException(
                    "A senha deve ter entre 8 e 100 caracteres.");
            }

            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return false;
            }

            if (usuario.Ativo == false)
            {
                throw new ArgumentException(
                    "Não é possível atualizar um usuário desativado.");
            }

            bool emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email == email && u.IdUsuario != id);

            if (emailExiste)
            {
                throw new ArgumentException(
                    "Este e-mail já está cadastrado.");
            }

            usuario.Nome = nome;
            usuario.Email = email;

            // Atualiza a senha somente se uma nova senha for informada
            if (!string.IsNullOrWhiteSpace(dados.Senha))
            {
                usuario.Senha = BCrypt.Net.BCrypt.HashPassword(
                    dados.Senha);
            }

            await _context.SaveChangesAsync();

            return true;
        }

        // Desativar usuário sem apagar seus registros
        public async Task<bool> ExcluirAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException(
                    "Informe um ID de usuário válido.");
            }

            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return false;
            }

            if (usuario.Ativo == false)
            {
                return false;
            }

            usuario.Ativo = false;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}