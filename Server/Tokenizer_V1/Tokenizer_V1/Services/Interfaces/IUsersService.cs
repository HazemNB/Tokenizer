using Clinic_V2._0.Paging;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Users;
using Tokenizer_V1.Responses;

namespace Tokenizer_V1.Services.Interfaces
{
    public interface IUsersService
    {
        Task<DefaultResponse<User>> CreateUser(CreateUserReq req);
        Task<DefaultResponse<PagedList<User>>> SearchUsers(SearchUsersReq req);
        Task<DefaultResponse<User>> GetUserById(IdReq req);
        Task<DefaultResponse<User>> ToggleUserDelete(IdReq req);
        Task<DefaultResponse<User>> ToggleUserActivation(IdReq req);
        Task<DefaultResponse<User>> GetCurrentUser();
    }
}
