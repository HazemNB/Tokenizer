using Clinic_V2._0.Paging;

namespace Tokenizer_V1.Requests.Projects
{
    public class SearchProjectsReq
    {
        public int? Id { set; get; }
        public string Name { set; get; }
        public bool? IsDeleted { set; get; }
        public PagingParams PagingParams { set; get; }
    }
}
