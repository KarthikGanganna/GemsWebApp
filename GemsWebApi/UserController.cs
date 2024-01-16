using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GemsWebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface userInterface;
        public UserController(IUserInterface _userInterface)
        {
            userInterface = _userInterface;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Route("GetDashboard")]
        [Authorize]
        public IActionResult GetDashboard()
        {
            Dashboard dashboard  = new Dashboard();
            try
            {
                dashboard = userInterface.GetDashboard();

                IActionResult result = new JsonResult(dashboard)
                {
                    StatusCode = (int)HttpStatusCode.OK
                };

                return result;
            }
            catch (Exception)
            {

                IActionResult result = new JsonResult(dashboard)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };

                return result;
            }
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            List<User> user = new List<User>();
            try
            {
                user = userInterface.GetUser();

                IActionResult result = new JsonResult(user)
                {
                    StatusCode = (int)HttpStatusCode.OK
                };

                return result;
            }
            catch (Exception)
            {

                IActionResult result = new JsonResult(user)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError
                };

                return result;
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetUser([FromRoute] int id)
        {
            User user = new User();
            user = userInterface.GetUser(id);

            IActionResult result = new JsonResult(user)
            {
                StatusCode = (int)HttpStatusCode.OK
            };

            return result;
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] User user)
        {
            bool status = userInterface.AddUser(user);
            IActionResult result = new JsonResult(status)
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return result;
        }

        [HttpPut]
        public IActionResult EditUser([FromBody] User user)
        {
            bool response = userInterface.EditUser(user);
            IActionResult result = new JsonResult(response)
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return result;
        }


        [HttpDelete]
        public IActionResult DeleteUser([FromQuery] int id)
        {
            bool response = userInterface.DeleteUser(id);
            IActionResult result = new JsonResult(response)
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return result;
        }

    }


    
}
