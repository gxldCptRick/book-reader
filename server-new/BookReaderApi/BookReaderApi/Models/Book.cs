using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string CoverUrl { get; set; }
        public string Description { get; set; }
        public List<Author> Authors { get; set; }
        public string Path { get; set; }

    }
}
