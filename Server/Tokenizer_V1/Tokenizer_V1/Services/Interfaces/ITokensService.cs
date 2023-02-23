using System.Collections.Generic;
using System.Threading.Tasks;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests.Templates;
using Tokenizer_V1.Requests.Tokens;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Responses;
using Clinic_V2._0.Paging;
using Tokenizer_V1.Responses.ViewModels;
using System.Dynamic;

namespace Tokenizer_V1.Services.Interfaces
{
    public interface ITokensService
    {
        Task<DefaultResponse<Template>> CreateTemplate(CreateTemplateReq req);
        Task<DefaultResponse<Template>> EditTemplate(CreateTemplateReq req);
        Task<DefaultResponse<Template>> UpdateTemplateImage(CreateTemplateReq req);
        Task<DefaultResponse<string>> DeleteTemplate(IdReq req);
        Task<DefaultResponse<string>> DeleteTemplateAndTokens(IdReq req);
        Task<DefaultResponse<TokenType>> CreateTokenType(IdReq req);
        Task<DefaultResponse<TokenType>> EditTokenType(IdReq req);
        Task<DefaultResponse<List<TokenType>>> GetTokenTypes(IdReq req);
        Task<DefaultResponse<string>> DeleteTokenType(IdReq req);
        Task<DefaultResponse<string>> CreateTokens(CreateTokensReq req);
        Task<DefaultResponse<Token>> GetToken(IdReq req);
        Task<DefaultResponse<string>> EditTokenBatch(EditTokenBatchReq req);
        Task<DefaultResponse<string>> UpdateAllTemplateTokens(IdReq req);
        Task<DefaultResponse<string>> DeleteTokenBatch(EditTokenBatchReq req);
        Task<DefaultResponse<string>> DeleteAllTemplateTokens(IdReq req);
        Task<DefaultResponse<string>> DeleteToken(IdReq req);
        Task<DefaultResponse<List<Token>>> GetBatchTokens(EditTokenBatchReq req);
        Task<DefaultResponse<PagedList<Token>>> SearchTokens(SearchTokensReq req);
        Task<DefaultResponse<Scan>> CreateScan(CreateScanReq req);
        Task<DefaultResponse<ScansViewModel>> GetBatchScans(EditTokenBatchReq req);
        Task<DefaultResponse<Template>> CreateCompanyTemplate(CreateTemplateReq req);
        Task<DefaultResponse<List<ExpandoObject>>> GetCompanyTemplates(IdReq req);
        Task<DefaultResponse<string>> CreateCompanyTokens(CreateTokensReq req);
        Task<DefaultResponse<string>> CreateTokenTransaction(CreateTokenTransactionRequest req);
        Task<DefaultResponse<PagedList<TokenTransaction>>> SearchTokenTransactions(SearchTokenTransactionsReq req);


    }
}
