using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models.Queries
{
    public class BookQuery: Query
    {
        public string Title { get => GetValue<string>(nameof(Title)); set => SetValue(nameof(Title), value); }
        public bool BookIsMatch(Book book)
        {
            bool isGoodEnough = true;
            foreach(var property in this.Where(prop => prop.Key != nameof(Author)))
            {
                var prop = typeof(Book).GetProperty(property.Key);
                if (prop != null)
                {
                    isGoodEnough &= prop.GetValue(book) == property.Value;
                }
            }
            return isGoodEnough;
        }
    }
}
