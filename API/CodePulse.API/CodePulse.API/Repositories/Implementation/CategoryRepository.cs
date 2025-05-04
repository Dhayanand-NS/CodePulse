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
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            var categories = await _dbcontext.Categories.ToListAsync();
            return categories;
        }
        public async Task<Category> GetById(Guid id)
        {
            var categories = await _dbcontext.Categories.Where(c => c.Id == id).FirstOrDefaultAsync();
            return categories;
        }

        public async Task<Category> UpdateAsync(Category category)
        {
            var existigCategory = await _dbcontext.Categories.Where(c => c.Id == category.Id).FirstOrDefaultAsync();
            if (category != null)
            {
                _dbcontext.Entry(existigCategory).CurrentValues.SetValues(category); 
                await _dbcontext.SaveChangesAsync();
                return category;
            }
            return null;   
        }
    }
}