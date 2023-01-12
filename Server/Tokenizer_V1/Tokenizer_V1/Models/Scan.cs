using System;

namespace Tokenizer_V1.Models
{
    public class Scan
    {
        public int Id { get; set; }
        public string IpAddress { get; set; }
        public DateTime Date { get; set; }
        public int TokenId { get; set; }
        public Token Token { get; set; }
        public string Device { get; set; }
        public string DeviceType { get; set; }
        public string Browser { get; set; }
        public string Os { get; set; }
        public string Country { get; set; }
    }
}
