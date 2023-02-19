using Clinic_V2._0.Paging;

namespace Tokenizer_V1.Requests
{
    public class IdReq
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public PagingParams PagingParams { set; get; }
    }
}
