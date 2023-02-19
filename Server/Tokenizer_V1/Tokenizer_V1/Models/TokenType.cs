using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class TokenType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Token> Tokens { get; set; }
        public ICollection<Template> Temaplates { set; get; }
    }
}
