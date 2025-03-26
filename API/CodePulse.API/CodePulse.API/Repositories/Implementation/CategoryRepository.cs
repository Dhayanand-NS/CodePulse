using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategorRepository
    {
        private readonly ApplicationDbContext _dbcontext;

        public CategoryRepository(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _dbcontext.Categories.AddAsync(category);
            await _dbcontext.SaveChangesAsync();
            return category;
        } 
    }
}
