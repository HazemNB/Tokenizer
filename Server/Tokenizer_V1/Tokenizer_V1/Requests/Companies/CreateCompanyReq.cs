using Microsoft.AspNetCore.Http;
using System;
using Tokenizer_V1.Models;

namespace Tokenizer_V1.Requests.Companies
{
    public class CreateCompanyReq
    {
        public int? Id { set; get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Logo { set; get; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int? CompanyTypeId { get; set; }
        public int? UserLimit { get; set; }
        public int? TokenLimit { get; set; }
        public int? TemplateLimit { get; set; }
    }
}
