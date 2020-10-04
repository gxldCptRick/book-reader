using BookReaderApi.Models;
using BookReaderApi.Models.Queries;
using BookReaderApi.Services.BookService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private const string rootdir = "/books";
        private readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public BookSet Get([FromQuery]int pageSize=10, [FromQuery]int page=1)
        {
            var request = new BookRequest
            {
                AmountOfBooks = pageSize,
                Page = page,
                RootDir =  Directory.GetCurrentDirectory() + rootdir,
            };

            return _bookService.FindBooksForRequest(request);
        }
    }
}
