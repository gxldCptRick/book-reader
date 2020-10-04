using BookReaderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Services.BookService
{
    public interface IBookService
    {
        public BookSet FindBooksForRequest(BookRequest request);
    }
}
