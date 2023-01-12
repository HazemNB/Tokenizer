using System.Collections.Generic;

namespace Tokenizer_V1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { set; get; }
        public string UserType { set; get; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        
        public ICollection<UserProject> Projects { get; set; }
    }
}
