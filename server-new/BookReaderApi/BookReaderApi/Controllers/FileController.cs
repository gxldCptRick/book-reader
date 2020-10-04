using BookReaderApi.Services;
using BookReaderApi.Services.BookService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Controllers
{
    [Route("/api/[controller]s")]
    [ApiController]
    public class FileController: Controller
    {
        private FileLoadingService _fileLoadingService;
        private IBookService _bookService;
        public FileController(FileLoadingService fileLoadingService, IBookService bookService)
        {
            _fileLoadingService = fileLoadingService;
            _bookService = bookService;
        }
        [HttpGet]
        public object Get()
        {
            return new { o = 'k' };
        }

        [HttpGet("{fileId}")]
        public FileStream GetById([FromRoute] Guid fileId)
        {
            var book = _bookService.GetBookById(fileId);
            return _fileLoadingService.LoadFile(Directory.GetCurrentDirectory() + BookController.rootdir, book.Path);
        }
    }
}
