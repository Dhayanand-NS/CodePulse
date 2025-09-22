using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;
        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login(LoginRequestDTO loginReq)
        {
            //Check email
            var identityUserEmailCheck = await _userManager.FindByEmailAsync(loginReq.Email);// if email exists it'll gimme the IdentityUser
            //Check password
            if(identityUserEmailCheck is not null)
            {
                var checkPassword = await _userManager.CheckPasswordAsync(identityUserEmailCheck,loginReq.Password);
                //returning roles and credientials of the particular user
                if (checkPassword)
                {
                    var roles = await _userManager.GetRolesAsync(identityUserEmailCheck);
                    var JWT = _tokenRepository.CreateToken(identityUserEmailCheck, roles.ToList());
                    var response = new ResposeLoginDTO()
                    {
                        Email = loginReq.Email,
                        Token = JWT,
                        Roles = roles.ToList()
                    };
                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");
            return ValidationProblem(ModelState);
        }



       [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Register(RegisterRequestDTO regReqest)
        {
            // Create IdetityUser Object
            var user = new IdentityUser
            {
                UserName = regReqest.Email?.Trim(),
                Email = regReqest.Email?.Trim(),
            };
            //Seed the user in the database
            var reslt = await _userManager.CreateAsync(user, regReqest.Password);
            if (reslt.Succeeded)
            {
                //Add Role to user Reader
                
                //When the user register with the credientials he has only "Reader" role, need not get Admin ie. "Writer" role.
                reslt = await _userManager.AddToRoleAsync(user, "Reader");
                if (reslt.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    // sending list of errors
                    if (reslt.Errors.Any())
                    {
                        foreach (var error in reslt.Errors)
                        {
                            ModelState.AddModelError(" ", error.Description);
                        }
                    }
                }
            }
            else
            {
                // sending list of errors
                if (reslt.Errors.Any())
                {
                    foreach(var error in reslt.Errors)
                    {
                        ModelState.AddModelError(" ", error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);
        }
    }
}
