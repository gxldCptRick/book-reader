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
            List<Book> booksFound = new List<Book>();
            var currentPage = request.Page;
            int? nextPage = null;
            int? previousPage = null;
            int pageSize = request.AmountOfBooks;
            int lastPage = 1;
            if (Directory.Exists(request.RootDir))
            {
                var query = DiscoverBooksOnFileSystems(request.RootDir).Where(request.BookFilter.BookIsMatch);
                var totalAmountOfBooks = query.Count();
                currentPage = request.Page - 1;
                booksFound = query.Skip((currentPage) * request.AmountOfBooks).Take(request.AmountOfBooks).ToList();
                nextPage = lastPage == request.Page ? (int?)null : request.Page + 1;
                previousPage = request.Page == 1 ? (int?)null : request.Page - 1;
                lastPage = (int)Math.Ceiling(((double)totalAmountOfBooks) / request.AmountOfBooks);

            }
            else
            {
                throw new FileNotFoundException("Could not find rootdir", request.RootDir);
            }
            return new BookSet
            {
                BooksFound = booksFound,
                CurrentPage = currentPage,
                NextPage = nextPage,
                PreviousPage = previousPage,
                PageSize = pageSize,
                LastPage = lastPage
            };
        }
    }
}
