namespace Tokenizer_V1.Models
{
    public class TokenOwner
    {
        public int Id { get; set; }
        public int TokenId { set; get; }
        public int UserId { set; get; }
        public User User { set; get; }
        public Token Token { set; get; }
    }
}
