using Tokenizer_V1.Classes;

namespace Tokenizer_V1.Responses
{
    public class DefaultResponse<T>
    {
        public Status Status { get; set; }
        public T Data { get; set; }
    }
}
