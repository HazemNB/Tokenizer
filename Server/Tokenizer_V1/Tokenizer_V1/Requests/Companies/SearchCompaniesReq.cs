using Clinic_V2._0.Paging;
using Microsoft.AspNetCore.Http;

namespace Tokenizer_V1.Requests.Companies
{
    public class SearchCompaniesReq
    {
        public int? Id { set; get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int? CompanyTypeId { get; set; }

        public PagingParams pagingParams { set; get; }

    }
}
