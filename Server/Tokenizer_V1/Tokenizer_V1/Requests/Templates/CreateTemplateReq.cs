using Microsoft.AspNetCore.Http;
using Tokenizer_V1.Models;

namespace Tokenizer_V1.Requests.Templates
{
    public class CreateTemplateReq
    {
        public int? Id { get; set; }
        public string Name { get; set; }

        public string QrCodeColor { get; set; }
        public string QrCodeBackgroundColor { get; set; }
        public string BackgroundColor { get; set; }
        public string TextColor { get; set; }

        public string CurvedTextTop { get; set; }
        public string CurvedTextBottom { get; set; }
        public int CurvedTextTopOffset { get; set; }
        public int CurvedTextBottomOffset { get; set; }

        public int TokenTypeId { set; get; }
        public int TokenTypeOffset { set; get; }

        public string QrCodeUrl { get; set; }

        public bool UseImage { get; set; }
        public string AltText { get; set; }
        public IFormFile Image { set; get; }
        public int? ProjectId { get; set; }

        public int? CompanyId { get; set; }

    }
}
