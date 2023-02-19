using Clinic_V2._0.Paging;
using System;
using System.Collections.Generic;
using Tokenizer_V1.Models;

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

        // NEW

        public int? CompanyId { get; set; }
        public int? CurrentOwnerId { set; get; }
        public int?  Owners { set; get; }
        public bool? CompanyToken { set; get; }
        public decimal? Amount { set; get; }
        public DateTime? LastUpdated { set; get; }
        public bool? Redeemed { set; get; }
        public bool? Claimed { set; get; }
        public bool? IsActive { set; get; }
        public int? PlayedForwardCount { set; get; }

    }
}
