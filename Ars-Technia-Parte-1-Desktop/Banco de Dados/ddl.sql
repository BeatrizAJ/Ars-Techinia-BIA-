
CREATE DATABASE ArsTechnia;
GO

USE ArsTechnia;
GO

CREATE TABLE Papeis (
    IdPapel INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(30)
);
GO

CREATE TABLE Usuarios (
    IdUsuario INT PRIMARY KEY IDENTITY(1,1),
    IdPapel INT,
    Nome VARCHAR(120),
    Email VARCHAR(254),
    Senha VARCHAR(255),
    Ativo BIT,

    FOREIGN KEY (IdPapel)
        REFERENCES Papeis(IdPapel)
);
GO

CREATE TABLE Locais (
    IdLocal INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(100),
    CapacidadePessoas INT,
    QuantidadeDivisoes INT,
    QuantidadeEquipamentos INT,
    QuantidadeRecursosDidaticos INT
);
GO

CREATE TABLE Divisoes (
    IdDivisao INT PRIMARY KEY IDENTITY(1,1),
    IdLocal INT,
    Nome VARCHAR(100),
    CapacidadePessoas INT,
    EquipamentosAssociados VARCHAR(300),

    FOREIGN KEY (IdLocal)
        REFERENCES Locais(IdLocal)
);
GO

CREATE TABLE Equipamentos (
    IdEquipamento INT PRIMARY KEY IDENTITY(1,1),
    IdLocal INT,
    Nome VARCHAR(120),
    Quantidade INT,

    FOREIGN KEY (IdLocal)
        REFERENCES Locais(IdLocal)
);
GO

CREATE TABLE RecursosDidaticos (
    IdRecurso INT PRIMARY KEY IDENTITY(1,1),
    IdLocal INT,
    Nome VARCHAR(120),
    Quantidade INT,

    FOREIGN KEY (IdLocal)
        REFERENCES Locais(IdLocal)
);
GO

CREATE TABLE Reservas (
    IdReserva INT PRIMARY KEY IDENTITY(1,1),
    IdUsuario INT,
    IdLocal INT,
    Titulo VARCHAR(150),
    Finalidade VARCHAR(500),
    DataHoraInicio DATETIME,
    DataHoraFim DATETIME,
    Status VARCHAR(20),
    DataSolicitacao DATETIME,
    IdAdministrador INT,
    DataDecisao DATETIME,
    ObservacaoDecisao VARCHAR(500),

    FOREIGN KEY (IdUsuario)
        REFERENCES Usuarios(IdUsuario),

    FOREIGN KEY (IdLocal)
        REFERENCES Locais(IdLocal),

    FOREIGN KEY (IdAdministrador)
        REFERENCES Usuarios(IdUsuario)
);
GO

CREATE TABLE HistoricoReservas (
    IdHistorico INT PRIMARY KEY IDENTITY(1,1),
    IdReserva INT,
    IdUsuario INT,
    StatusAnterior VARCHAR(20),
    StatusNovo VARCHAR(20),
    Observacao VARCHAR(500),
    DataAlteracao DATETIME,

    FOREIGN KEY (IdReserva)
        REFERENCES Reservas(IdReserva),

    FOREIGN KEY (IdUsuario)
        REFERENCES Usuarios(IdUsuario)
);
GO
