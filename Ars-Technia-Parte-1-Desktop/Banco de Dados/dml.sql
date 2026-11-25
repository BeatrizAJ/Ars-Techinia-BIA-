
USE ArsTechnia;
GO

-- 1. PAPEIS

INSERT INTO Papeis (Nome) VALUES
('Aluno'),
('Professor'),
('Administrador'),
('Empresa');
GO


-- 2. LOCAIS

INSERT INTO Locais
(Nome, CapacidadePessoas, QuantidadeDivisoes,
 QuantidadeEquipamentos, QuantidadeRecursosDidaticos)
VALUES
('Arena Cyber', 92, 3, 61, 15),
('Auditório', 132, 1, 5, 1),
('Sala 02', 19, 1, 22, 2),
('Sala 03', 18, 1, 21, 2),
('Sala 04 05', 42, 1, 38, 2),
('Sala 06 07', 42, 1, 42, 4),
('Sala 08', 30, 1, 0, 0),
('Estúdio de Gravação', 15, 1, 1, 0),
('Coworking', 84, 1, 6, 5),
('Sala 09 10', 48, 1, 44, 10),
('Sala 11 12 13', 54, 1, 48, 7),
('Sala 14 15', 42, 1, 42, 2),
('Sala 18', 30, 1, 21, 1),
('Sala 16 17', 24, 1, 38, 5),
('Sala 19 21 23', 56, 1, 114, 103),
('Sala 20 22', 48, 1, 96, 4),
('Sala 25', 18, 1, 18, 22),
('Sala 27 29', 42, 1, 44, 21),
('Sala 28', NULL, NULL, NULL, NULL),
('Sala 30 31', 37, 1, 37, 2);
GO


-- 3. USUARIOS

INSERT INTO Usuarios
(IdPapel, Nome, Email, Senha, Ativo)
VALUES
(1, 'Lucas Almeida', 'lucas.almeida@exemplo.com', 'hash_teste_01', 1),
(1, 'Mariana Santos', 'mariana.santos@exemplo.com', 'hash_teste_02', 1),
(2, 'Carlos Oliveira', 'carlos.oliveira@exemplo.com', 'hash_teste_03', 1),
(2, 'Fernanda Costa', 'fernanda.costa@exemplo.com', 'hash_teste_04', 1),
(3, 'Ana Souza', 'ana.souza@exemplo.com', 'hash_teste_05', 1),
(3, 'Pedro Lima', 'pedro.lima@exemplo.com', 'hash_teste_06', 1),
(4, 'Empresa Alfa', 'contato@empresa-alfa.exemplo.com', 'hash_teste_07', 1),
(2, 'Rafael Mendes', 'rafael.mendes@exemplo.com', 'hash_teste_08', 1);
GO


-- 4. DIVISOES

INSERT INTO Divisoes
(IdLocal, Nome, CapacidadePessoas, EquipamentosAssociados)
VALUES
(1, 'Arena Cyber - Área 1', 31, 'Computadores e periféricos'),
(1, 'Arena Cyber - Área 2', 31, 'Computadores e periféricos'),
(1, 'Arena Cyber - Área 3', 30, 'Computadores e periféricos'),
(2, 'Auditório - Área principal', 132, 'Sistema de som e projetor'),
(3, 'Sala 02 - Área principal', 19, 'Computadores e projetor'),
(4, 'Sala 03 - Área principal', 18, 'Computadores e projetor'),
(5, 'Sala 04 05 - Área principal', 42, 'Computadores e projetor'),
(6, 'Sala 06 07 - Área principal', 42, 'Computadores e projetor'),
(7, 'Sala 08 - Área principal', 30, 'Sem equipamentos cadastrados'),
(8, 'Estúdio - Área principal', 15, 'Equipamento de gravação'),
(9, 'Coworking - Área principal', 84, 'Mesas e computadores'),
(10, 'Sala 09 10 - Área principal', 48, 'Computadores e projetor'),
(11, 'Sala 11 12 13 - Área principal', 54, 'Computadores e projetor'),
(12, 'Sala 14 15 - Área principal', 42, 'Computadores e projetor'),
(13, 'Sala 18 - Área principal', 30, 'Computadores e projetor'),
(14, 'Sala 16 17 - Área principal', 24, 'Equipamentos compartilhados'),
(15, 'Sala 19 21 23 - Área principal', 56, 'Equipamentos diversos'),
(16, 'Sala 20 22 - Área principal', 48, 'Equipamentos diversos'),
(17, 'Sala 25 - Área principal', 18, 'Computadores e recursos didáticos'),
(18, 'Sala 27 29 - Área principal', 42, 'Computadores e recursos didáticos'),
(20, 'Sala 30 31 - Área principal', 37, 'Computadores e projetor');
GO


