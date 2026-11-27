
using ArsTechnia.API.Models;
using ArsTechnia.API.Interfaces;
using ArsTechnia.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Validar conexão com o banco
var conexao = builder.Configuration.GetConnectionString("ConexaoArsTechnia");

if (string.IsNullOrWhiteSpace(conexao))
{
    throw new Exception("A conexão com o banco de dados não foi configurada.");
}

// Conexão com o banco
builder.Services.AddDbContext<ArsTechniaContext>(options =>
    options.UseSqlServer(conexao)
);

// Registro dos Services
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILocalService, LocalService>();
builder.Services.AddScoped<IReservaService, ReservaService>();
builder.Services.AddScoped<IHistoricoReservaService, HistoricoReservaService>();
builder.Services.AddScoped<ILoginService, LoginService>();

// Configurações JWT
var chave = builder.Configuration["Jwt:Chave"];
var emissor = builder.Configuration["Jwt:Emissor"];
var audiencia = builder.Configuration["Jwt:Audiencia"];

// Validar configurações JWT
if (string.IsNullOrWhiteSpace(chave) ||
    Encoding.UTF8.GetByteCount(chave) < 32)
{
    throw new Exception("A chave JWT deve possuir pelo menos 32 bytes.");
}

if (string.IsNullOrWhiteSpace(emissor) ||
    string.IsNullOrWhiteSpace(audiencia))
{
    throw new Exception("O emissor e a audiência JWT precisam ser configurados.");
}

// Configuração da autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ClockSkew = TimeSpan.Zero,

        ValidIssuer = emissor,
        ValidAudience = audiencia,

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(chave)
        )
    };
});

// Configuração da autorização
builder.Services.AddAuthorization();

// Controllers
builder.Services.AddControllers();

// Configuração do Swagger
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Informe seu token JWT."
    });

    options.AddSecurityRequirement(document =>
        new OpenApiSecurityRequirement
        {
            [new OpenApiSecuritySchemeReference("Bearer", document)] =
                new List<string>()
        });
});

var app = builder.Build();

// Ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Autenticação e autorização
app.UseAuthentication();
app.UseAuthorization();

// Rotas
app.MapControllers();

app.Run();
