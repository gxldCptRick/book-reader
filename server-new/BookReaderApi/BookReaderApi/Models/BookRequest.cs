using BookReaderApi.Models.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public class BookRequest
    {
        public int Page { get; set; }
        public int AmountOfBooks { get; set; }
        public BookQuery BookFilter { get; set; } = new BookQuery();
        public string RootDir { get; set; }

    }
}
