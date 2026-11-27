using ArsTechnia.API.DTOs;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ArsTechnia.API.Services
{
    public class ReservaService : IReservaService
    {
        private readonly ArsTechniaContext _context;

        public ReservaService(ArsTechniaContext context)
        {
            _context = context;
        }

        // Listar reservas
        public async Task<List<ReservaDTO>> ListarAsync(
            int idUsuario, int idPapel)
        {
            var consulta = _context.Reservas
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdLocalNavigation)
                .Include(r => r.IdAdministradorNavigation)
                .AsQueryable();

            // Professor e Empresa visualizam somente suas reservas
            if (idPapel != 3)
            {
                consulta = consulta.Where(
                    r => r.IdUsuario == idUsuario);
            }

            var reservas = await consulta.ToListAsync();

            return reservas.Select(r => ConverterParaDTO(r)).ToList();
        }

        // Buscar reserva pelo ID
        public async Task<ReservaDTO?> BuscarPorIdAsync(
            int id, int idUsuario, int idPapel)
        {
            var consulta = _context.Reservas
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdLocalNavigation)
                .Include(r => r.IdAdministradorNavigation)
                .Where(r => r.IdReserva == id);

            if (idPapel != 3)
            {
                consulta = consulta.Where(
                    r => r.IdUsuario == idUsuario);
            }

            var reserva = await consulta.FirstOrDefaultAsync();

            if (reserva == null)
            {
                return null;
            }

            return ConverterParaDTO(reserva);
        }

        // Criar uma nova reserva
        public async Task<ReservaDTO> CriarAsync(
            CriarReservaDTO dados, int idUsuario)
        {
            // Validar dados recebidos
            if (dados == null)
            {
                throw new ArgumentException(
                    "Os dados da reserva são obrigatórios.");
            }

            // Validar título e finalidade
            string titulo = dados.Titulo?.Trim() ?? "";
            string finalidade = dados.Finalidade?.Trim() ?? "";

            if (titulo.Length < 3 || titulo.Length > 100)
            {
                throw new ArgumentException(
                    "O título deve ter entre 3 e 100 caracteres.");
            }

            if (finalidade.Length < 5 || finalidade.Length > 500)
            {
                throw new ArgumentException(
                    "A finalidade deve ter entre 5 e 500 caracteres.");
            }

            if (dados.IdLocal <= 0)
            {
                throw new ArgumentException(
                    "Informe uma sala válida.");
            }

            // Validar datas
            if (dados.DataHoraInicio == default ||
                dados.DataHoraFim == default)
            {
                throw new ArgumentException(
                    "Informe as datas de início e término.");
            }

            if (dados.DataHoraInicio <= DateTime.Now)
            {
                throw new ArgumentException(
                    "A data de início deve ser futura.");
            }

            if (dados.DataHoraInicio >= dados.DataHoraFim)
            {
                throw new ArgumentException(
                    "A data de início deve ser anterior à data de término.");
            }

            if (idUsuario <= 0)
            {
                throw new ArgumentException(
                    "Usuário inválido.");
            }

            // Verificar usuário
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);

            if (usuario == null || usuario.Ativo != true)
            {
                throw new ArgumentException(
                    "Usuário não encontrado ou inativo.");
            }

            // Somente Professor e Empresa podem solicitar
            if (usuario.IdPapel != 2 && usuario.IdPapel != 4)
            {
                throw new ArgumentException(
                    "Somente professores e empresas podem solicitar reservas.");
            }

            // Verificar se a sala existe
            bool salaExiste = await _context.Locais
                .AnyAsync(l => l.IdLocal == dados.IdLocal);

            if (!salaExiste)
            {
                throw new ArgumentException(
                    "Sala não encontrada.");
            }

            // Iniciar transação com proteção contra conflitos simultâneos
            await using var transacao =
                await _context.Database.BeginTransactionAsync(
                    IsolationLevel.Serializable);

            // Verificar conflito de horário
            bool conflito = await _context.Reservas.AnyAsync(r =>
                r.IdLocal == dados.IdLocal &&
                r.DataHoraInicio < dados.DataHoraFim &&
                r.DataHoraFim > dados.DataHoraInicio &&
                (r.Status == "Pendente" ||
                 r.Status == "Aprovada")
            );

            if (conflito)
            {
                throw new InvalidOperationException(
                    "Essa sala já possui uma reserva nesse horário.");
            }

            var agora = DateTime.Now;

            var reserva = new Reserva
            {
                IdUsuario = idUsuario,
                IdLocal = dados.IdLocal,
                Titulo = titulo,
                Finalidade = finalidade,
                DataHoraInicio = dados.DataHoraInicio,
                DataHoraFim = dados.DataHoraFim,
                DataSolicitacao = agora,
                Status = "Pendente"
            };

            _context.Reservas.Add(reserva);

            await _context.SaveChangesAsync();

            // Criar histórico inicial
            var historico = new HistoricoReserva
            {
                IdReserva = reserva.IdReserva,
                IdUsuario = idUsuario,
                StatusAnterior = null,
                StatusNovo = "Pendente",
                Observacao = "Solicitação criada.",
                DataAlteracao = agora
            };

            _context.HistoricoReservas.Add(historico);

            await _context.SaveChangesAsync();

            // Confirmar as duas operações
            await transacao.CommitAsync();

            // Carregar informações para o DTO
            await _context.Entry(reserva)
                .Reference(r => r.IdUsuarioNavigation)
                .LoadAsync();

            await _context.Entry(reserva)
                .Reference(r => r.IdLocalNavigation)
                .LoadAsync();

            return ConverterParaDTO(reserva);
        }

        // Aprovar, rejeitar ou cancelar uma reserva
        public async Task<bool> DecidirAsync(
            int id, DecidirReservaDTO decisao, int idAdministrador)
        {
            // Validar dados recebidos
            if (decisao == null)
            {
                throw new ArgumentException(
                    "Informe os dados da decisão.");
            }

            if (id <= 0 || idAdministrador <= 0)
            {
                throw new ArgumentException(
                    "Identificação da reserva ou administrador inválida.");
            }

            string acao = decisao.Acao?.Trim() ?? "";

            string? observacao =
                string.IsNullOrWhiteSpace(decisao.ObservacaoDecisao)
                ? null
                : decisao.ObservacaoDecisao.Trim();

            // Validar tamanho da observação
            if (observacao != null && observacao.Length > 500)
            {
                throw new ArgumentException(
                    "A observação deve ter no máximo 500 caracteres.");
            }

            // Iniciar transação para proteger as decisões simultâneas
            await using var transacao =
                await _context.Database.BeginTransactionAsync(
                    IsolationLevel.Serializable);

            // Verificar administrador
            var administrador = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == idAdministrador);

            if (administrador == null ||
                administrador.IdPapel != 3 ||
                administrador.Ativo != true)
            {
                throw new ArgumentException(
                    "Administrador não encontrado ou inválido.");
            }

            // Buscar reserva
            var reserva = await _context.Reservas
                .FirstOrDefaultAsync(r => r.IdReserva == id);

            if (reserva == null)
            {
                return false;
            }

            string novoStatus;

            if (acao == "Aprovar")
            {
                if (reserva.Status != "Pendente")
                {
                    throw new ArgumentException(
                        "Somente reservas pendentes podem ser aprovadas.");
                }

                // Verificar outras reservas pendentes ou aprovadas
                bool conflito = await _context.Reservas.AnyAsync(r =>
                    r.IdReserva != id &&
                    r.IdLocal == reserva.IdLocal &&
                    r.DataHoraInicio < reserva.DataHoraFim &&
                    r.DataHoraFim > reserva.DataHoraInicio &&
                    (r.Status == "Pendente" ||
                     r.Status == "Aprovada")
                );

                if (conflito)
                {
                    throw new ArgumentException(
                        "Já existe outra reserva pendente ou aprovada nesse horário.");
                }

                novoStatus = "Aprovada";
            }
            else if (acao == "Rejeitar")
            {
                if (reserva.Status != "Pendente")
                {
                    throw new ArgumentException(
                        "Somente reservas pendentes podem ser rejeitadas.");
                }

                if (observacao == null)
                {
                    throw new ArgumentException(
                        "Informe o motivo da rejeição.");
                }

                novoStatus = "Rejeitada";
            }
            else if (acao == "Cancelar")
            {
                if (reserva.Status != "Pendente" &&
                    reserva.Status != "Aprovada")
                {
                    throw new ArgumentException(
                        "Somente reservas pendentes ou aprovadas podem ser canceladas.");
                }

                if (observacao == null)
                {
                    throw new ArgumentException(
                        "Informe o motivo do cancelamento.");
                }

                novoStatus = "Cancelada";
            }
            else
            {
                throw new ArgumentException(
                    "Ação inválida. Use Aprovar, Rejeitar ou Cancelar.");
            }

            string? statusAnterior = reserva.Status;

            var agora = DateTime.Now;

            reserva.Status = novoStatus;
            reserva.IdAdministrador = idAdministrador;
            reserva.DataDecisao = agora;
            reserva.ObservacaoDecisao = observacao;

            // Registrar alteração no histórico
            var historico = new HistoricoReserva
            {
                IdReserva = reserva.IdReserva,
                IdUsuario = idAdministrador,
                StatusAnterior = statusAnterior,
                StatusNovo = novoStatus,
                Observacao = observacao,
                DataAlteracao = agora
            };

            _context.HistoricoReservas.Add(historico);

            // Salvar a alteração e o histórico
            await _context.SaveChangesAsync();

            // Confirmar a operação
            await transacao.CommitAsync();

            return true;
        }

        // Converter para DTO
        private ReservaDTO ConverterParaDTO(Reserva reserva)
        {
            return new ReservaDTO
            {
                IdReserva = reserva.IdReserva,
                Titulo = reserva.Titulo ?? "",
                Finalidade = reserva.Finalidade ?? "",
                DataHoraInicio = reserva.DataHoraInicio ?? DateTime.MinValue,
                DataHoraFim = reserva.DataHoraFim ?? DateTime.MinValue,
                Status = reserva.Status ?? "",
                NomeUsuario = reserva.IdUsuarioNavigation?.Nome ?? "",
                NomeLocal = reserva.IdLocalNavigation?.Nome ?? "",
                NomeAdministrador = reserva.IdAdministradorNavigation?.Nome,
                DataSolicitacao = reserva.DataSolicitacao,
                DataDecisao = reserva.DataDecisao,
                ObservacaoDecisao = reserva.ObservacaoDecisao
            };
        }
    }
}