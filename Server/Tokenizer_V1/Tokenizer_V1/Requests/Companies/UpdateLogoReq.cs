using Microsoft.AspNetCore.Http;

namespace Tokenizer_V1.Requests.Companies
{
    public class UpdateLogoReq
    {
        public int CompanyId { get; set; }
        public IFormFile Logo { set; get; }
        public bool? Delete { set; get; }
    }
}
