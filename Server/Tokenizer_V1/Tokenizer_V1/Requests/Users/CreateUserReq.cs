namespace Tokenizer_V1.Requests.Users
{
    public class CreateUserReq
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string UserType { get; set; }
    }
}
