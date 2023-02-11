using System.Collections;
using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class CompanyType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Company> Companies { set; get; }
    }
}
