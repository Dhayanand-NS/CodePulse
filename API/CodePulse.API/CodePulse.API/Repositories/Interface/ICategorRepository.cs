using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategorRepository
    {
        Task<Category> CreateAsync(Category category); 
        Task<IEnumerable<Category>> GetAllAsync(CategoryFilterModal filters);
        Task<Category> GetById(Guid id);
        Task<Category?> UpdateAsync(Category category);
        Task<Category?>DeleteAsync(Guid id);
        Task<int> GetCountAsync();
    }
}
