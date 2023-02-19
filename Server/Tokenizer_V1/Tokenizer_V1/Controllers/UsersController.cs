using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Users;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersService _users;

        public UsersController(IUsersService users)
        {
            _users = users;
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _users.CreateUser(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("SearchUsers")]
        public async Task<IActionResult> SearchUsers([FromBody] SearchUsersReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _users.SearchUsers(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("GetUserById")]
        public async Task<IActionResult> GetUserById([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _users.GetUserById(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("ToggleUserDelete")]
        public async Task<IActionResult> ToggleUserDelete([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _users.ToggleUserDelete(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("ToggleUserActivation")]
        public async Task<IActionResult> ToggleUserActivation([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _users.ToggleUserActivation(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("GetCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var response = await _users.GetCurrentUser();

            return Ok(response);
        }

    }
}