-- 5. EQUIPAMENTOS
-- Quantidades agrupadas por local, conforme a planilha.

INSERT INTO Equipamentos
(IdLocal, Nome, Quantidade)
VALUES
(1, 'Equipamentos diversos - Arena Cyber', 61),
(2, 'Equipamentos diversos - Auditório', 5),
(3, 'Equipamentos diversos - Sala 02', 22),
(4, 'Equipamentos diversos - Sala 03', 21),
(5, 'Equipamentos diversos - Sala 04 05', 38),
(6, 'Equipamentos diversos - Sala 06 07', 42),
(7, 'Equipamentos diversos - Sala 08', 0),
(8, 'Equipamentos diversos - Estúdio', 1),
(9, 'Equipamentos diversos - Coworking', 6),
(10, 'Equipamentos diversos - Sala 09 10', 44),
(11, 'Equipamentos diversos - Sala 11 12 13', 48),
(12, 'Equipamentos diversos - Sala 14 15', 42),
(13, 'Equipamentos diversos - Sala 18', 21),
(14, 'Equipamentos diversos - Sala 16 17', 38),
(15, 'Equipamentos diversos - Sala 19 21 23', 114),
(16, 'Equipamentos diversos - Sala 20 22', 96),
(17, 'Equipamentos diversos - Sala 25', 18),
(18, 'Equipamentos diversos - Sala 27 29', 44),
(20, 'Equipamentos diversos - Sala 30 31', 37);
GO


-- 6. RECURSOS DIDATICOS
-- Quantidades agrupadas por local, conforme a planilha.

INSERT INTO RecursosDidaticos
(IdLocal, Nome, Quantidade)
VALUES
(1, 'Recursos didáticos diversos - Arena Cyber', 15),
(2, 'Recursos didáticos diversos - Auditório', 1),
(3, 'Recursos didáticos diversos - Sala 02', 2),
(4, 'Recursos didáticos diversos - Sala 03', 2),
(5, 'Recursos didáticos diversos - Sala 04 05', 2),
(6, 'Recursos didáticos diversos - Sala 06 07', 4),
(7, 'Recursos didáticos diversos - Sala 08', 0),
(8, 'Recursos didáticos diversos - Estúdio', 0),
(9, 'Recursos didáticos diversos - Coworking', 5),
(10, 'Recursos didáticos diversos - Sala 09 10', 10),
(11, 'Recursos didáticos diversos - Sala 11 12 13', 7),
(12, 'Recursos didáticos diversos - Sala 14 15', 2),
(13, 'Recursos didáticos diversos - Sala 18', 1),
(14, 'Recursos didáticos diversos - Sala 16 17', 5),
(15, 'Recursos didáticos diversos - Sala 19 21 23', 103),
(16, 'Recursos didáticos diversos - Sala 20 22', 4),
(17, 'Recursos didáticos diversos - Sala 25', 22),
(18, 'Recursos didáticos diversos - Sala 27 29', 21),
(20, 'Recursos didáticos diversos - Sala 30 31', 2);
GO


-- 7. RESERVAS

INSERT INTO Reservas
(IdUsuario, IdLocal, Titulo, Finalidade,
 DataHoraInicio, DataHoraFim, Status, DataSolicitacao,
 IdAdministrador, DataDecisao, ObservacaoDecisao)
VALUES
(3, 3, 'Aula de programação', 'Aula prática de desenvolvimento de sistemas',
 '2026-11-02 08:00', '2026-11-02 10:00',
 'Aprovada', '2026-10-25 09:00', 5,
 '2026-10-25 10:00', 'Reserva aprovada'),

