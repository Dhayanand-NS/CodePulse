using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using LinqKit;
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
        public async Task<IEnumerable<Category>> GetAllAsync(CategoryFilterModal filters)
        {
            // Filtering data
            var predicate = PredicateBuilder.New<Category>(true);
            if (filters.Name != null)
            {
            predicate = predicate.And(c => c.Name.Contains(filters.Name));
            }
            if (filters.UrlHandle != null)
            {
                predicate = predicate.And(c => c.UrlHandle.Contains(filters.UrlHandle));
            }
            var categories = await _dbcontext.Categories.Where(predicate).ToListAsync();

            // Sorting data
            if (filters.Sort != null)
            {
                if(filters.Sort.ToLower() == "asc")
                {
                    if(filters.Sortable != null && filters.Sortable.ToLower() == "name")
                    {
                        categories = categories.OrderBy(c => c.Name).ToList();
                    }
                    else if (filters.Sortable != null && filters.Sortable.ToLower() == "urlhandle")
                    {
                        categories = categories.OrderBy(c => c.UrlHandle).ToList();
                    }
                }
                else if(filters.Sort.ToLower() == "desc")
                {
                    if (filters.Sortable != null && filters.Sortable.ToLower() == "name")
                    {
                        categories = categories.OrderByDescending(c => c.Name).ToList();
                    }
                    if (filters.Sortable != null && filters.Sortable.ToLower() == "urlhandle")
                    {
                        categories = categories.OrderByDescending(c => c.UrlHandle).ToList();
                    }
                }
            }

            // Pagination and PageSize
            var skip = (filters.PageNumber - 1) * filters.PageSize;
            categories = categories.Skip(skip).Take(filters.PageSize).ToList();
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
        public async Task<Category?> DeleteAsync(Guid id)
        {
           var existingCategory = _dbcontext.Categories.Where(c => c.Id == id).FirstOrDefault();
            if (existingCategory == null)
            {
                return null;
            }
            _dbcontext.Categories.Remove(existingCategory);
            await _dbcontext.SaveChangesAsync();
            return existingCategory;
        }
        public async Task<int> GetCountAsync()
        {
            return await _dbcontext.Categories.CountAsync();
        }   

    }
}