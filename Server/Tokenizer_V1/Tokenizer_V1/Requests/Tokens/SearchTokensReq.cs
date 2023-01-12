using Clinic_V2._0.Paging;
using System;

namespace Tokenizer_V1.Requests.Tokens
{
    public class SearchTokensReq
    {
        public int? ProjectId { set; get; }

        public int? TemplateId { set; get; }

        public int? TokenTypeId { set; get; }

        public int? IdFrom { set; get; }

        public int? IdTo { set; get; }

        public int? NumberFrom { set; get; }

        public int? NumberTo { set; get; }

        public string Url { set; get; }

        public DateTime? CreatedAtFrom { set; get; }

        public DateTime? CreatedAtTo { set; get; }

        public string CurvedTextBottom { set; get; }

        public string CurvedTextTop { set; get; }
        
        public bool? HasImage { set; get; }

        public string AltText { set; get; }

        public PagingParams pagingParams { set; get; }

    }
}
