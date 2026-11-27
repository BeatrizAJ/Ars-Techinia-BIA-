
using ArsTechnia.API.DTOs;

namespace ArsTechnia.API.Interfaces
{
    public interface ILoginService
    {
        Task<string?> LoginAsync(LoginDTO dados);
    }
}
