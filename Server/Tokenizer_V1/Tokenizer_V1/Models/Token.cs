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
        public int? ProjectId { get; set; }
        public Project Project { get; set; }
        public ICollection<Scan> Scans { set; get; }
        
        // <<<<<<<<<<<<<<< NEW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        public Company Company { get; set; }
        public int? CompanyId { get; set; }
        public User CurrentOwner { set; get; }
        public int? CurrentOwnerId { set; get; }
        public ICollection<TokenOwner> Owners { set; get; }
        public bool? CompanyToken { set; get; }
        public decimal? Amount { set; get; }
        public DateTime? LastUpdated { set; get; }
        public bool? Redeemed { set; get; }
        public bool? Claimed { set; get; }
        public bool? IsActive { set; get; }
        public int? PlayedForwardCount { set; get; }
        //transactions
        public ICollection<TokenTransaction> Transactions { set; get; }
        //items

    }
}
