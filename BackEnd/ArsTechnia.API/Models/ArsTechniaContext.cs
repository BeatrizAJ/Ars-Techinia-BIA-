using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ArsTechnia.API.Models;

public partial class ArsTechniaContext : DbContext
{
    public ArsTechniaContext(DbContextOptions<ArsTechniaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Diviso> Divisoes { get; set; }

    public virtual DbSet<Equipamento> Equipamentos { get; set; }

    public virtual DbSet<HistoricoReserva> HistoricoReservas { get; set; }

    public virtual DbSet<Locai> Locais { get; set; }

    public virtual DbSet<Papei> Papeis { get; set; }

    public virtual DbSet<RecursosDidatico> RecursosDidaticos { get; set; }

    public virtual DbSet<Reserva> Reservas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Diviso>(entity =>
        {
            entity.HasKey(e => e.IdDivisao).HasName("PK__Divisoes__E34380EA5D4F45CE");

            entity.Property(e => e.EquipamentosAssociados)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.IdLocalNavigation).WithMany(p => p.Divisos)
                .HasForeignKey(d => d.IdLocal)
                .HasConstraintName("FK__Divisoes__IdLoca__5165187F");
        });

        modelBuilder.Entity<Equipamento>(entity =>
        {
            entity.HasKey(e => e.IdEquipamento).HasName("PK__Equipame__E309D87FF2DEAB2A");

            entity.Property(e => e.Nome)
                .HasMaxLength(120)
                .IsUnicode(false);

            entity.HasOne(d => d.IdLocalNavigation).WithMany(p => p.Equipamentos)
                .HasForeignKey(d => d.IdLocal)
                .HasConstraintName("FK__Equipamen__IdLoc__5441852A");
        });

        modelBuilder.Entity<HistoricoReserva>(entity =>
        {
            entity.HasKey(e => e.IdHistorico).HasName("PK__Historic__9CC7EBF3D80B3D45");

            entity.Property(e => e.DataAlteracao).HasColumnType("datetime");
            entity.Property(e => e.Observacao)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.StatusAnterior)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StatusNovo)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.IdReservaNavigation).WithMany(p => p.HistoricoReservas)
                .HasForeignKey(d => d.IdReserva)
                .HasConstraintName("FK__Historico__IdRes__5EBF139D");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistoricoReservas)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Historico__IdUsu__5FB337D6");
        });

        modelBuilder.Entity<Locai>(entity =>
        {
            entity.HasKey(e => e.IdLocal).HasName("PK__Locais__C287B9BB00F980F9");

            entity.Property(e => e.Nome)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Papei>(entity =>
        {
            entity.HasKey(e => e.IdPapel).HasName("PK__Papeis__1D24F893762D71ED");

            entity.Property(e => e.Nome)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RecursosDidatico>(entity =>
        {
            entity.HasKey(e => e.IdRecurso).HasName("PK__Recursos__B91948E941AC24EE");

            entity.Property(e => e.Nome)
                .HasMaxLength(120)
                .IsUnicode(false);

            entity.HasOne(d => d.IdLocalNavigation).WithMany(p => p.RecursosDidaticos)
                .HasForeignKey(d => d.IdLocal)
                .HasConstraintName("FK__RecursosD__IdLoc__571DF1D5");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.IdReserva).HasName("PK__Reservas__0E49C69D0CA56AB7");

            entity.Property(e => e.DataDecisao).HasColumnType("datetime");
            entity.Property(e => e.DataHoraFim).HasColumnType("datetime");
            entity.Property(e => e.DataHoraInicio).HasColumnType("datetime");
            entity.Property(e => e.DataSolicitacao).HasColumnType("datetime");
            entity.Property(e => e.Finalidade)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.ObservacaoDecisao)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Titulo)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.IdAdministradorNavigation).WithMany(p => p.ReservaIdAdministradorNavigations)
                .HasForeignKey(d => d.IdAdministrador)
                .HasConstraintName("FK__Reservas__IdAdmi__5BE2A6F2");

            entity.HasOne(d => d.IdLocalNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.IdLocal)
                .HasConstraintName("FK__Reservas__IdLoca__5AEE82B9");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.ReservaIdUsuarioNavigations)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__Reservas__IdUsua__59FA5E80");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuarios__5B65BF9768F9993E");

            entity.Property(e => e.Email)
                .HasMaxLength(254)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .HasMaxLength(120)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.IdPapelNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdPapel)
                .HasConstraintName("FK__Usuarios__IdPape__4CA06362");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
