namespace Tokenizer_V1.Requests.Tokens
{
    public class EditTokenBatchReq
    {
        public int IdFrom { get; set; }
        public int IdTo { get; set; }
        public string NewUrl { get; set; }
        public int ProjectId { get; set; }
    }
}
