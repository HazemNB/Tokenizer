using Clinic_V2._0.Paging;

namespace Tokenizer_V1.Requests.Users
{
    public class SearchUsersReq
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserType { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public int? CompanyId { set; get; }
        public PagingParams PagingParams { set; get; }
    }
}
