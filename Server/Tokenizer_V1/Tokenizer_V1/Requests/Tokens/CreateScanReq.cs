namespace Tokenizer_V1.Requests.Tokens
{
    public class CreateScanReq
    {
        public string IpAddress { get; set; }
        public int TokenId { get; set; }
        public string Device { get; set; }
        public string DeviceType { get; set; }
        public string Browser { get; set; }
        public string Os { get; set; }
        public string Country { get; set; }
    }
}
