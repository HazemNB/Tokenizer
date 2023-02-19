using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Companies;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Controllers
{
    [Route("api/[controller]")]
    public class CompaniesController : Controller
    {
        private readonly ICompanyService _companyService;
        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpPost]
        [Route("CreateCompany")]
        public async Task<IActionResult> CreateProject([FromForm] CreateCompanyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.CreateCompany(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("EditCompany")]
        public async Task<IActionResult> EditCompany([FromBody] CreateCompanyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.EditCompany(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("SearchCompanies")]
        public async Task<IActionResult> SearchCompanies([FromBody] SearchCompaniesReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.SearchCompanies(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("GetCompany")]
        public async Task<IActionResult> GetCompany([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.GetCompany(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteCompany")]
        public async Task<IActionResult> DeleteCompany([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.DeleteCompany(request);

            return Ok(response);
        }

        //Task<DefaultResponse<Company>> AddUserToCompany(ManyToManyReq req);
        //Task<DefaultResponse<Company>> RemoveUserFromCompany(ManyToManyReq req);
        //Task<DefaultResponse<User>> EditCompanyUserType(IdReq req);
        //Task<DefaultResponse<CompanyType>> CreateCompanyType(IdReq req);
        //Task<DefaultResponse<CompanyType>> EditCompanyType(IdReq req);
        //Task<DefaultResponse<CompanyType>> DeleteCompanyType(IdReq req);
        //Task<DefaultResponse<Company>> AddCompanyTypeToCompany(ManyToManyReq req);

        [HttpPost]
        [Route("AddUserToCompany")]
        public async Task<IActionResult> AddUserToCompany([FromBody] ManyToManyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.AddUserToCompany(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("RemoveUserFromCompany")]
        public async Task<IActionResult> RemoveUserFromCompany([FromBody] ManyToManyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.RemoveUserFromCompany(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("EditCompanyUserType")]
        public async Task<IActionResult> EditCompanyUserType([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.EditCompanyUserType(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("CreateCompanyType")]
        public async Task<IActionResult> CreateCompanyType([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.CreateCompanyType(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("EditCompanyType")]
        public async Task<IActionResult> EditCompanyType([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.EditCompanyType(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteCompanyType")]
        public async Task<IActionResult> DeleteCompanyType([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.DeleteCompanyType(request);

            return Ok(response);
        }

        //search company types

        [HttpPost]
        [Route("SearchCompanyTypes")]
        public async Task<IActionResult> SearchCompanyTypes([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.SearchCompanyTypes(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("AddCompanyTypeToCompany")]
        public async Task<IActionResult> AddCompanyTypeToCompany([FromBody] ManyToManyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _companyService.AddCompanyTypeToCompany(request);

            return Ok(response);
        }
        
        
    }
}
