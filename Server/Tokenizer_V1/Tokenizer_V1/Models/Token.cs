using System;
using System.Collections;
using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class Token
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { set; get; }
        public int TokenTypeId { set; get; }
        public TokenType TokenType { set; get; }
        public int TemplateId { get; set; }
        public Template Template { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public ICollection<Scan> Scans { set; get; }

    }
}
