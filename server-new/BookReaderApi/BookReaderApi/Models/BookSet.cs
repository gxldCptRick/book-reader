using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public class BookSet
    {
        public int CurrentPage { get; set; }
        public int? NextPage { get; set; }
        public int? PreviousPage { get; set; }
        public int LastPage { get; set; }
        public int PageSize { get; set; }
        public List<Book> BooksFound { get; set; }

    }
}
