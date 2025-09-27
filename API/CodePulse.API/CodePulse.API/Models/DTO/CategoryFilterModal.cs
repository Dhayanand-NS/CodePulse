namespace CodePulse.API.Models.DTO
{
    public class CategoryFilterModal
    {
        public string? Name { get; set; }
        public string? UrlHandle { get; set; }
        public string? Sort { get; set; }
        public string? Sortable { get; set; }
        public int PageNumber { get; set; } = 1;    
        public int PageSize { get; set; } = 10;
    }
}
