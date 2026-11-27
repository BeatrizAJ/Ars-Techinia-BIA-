using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ArsTechnia.API.Services
{
    public class LocalService : ILocalService
    {
        private readonly ArsTechniaContext _context;

        public LocalService(ArsTechniaContext context)
        {
            _context = context;
        }

        // Validar os dados do local
        private void ValidarLocal(
            string? nome,
            int? capacidade,
            int? divisoes,
            int? equipamentos,
            int? recursosDidaticos)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException(
                    "Informe o nome do local.");
            }

            if (nome.Trim().Length < 2 || nome.Trim().Length > 100)
            {
                throw new ArgumentException(
                    "O nome do local deve ter entre 2 e 100 caracteres.");
            }

            if (!capacidade.HasValue || capacidade.Value < 1)
            {
                throw new ArgumentException(
                    "A capacidade deve ser de pelo menos 1 pessoa.");
            }

            if (divisoes < 0)
            {
                throw new ArgumentException(
                    "A quantidade de divisões não pode ser negativa.");
            }

            if (equipamentos < 0)
            {
                throw new ArgumentException(
                    "A quantidade de equipamentos não pode ser negativa.");
            }

            if (recursosDidaticos < 0)
            {
                throw new ArgumentException(
                    "A quantidade de recursos didáticos não pode ser negativa.");
            }
        }

        // Listar locais
        public async Task<List<LocalDTO>> ListarAsync()
        {
            var locais = await _context.Locais
                .Select(l => new LocalDTO
                {
                    IdLocal = l.IdLocal,
                    Nome = l.Nome ?? "",
                    CapacidadePessoas = l.CapacidadePessoas,
                    QuantidadeDivisoes = l.QuantidadeDivisoes,
                    QuantidadeEquipamentos = l.QuantidadeEquipamentos,
                    QuantidadeRecursosDidaticos = l.QuantidadeRecursosDidaticos
                })
                .ToListAsync();

            return locais;
        }

        // Buscar local pelo ID
        public async Task<LocalDTO?> BuscarPorIdAsync(int id)
        {
            if (id <= 0)
            {
                return null;
            }

            var local = await _context.Locais
                .Where(l => l.IdLocal == id)
                .Select(l => new LocalDTO
                {
                    IdLocal = l.IdLocal,
                    Nome = l.Nome ?? "",
                    CapacidadePessoas = l.CapacidadePessoas,
                    QuantidadeDivisoes = l.QuantidadeDivisoes,
                    QuantidadeEquipamentos = l.QuantidadeEquipamentos,
                    QuantidadeRecursosDidaticos = l.QuantidadeRecursosDidaticos
                })
                .FirstOrDefaultAsync();

            return local;
        }

        // Criar local
        public async Task<LocalDTO> CriarAsync(CriarLocalDTO dados)
        {
            if (dados == null)
            {
                throw new ArgumentException(
                    "Informe os dados do local.");
            }

            ValidarLocal(
                dados.Nome,
                dados.CapacidadePessoas,
                dados.QuantidadeDivisoes,
                dados.QuantidadeEquipamentos,
                dados.QuantidadeRecursosDidaticos
            );

            var local = new Locai
            {
                Nome = dados.Nome.Trim(),
                CapacidadePessoas = dados.CapacidadePessoas,
                QuantidadeDivisoes = dados.QuantidadeDivisoes,
                QuantidadeEquipamentos = dados.QuantidadeEquipamentos,
                QuantidadeRecursosDidaticos = dados.QuantidadeRecursosDidaticos
            };

            _context.Locais.Add(local);
            await _context.SaveChangesAsync();

            return new LocalDTO
            {
                IdLocal = local.IdLocal,
                Nome = local.Nome ?? "",
                CapacidadePessoas = local.CapacidadePessoas,
                QuantidadeDivisoes = local.QuantidadeDivisoes,
                QuantidadeEquipamentos = local.QuantidadeEquipamentos,
                QuantidadeRecursosDidaticos = local.QuantidadeRecursosDidaticos
            };
        }

        // Atualizar local
        public async Task<bool> AtualizarAsync(
            int id, AtualizarLocalDTO dados)
        {
            if (id <= 0)
            {
                throw new ArgumentException(
                    "Informe um ID de local válido.");
            }

            if (dados == null)
            {
                throw new ArgumentException(
                    "Informe os dados para atualização.");
            }

            ValidarLocal(
                dados.Nome,
                dados.CapacidadePessoas,
                dados.QuantidadeDivisoes,
                dados.QuantidadeEquipamentos,
                dados.QuantidadeRecursosDidaticos
            );

            var local = await _context.Locais.FindAsync(id);

            if (local == null)
            {
                return false;
            }

            local.Nome = dados.Nome.Trim();
            local.CapacidadePessoas = dados.CapacidadePessoas;
            local.QuantidadeDivisoes = dados.QuantidadeDivisoes;
            local.QuantidadeEquipamentos = dados.QuantidadeEquipamentos;
            local.QuantidadeRecursosDidaticos = dados.QuantidadeRecursosDidaticos;

            await _context.SaveChangesAsync();

            return true;
        }

        // Excluir local
        public async Task<bool> ExcluirAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException(
                    "Informe um ID de local válido.");
            }

            var local = await _context.Locais.FindAsync(id);

            if (local == null)
            {
                return false;
            }

            // Verificar se existem reservas vinculadas
            bool possuiReservas = await _context.Reservas
                .AnyAsync(r => r.IdLocal == id);

            if (possuiReservas)
            {
                throw new InvalidOperationException(
                    "Não é possível excluir este local porque existem reservas vinculadas.");
            }

            // Verificar se existem divisões vinculadas
            bool possuiDivisoes = await _context.Divisoes
                .AnyAsync(d => d.IdLocal == id);

            if (possuiDivisoes)
            {
                throw new InvalidOperationException(
                    "Não é possível excluir este local porque existem divisões vinculadas.");
            }

            _context.Locais.Remove(local);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}