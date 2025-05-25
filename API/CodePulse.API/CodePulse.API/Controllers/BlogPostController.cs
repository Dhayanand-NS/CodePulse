using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : Controller
    {
        private readonly IBlogPostRepository _blogPost;   
        public BlogPostController(IBlogPostRepository blogPost)
        {
            _blogPost = blogPost;
        }
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(CreateBlogPostRequestDTO requestDTO)
        {
           //Map DTO to Domain Model
           var blogPost = new BlogPost
           {
               Title = requestDTO.Title,
               ShortDescription = requestDTO.ShortDescription,
               Content = requestDTO.Content,
               FeaturedImageUrl = requestDTO.FeaturedImageUrl,
               UrlHandle = requestDTO.UrlHandle,
               PublisedDate = requestDTO.PublisedDate,
               Author = requestDTO.Author,
               IsVisible = requestDTO.IsVisible
           };
            var blog = await _blogPost.CreateAsync(blogPost);

            //Map Domain Model to DTO
            var ResponseBlogPost = new ResponseBlogPostDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                ShortDescription = blog.ShortDescription,
                Content = blog.Content,
                FeaturedImageUrl = blog.FeaturedImageUrl,
                UrlHandle = blog.UrlHandle,
                PublisedDate = blog.PublisedDate,
                Author = blog.Author,
                IsVisible = blog.IsVisible
            };

            return Ok(ResponseBlogPost); 
        }
    }
}
