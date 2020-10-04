using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookReaderApi.Services
{
    public class FileLoadingService
    {

        public FileStream LoadFile(string routeDir, string path)
        {
            return File.OpenRead(Path.Combine(routeDir, path));
        }
    }
}