(4, 2, 'Palestra acadêmica', 'Palestra para estudantes',
 '2026-11-03 14:00', '2026-11-03 16:00',
 'Aprovada', '2026-10-25 10:00', 5,
 '2026-10-25 11:00', 'Auditório confirmado'),

(8, 1, 'Laboratório de tecnologia', 'Atividade prática com computadores',
 '2026-11-04 08:00', '2026-11-04 12:00',
 'Pendente', '2026-10-26 08:00', NULL,
 NULL, NULL),

(3, 14, 'Trabalho em grupo', 'Desenvolvimento de projeto acadêmico',
 '2026-11-05 13:00', '2026-11-05 15:00',
 'Aprovada', '2026-10-26 09:00', 6,
 '2026-10-26 10:00', 'Reserva aprovada'),

(4, 9, 'Reunião de equipe', 'Planejamento de atividades',
 '2026-11-06 10:00', '2026-11-06 11:30',
 'Rejeitada', '2026-10-26 11:00', 5,
 '2026-10-26 13:00', 'Local indisponível'),

(7, 2, 'Evento da empresa', 'Apresentação institucional',
 '2026-11-07 09:00', '2026-11-07 12:00',
 'Pendente', '2026-10-27 08:00', NULL,
 NULL, NULL),

(8, 10, 'Estudo de programação', 'Atividade de estudos',
 '2026-11-09 08:00', '2026-11-09 10:00',
 'Pendente', '2026-10-27 09:00', NULL,
 NULL, NULL),

(3, 17, 'Aula de revisão', 'Revisão de conteúdo',
 '2026-11-10 14:00', '2026-11-10 16:00',
 'Aprovada', '2026-10-27 10:00', 6,
 '2026-10-27 11:00', 'Reserva aprovada'),

(4, 8, 'Gravação de conteúdo', 'Gravação de material didático',
 '2026-11-11 13:00', '2026-11-11 15:00',
 'Cancelada', '2026-10-27 12:00', 5,
 '2026-10-27 13:00', 'Solicitação cancelada'),

(3, 11, 'Atividade em equipe', 'Trabalho colaborativo',
 '2026-11-12 08:00', '2026-11-12 10:00',
 'Aprovada', '2026-10-27 14:00', 6,
 '2026-10-27 15:00', 'Reserva aprovada');
GO


-- 8. HISTORICO RESERVAS

INSERT INTO HistoricoReservas
(IdReserva, IdUsuario, StatusAnterior, StatusNovo,
 Observacao, DataAlteracao)
VALUES
(1, 5, 'Pendente', 'Aprovada',
 'Administrador aprovou a solicitação', '2026-10-25 10:00'),

(2, 5, 'Pendente', 'Aprovada',
 'Reserva do auditório aprovada', '2026-10-25 11:00'),

(3, 3, 'Nova', 'Pendente',
 'Solicitação enviada pelo professor', '2026-10-26 08:00'),

(4, 6, 'Pendente', 'Aprovada',
 'Reserva aprovada pelo administrador', '2026-10-26 10:00'),

(5, 5, 'Pendente', 'Rejeitada',
 'Local indisponível no horário solicitado', '2026-10-26 13:00'),

(6, 7, 'Nova', 'Pendente',
 'Empresa solicitou espaço para evento', '2026-10-27 08:00'),

(7, 8, 'Nova', 'Pendente',
 'Solicitação de sala para estudo', '2026-10-27 09:00'),

(8, 6, 'Pendente', 'Aprovada',
 'Reserva aprovada pelo administrador', '2026-10-27 11:00'),

(9, 4, 'Pendente', 'Cancelada',
 'Solicitante cancelou a reserva', '2026-10-27 13:00'),

(10, 6, 'Pendente', 'Aprovada',
 'Reserva aprovada pelo administrador', '2026-10-27 15:00');
GO


SELECT * FROM Papeis;
SELECT * FROM Usuarios;
SELECT * FROM Locais;
SELECT * FROM Divisoes;
SELECT * FROM Equipamentos;
SELECT * FROM RecursosDidaticos;
SELECT * FROM Reservas;
SELECT * FROM HistoricoReservas;
GO
