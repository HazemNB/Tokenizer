using Clinic_V2._0.Paging;
using System;
using Tokenizer_V1.Models;

namespace Tokenizer_V1.Requests.Tokens
{
    public class SearchTokenTransactionsReq
    {
        public int? Id { get; set; }
        public int? TokenId { set; get; }
        public int? FirstPartyId { set; get; }
        public int? SecondPartyId { set; get; }
        public int? CompanyId { set; get; }
        public decimal? AmountFrom { set; get; }
        public decimal? AmountTo { set; get; }
        //public DateTime? CreatedAt { set; get; }
        public DateTime? FromDate { set; get; }
        public DateTime? ToDate { set; get; }
        public string TransactionType { set; get; }
        
        public PagingParams pagingParams { set; get; }
    }
}
