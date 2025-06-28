using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class ImagesController : Controller
    {
        public readonly IImageRepository _imageRepository;

        public ImagesController(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }
        [HttpPost]
        public async  Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string fileName, [FromForm] string title)
        {
            ValidateFileUpload(file);
            if(ModelState.IsValid)
            {
                var blogImage = new BlogImage
                {
                    id = Guid.NewGuid(),
                    FileName = fileName,
                    Title = title,
                    FileExtension = Path.GetExtension(file.FileName).ToLower(),
                    DateCreated = DateTime.Now

                };
                var uploadedBlogImage = await _imageRepository.Upload(file, blogImage);

                //Convert Domain Modal to DTO
                var responseBlogImage = new BlogImageDTO
                {
                    id = uploadedBlogImage.id,
                    FileName = uploadedBlogImage.FileName,
                    Title = uploadedBlogImage.Title,
                    FileExtension = uploadedBlogImage.FileExtension,
                    Url = uploadedBlogImage.Url,
                    DateCreated = uploadedBlogImage.DateCreated
                };
                return Ok(responseBlogImage);
            }
            return BadRequest(ModelState);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var allImages = await _imageRepository.GetAllAsync();
            var responseImages = allImages.Select(image => new BlogImageDTO
            {
                id = image.id,
                FileName = image.FileName,
                Title = image.Title,
                FileExtension = image.FileExtension,
                Url = image.Url,
                DateCreated = image.DateCreated
            }).ToList();

            return Ok(responseImages);
        }
        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png", ".gif" };
            if(!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("File", "Unsupported FIle format");
            }
            if (file.Length > 10485760) //10 MB
            {
                ModelState.AddModelError("File", "File size exceeds the limit of 10 MB");
            }
        }
    }
}
