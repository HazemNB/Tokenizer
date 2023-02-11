using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class Template
    {
        public int Id { get; set; }
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
        public byte[]? Image { set; get; }
        
        public int? ProjectId { get; set; }
        public Project Project { get; set; }
        public TokenType TokenType {set; get; }
        public ICollection<Token> Tokens { get; set; }

        public int? CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
