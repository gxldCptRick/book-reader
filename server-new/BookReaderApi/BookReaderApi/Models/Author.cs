using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public class Author: IEquatable<Author>, ILowerable<Author>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Title { get; set; }
        public Author Lower()
        {
            return new Author
            {
                FirstName = FirstName?.ToLower(),
                LastName = LastName?.ToLower(),
                MiddleName = MiddleName?.ToLower(),
                Title = Title?.ToLower(),
            };
        }
        public override bool Equals([AllowNull] object obj)
        {
            return obj is Author a && Equals(a);
        }
        public override int GetHashCode()
        {
            int hash = 0;
            hash ^= FirstName is null? 1: FirstName.GetHashCode();
            hash ^= LastName is null ? 2: LastName.GetHashCode();
            hash ^= MiddleName is null ? 4 : MiddleName.GetHashCode();
            hash ^= Title is null ? 8 : Title.GetHashCode();
            return hash;
        }

        public bool Equals([AllowNull] Author other)
        {
            return other != null &&
                    other.FirstName == FirstName &&
                    other.LastName == LastName &&
                    other.MiddleName == MiddleName &&
                    other.Title == Title;
        }
    }
}
