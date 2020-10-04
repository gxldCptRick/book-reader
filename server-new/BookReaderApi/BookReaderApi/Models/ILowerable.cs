using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models
{
    public interface ILowerable<T>
    {
        public T Lower();
    }
}
