using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Projects;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly IProjectsService _projects;

        public ProjectsController(IProjectsService projects)
        {
            _projects = projects;
        }

        [HttpPost]
        [Route("CreateProject")]
        public async Task<IActionResult> CreateProject([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.CreateProject(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("EditProject")]
        public async Task<IActionResult> EditProject([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.EditProject(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("SearchProjects")]
        public async Task<IActionResult> SearchProjects([FromBody] SearchProjectsReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.SearchProjects(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("GetProject")]
        public async Task<IActionResult> GetProject([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.GetProject(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("ToggleProject")]
        public async Task<IActionResult> ToggleProject([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.ToggleProject(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("AddUserToProject")]
        public async Task<IActionResult> AddUserToProject([FromBody] ManyToManyReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.AddUserToProject(request);

            return Ok(response);
        }

        [HttpPost]
        [Route("RemoveUserFromProject")]
        public async Task<IActionResult> RemoveUserFromProject([FromBody] IdReq request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.RemoveUserFromProject(request);

            return Ok(response);
        }

        [HttpGet]
        [Route("GetUserProjects")]
        public async Task<IActionResult> GetUserProjects()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _projects.GetUserProjects();

            return Ok(response);
        }

    }
}
