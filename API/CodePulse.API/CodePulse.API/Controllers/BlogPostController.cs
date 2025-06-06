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
        private readonly ICategorRepository _category;
        public BlogPostController(IBlogPostRepository blogPost, ICategorRepository category)
        {
            _blogPost = blogPost;
            _category = category;
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
                IsVisible = requestDTO.IsVisible, 
                Categories = new List<Category>()
            };
            foreach(var categoryGuid in requestDTO.Categories)
            {
                var existingCategory = await _category.GetById(categoryGuid);
                if(existingCategory is not null)
                {
                    blogPost.Categories.Add(existingCategory);
                }

            }
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
                IsVisible = blog.IsVisible,
                Categories = blog.Categories.Select(c => new ResponseCategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            };

            return Ok(ResponseBlogPost);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogPosts = await _blogPost.GetAllAsync();
            //Map Domain Model to DTO
            var responseBlogPosts = blogPosts.Select(b => new ResponseBlogPostDTO
            {
                Id = b.Id,
                Title = b.Title,
                ShortDescription = b.ShortDescription,
                Content = b.Content,
                FeaturedImageUrl = b.FeaturedImageUrl,
                UrlHandle = b.UrlHandle,
                PublisedDate = b.PublisedDate,
                Author = b.Author,
                IsVisible = b.IsVisible,
                Categories = b.Categories.Select(c => new ResponseCategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            }).ToList();
            return Ok(responseBlogPosts);
        }

    }
}
