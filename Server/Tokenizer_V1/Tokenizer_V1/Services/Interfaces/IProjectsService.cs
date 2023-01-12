using Clinic_V2._0.Paging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Projects;
using Tokenizer_V1.Responses;

namespace Tokenizer_V1.Services.Interfaces
{
    public interface IProjectsService
    {
        Task<DefaultResponse<Project>> CreateProject(IdReq req);
        Task<DefaultResponse<Project>> EditProject(IdReq req);
        Task<DefaultResponse<Project>> ToggleProject(IdReq req);
        Task<DefaultResponse<Project>> GetProject(IdReq req);
        Task<DefaultResponse<PagedList<Project>>> SearchProjects(SearchProjectsReq req);
        Task<DefaultResponse<Project>> AddUserToProject(ManyToManyReq req);
        Task<DefaultResponse<string>> RemoveUserFromProject(IdReq req);
        Task<DefaultResponse<List<Project>>> GetUserProjects();

    }
}
