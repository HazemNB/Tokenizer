using System.Collections.Generic;
using System;
using Tokenizer_V1.Models;

namespace Tokenizer_V1.Requests.Tokens
{
    public class CreateTokensReq
    {
        public int Quantity { get; set; }
        public int TemplateId { get; set; }
        public string OtherUrl { set; get; }

        public decimal? Amount { set; get; }
    }
}
