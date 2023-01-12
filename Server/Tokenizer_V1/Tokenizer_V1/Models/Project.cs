using System;
using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public DateTime CreatedAt { set; get; }

        public bool IsDeleted { set; get; }

        //users
        public ICollection<UserProject> Users { get; set; }
        //tokens
        public ICollection<Token> Tokens { get; set; }
        // Templates
        public ICollection<Template> Templates { get; set; }
    }
}
