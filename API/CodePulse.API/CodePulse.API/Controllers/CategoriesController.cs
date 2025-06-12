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
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(responseCategory);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _category.GetAllAsync();
            //Map Domain Model to DTO
            var responseCategories = categories.Select(c => new ResponseCategoryDTO
            {
                Id = c.Id,
                Name = c.Name,
                UrlHandle = c.UrlHandle
            }).ToList();
            return Ok(responseCategories);
        }
        [HttpGet]
         [Route("{id}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var category = await _category.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            var resposeCategory = new ResponseCategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(resposeCategory);
        }
        [HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> EditCategory(Guid id, UpdateCategoryResponseDTO editCategory)
        {
            //Map DTO to Domain Model
            var category = new Category
            {
                Id = id,
                Name = editCategory.Name,
                UrlHandle = editCategory.UrlHandle
            };
            var result = await _category.UpdateAsync(category);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                //Map Domain Model to DTO
                var responseCategor = new ResponseCategoryDTO
                {
                    Id = result.Id,
                    Name = result.Name,
                    UrlHandle = result.UrlHandle
                };
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await _category.DeleteAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var responseCategory = new ResponseCategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(responseCategory);
        }
    }
}
 