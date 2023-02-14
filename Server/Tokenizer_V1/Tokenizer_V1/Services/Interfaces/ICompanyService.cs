using Clinic_V2._0.Paging;
using System.Dynamic;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Companies;
using Tokenizer_V1.Responses;

namespace Tokenizer_V1.Services.Interfaces
{
    public interface ICompanyService
    {
        Task<DefaultResponse<PagedList<Company>>> SearchCompanies(SearchCompaniesReq req);
        Task<DefaultResponse<Company>> DeleteCompany(IdReq req);
        Task<DefaultResponse<Company>> CreateCompany(CreateCompanyReq req);
        Task<DefaultResponse<Company>> EditCompany(CreateCompanyReq req);
        Task<DefaultResponse<ExpandoObject>> GetCompany(IdReq req);
    }
}
