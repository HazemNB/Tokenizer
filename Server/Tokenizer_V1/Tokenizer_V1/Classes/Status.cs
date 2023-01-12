namespace Tokenizer_V1.Classes
{
    public class Status
    {
        public Status(bool success, string message)
        {
            Success = success;
            Message = message;
        }
        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
