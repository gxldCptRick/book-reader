namespace BookReaderApi.Models
{
    public class ResultInformation
    {
        public int CurrentPage { get; set; }
        public int Count { get; internal set; }
        public int? NextPage { get; set; }
        public int? PreviousPage { get; set; }
        public int LastPage { get; set; }
        public int PageSize { get; set; }
    }
}