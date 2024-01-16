using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GemsWebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly IUserInterface userInterface;
        private readonly IOptions<Token> _jwt;
        public LoginController(IUserInterface _userInterface, IOptions<Token> jwt)
        {
            userInterface = _userInterface;
            _jwt = jwt;
        }


        // GET: api/<LoginController>
        [HttpPost]
        public IActionResult Login([FromBody] LoginDetails loginDetails )
        {
            bool response = false ;
            IActionResult result = Unauthorized();
            try
            {
                response = userInterface.LoginCheck(loginDetails);

                if (response)
                {
                    var token = GenerateJSONWebToken(loginDetails);
                    var res = new
                    {
                        token = token,
                        islogin = true
                    };

                    result = new JsonResult(res)
                    {
                        StatusCode = (int)HttpStatusCode.OK                        
                    };
                }
                //else
                //{
                //    var res = new
                //    {
                //        token = "",
                //        islogin = false
                //    };
                //    result = new JsonResult(res)
                //    {
                //        StatusCode = (int)HttpStatusCode.OK
                //    };
                //}

               


                return result;
            }
            catch (Exception ex)
            {

               result = new JsonResult(response)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };

                return result;
            }

        }

        private string GenerateJSONWebToken(LoginDetails userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Value.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              _jwt.Value.Issuer,
              _jwt.Value.Audience,
              null,
              expires: DateTime.Now.AddMinutes(1),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
