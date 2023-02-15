using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Companies;
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


     
    }
}
