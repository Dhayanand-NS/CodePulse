using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class ImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ApplicationDbContext _dbContext;

        public ImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
        {
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }
        public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
        {
            //1. Upload the image to API/ Images
            //webHostEnvironment - to get the root path of the Images folder.
            var localPath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", $"{blogImage.FileName}{blogImage.FileExtension}");
            using var  stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            //2. Save the image to the database
            //Getting the scheme(http,https), host, and path to create the URL for the image, so thet we can store the url in the db.
            var httpRequest = _httpContextAccessor.HttpContext?.Request;
            var urlPath = $"{httpRequest?.Scheme}://{httpRequest?.Host}/Images/{blogImage.FileName}{blogImage.FileExtension}";

            blogImage.Url = urlPath;

            await _dbContext.BlogImages.AddAsync(blogImage);
            await _dbContext.SaveChangesAsync();

            return blogImage;
        }
        public async Task<IEnumerable<BlogImage>> GetAllAsync()
        {
            var images =await  _dbContext.BlogImages.ToListAsync();
            return images;
        }
    }
}
    