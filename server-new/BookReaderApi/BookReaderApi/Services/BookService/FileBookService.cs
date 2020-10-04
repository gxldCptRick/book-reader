using BookReaderApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace BookReaderApi.Services.BookService
{
    public class FileBookService : IBookService
    {
        private readonly IDictionary<(string, string), Book> _cachedBooks = new Dictionary<(string, string), Book>();
        private readonly IDictionary<Guid, Book> _idIndex = new Dictionary<Guid, Book>();
        private IEnumerable<string> ListFilesInDirectory(string rootDir)
        {
            var files = Directory.GetFiles(rootDir);
            foreach (var file in files)
            {
                yield return file;
            }
            foreach(var dir in Directory.GetDirectories(rootDir))
            {
                foreach(var file in ListFilesInDirectory(dir))
                {
                    yield return file;
                }
            }
        }
        private IEnumerable<Book> DiscoverBooksOnFileSystems(string rootDir)
        {
            foreach(var filePath in ListFilesInDirectory(rootDir))
            {
                var title = Path.GetFileName(filePath);
                var path = Path.GetRelativePath(rootDir, filePath);
                if (_cachedBooks.ContainsKey((title, path)))
                {
                    yield return _cachedBooks[(title, path)];
                }
                else
                {
                    var book =  new Book
                    {
                        Title = title,
                        Path = path,
                        Id = Guid.NewGuid()
                    };
                    _cachedBooks[(title, path)] = book;
                    _idIndex[book.Id] = book;
                    yield return book;
                }
                
            }
        }
        public BookSet FindBooksForRequest(BookRequest request)
        {
            
            var query = DiscoverBooksOnFileSystems(request.RootDir).Where(request.BookFilter.BookIsMatch);
            var totalAmountOfBooks = query.Count();
            var currentPage = request.Page - 1;
            var lastPage = (int)Math.Ceiling(((double)totalAmountOfBooks) / request.AmountOfBooks);
            var booksFound = query.Skip((currentPage) * request.AmountOfBooks).Take(request.AmountOfBooks).ToList();
            return new BookSet
            {
                BooksFound = booksFound,
                CurrentPage = currentPage,
                NextPage = lastPage == request.Page? (int?)null: request.Page + 1,
                PreviousPage = request.Page == 1?(int?) null: request.Page - 1 ,
                PageSize = request.AmountOfBooks,
                LastPage = lastPage
            };
        }
    }
}
