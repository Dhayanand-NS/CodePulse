using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _dbcontext;

        public BlogPostRepository(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await _dbcontext.BlogPosts.AddAsync(blogPost);
            await _dbcontext.SaveChangesAsync();
            return blogPost;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            var blogPosts = await _dbcontext.BlogPosts.Include(x=>x.Categories).ToListAsync();
            return blogPosts;
        }

        public async Task<BlogPost> GetBlogPostById(Guid id)
        {
            var blogPost = await _dbcontext.BlogPosts.Include(x=> x.Categories).Where(x => x.Id == id).FirstOrDefaultAsync();
            return blogPost;
        }

        public async Task<BlogPost> UpdateAsync(BlogPost blogPost)
        {
            var existingBlogPost = await _dbcontext.BlogPosts.Include(x=>x.Categories).Where(x => x.Id == blogPost.Id).FirstOrDefaultAsync();
            if (existingBlogPost != null)
            {
                // Update categories if they are part of the blog post (i.e. SetValues - it wont update if the data is in other table but in relation with blog post tabe)
                _dbcontext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);
                // so explicitly set the categories to update them
                existingBlogPost.Categories = blogPost.Categories;
                await _dbcontext.SaveChangesAsync();
                return blogPost;
            }
            return null;
        }
    }
}
    