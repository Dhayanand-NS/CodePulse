using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategorRepository _category; 
        public CategoriesController(ICategorRepository category)
        {
            _category = category;
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO createCategory)
        {
            //Map DTO to Domain Model
            //we need not map id property because EFcore is smart enough to create unique identifier when it saves to DB!!
            var category = new Category
            {
                Name = createCategory.Name,
                UrlHandle = createCategory.UrlHandle
            };
            await _category.CreateAsync(category);

            //Map Domain Model to DTO
            var responseCategory = new ResponseCategoryDTO
            {
                Id =   category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(responseCategory);
        } 
    }
}
