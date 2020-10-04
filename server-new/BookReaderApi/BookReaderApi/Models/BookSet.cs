using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public class BookSet
    {
        public ResultInformation MetaInfo { get; set; }
        public List<Book> BooksFound { get; set; }
        
    }
}
