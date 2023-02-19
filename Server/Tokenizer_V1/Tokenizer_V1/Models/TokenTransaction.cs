using System;

namespace Tokenizer_V1.Models
{
    public class TokenTransaction
    {
        public int Id { get; set; }
        public int TokenId { set; get; }
        public Token Token { set; get; }
        public int? FirstPartyId { set; get; }
        public int? SecondPartyId { set; get; }
        public User FirstParty { set; get; }
        public User SecondParty { set; get; }
        public int? CompanyId { set; get; }
        public Company Company { set; get; }
        public decimal? Amount { set; get; }
        public DateTime CreatedAt { set; get; }
        public string TransactionType { set; get; }
        // Item ?
    }
}
