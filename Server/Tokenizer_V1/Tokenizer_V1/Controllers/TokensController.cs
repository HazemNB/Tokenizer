using Clinic_V2._0.Paging;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Templates;
using Tokenizer_V1.Requests.Tokens;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Controllers
{
    [Route("api/[controller]")]
    public class TokensController : Controller
    {
        private readonly ITokensService _tokenService;

        public TokensController(ITokensService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("CreateTemplate")]
        public async Task<IActionResult> CreateTemplate([FromForm] CreateTemplateReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateTemplate(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("EditTemplate")]
        public async Task<IActionResult> EditTemplate([FromForm] CreateTemplateReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.EditTemplate(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("UpdateTemplateImage")]
        public async Task<IActionResult> UpdateTemplateImage([FromForm] CreateTemplateReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.UpdateTemplateImage(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("SearchTemplates")]
        public async Task<IActionResult> SearchTemplates([FromBody] SearchTemplateReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.SearchTemplates(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteTemplate")]
        public async Task<IActionResult> DeleteTemplate([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteTemplate(req);
            return Ok(response);
        }
        [HttpPost]
        [Route("DeleteTemplateAndTokens")]
        public async Task<IActionResult> DeleteTemplateAndTokens([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteTemplateAndTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateTokenType")]
        public async Task<IActionResult> CreateTokenType([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateTokenType(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("EditTokenType")]
        public async Task<IActionResult> EditTokenType([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.EditTokenType(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("GetTokenTypes")]
        public async Task<IActionResult> GetTokenTypes([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.GetTokenTypes(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteTokenType")]
        public async Task<IActionResult> DeleteTokenType([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteTokenType(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateTokens")]
        public async Task<IActionResult> CreateToken([FromBody] CreateTokensReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("EditTokenBatch")]
        public async Task<IActionResult> EditTokenBatch([FromBody] EditTokenBatchReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.EditTokenBatch(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("UpdateAllTemplateTokens")]
        public async Task<IActionResult> UpdateAllTemplateTokens([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.UpdateAllTemplateTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteTokenBatch")]
        public async Task<IActionResult> DeleteTokenBatch([FromBody] EditTokenBatchReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteTokenBatch(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteAllTemplateTokens")]
        public async Task<IActionResult> DeleteAllTemplateTokens([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteAllTemplateTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteToken")]
        public async Task<IActionResult> DeleteToken([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.DeleteToken(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("SearchTokens")]
        public async Task<IActionResult> SearchTokens([FromBody] SearchTokensReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.SearchTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("GetBatchTokens")]
        public async Task<IActionResult> GetBatchTokens([FromBody] EditTokenBatchReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.GetBatchTokens(req);
            return Ok(response);
        }

        //Get Token By Id
        [HttpPost]
        [Route("GetToken")]
        public async Task<IActionResult> GetTokenById([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.GetToken(req);
            return Ok(response);
        }
        //scans
        
        [HttpPost]
        [Route("CreateScan")]
        public async Task<IActionResult> CreateScan([FromBody] CreateScanReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateScan(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("GetBatchScans")]
        public async Task<IActionResult> GetBatchScans([FromBody] EditTokenBatchReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.GetBatchScans(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateCompanyTemplate")]
        public async Task<IActionResult> CreateCompanyTemplate([FromForm] CreateTemplateReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateCompanyTemplate(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("GetCompanyTemplates")]
        public async Task<IActionResult> GetCompanyTemplates([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.GetCompanyTemplates(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateCompanyTokens")]
        public async Task<IActionResult> CreateCompanyTokens([FromBody] CreateTokensReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateCompanyTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("SearchCompanyTokens")]
        public async Task<IActionResult> SearchCompanyTokens([FromBody] SearchTokensReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.SearchCompanyTokens(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("CreateTokenTransaction")]
        public async Task<IActionResult> CreateTokenTransaction([FromBody] CreateTokenTransactionRequest req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.CreateTokenTransaction(req);
            return Ok(response);
        }

        [HttpPost]
        [Route("SearchTokenTransactions")]
        public async Task<IActionResult> SearchTokenTransactions([FromBody] SearchTokenTransactionsReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.SearchTokenTransactions(req);
            return Ok(response);
        }

        // toggle templateApproval
        [HttpPost]
        [Route("ToggleTemplateApproval")]
        public async Task<IActionResult> ToggleTemplateApproval([FromBody] IdReq req)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _tokenService.ToggleTemplateApproval(req);
            return Ok(response);
        }

    }
}
