namespace Tokenizer_V1.Requests.Tokens
{
    public class CreateTokenTransactionRequest
    {
        public int TokenId { get; set; }
        public string TransactionType { get; set; }
        public decimal Amount { get; set; }
        public string OtherUrl { get; set; }
        public int? FirstPartyId { set; get; }
        public int? SecondPartyId { set; get; }
    }
}
