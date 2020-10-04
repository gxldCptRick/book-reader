using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Models.Queries
{
    public class Query: IEnumerable<KeyValuePair<string, object>>
    {
        private IDictionary<string, object> _internalMappings;
        public Query()
        {
            _internalMappings = new Dictionary<string, object>();
        }
        protected void SetValue<T>(string  key, T value)
        {
            _internalMappings[key] = value;
        }
        protected T GetValue<T>(string key)
        {
            return (T)_internalMappings[key] ;
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return _internalMappings.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
