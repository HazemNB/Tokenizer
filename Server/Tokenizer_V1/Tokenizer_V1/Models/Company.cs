using System;
using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Logo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int CompanyTypeId { get; set; }
        public CompanyType CompanyType { get; set; }
        public int UserLimit { get; set; }
        public int TokenLimit { get; set; }
        public int TemplateLimit { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { set; get; }

        public ICollection<User> Users { get; set; }
        public ICollection<Template> Templates { get; set; }
        public ICollection<Token> Tokens { get; set; }
        public ICollection<TokenTransaction> TokenTransactions { get; set; }
    }
}
