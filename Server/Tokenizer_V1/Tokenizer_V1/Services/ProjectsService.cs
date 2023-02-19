using Clinic_V2._0.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tokenizer_V1.Classes;
using Tokenizer_V1.Db;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Projects;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Services
{
    public class ProjectsService : IProjectsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUsersService _users;

        public ProjectsService(ApplicationDbContext context, IUsersService users)
        {
            _context = context;
            _users = users;
        }

        public async Task<DefaultResponse<Project>> CreateProject(IdReq req)
        {
            var response = new DefaultResponse<Project>
            {
                Status = new Status(false, "Project not created")
            };

            try
            {
                var project = new Project
                {
                    Name = req.Name,
                    CreatedAt = DateTime.Now,
                    IsDeleted = false
                };

                await _context.Projects.AddAsync(project);
                var res = await _context.SaveChangesAsync();

                if (res > 0)
                {
                    response.Status = new Classes.Status(true, "Project created successfully");
                    response.Data = project;
                }
                else
                {
                    response.Status = new Classes.Status(false, "Project not created");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }
        public async Task<DefaultResponse<Project>> EditProject(IdReq req)
        {
            var response = new DefaultResponse<Project>
            {
                Status = new Status(false, "Project not edited")
            };

            try
            {
                var project = await _context.Projects.FindAsync(req.Id);

                if (project != null)
                {
                    project.Name = req.Name;
                    _context.Projects.Update(project);
                    var res = await _context.SaveChangesAsync();

                    if (res > 0)
                    {
                        response.Status = new Classes.Status(true, "Project edited successfully");
                        response.Data = project;
                    }
                    else
                    {
                        response.Status = new Classes.Status(false, "Project not edited");
                    }
                }
                else
                {
                    response.Status = new Classes.Status(false, "Project not found");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }
        public async Task<DefaultResponse<Project>> ToggleProject(IdReq req)
        {
            var response = new DefaultResponse<Project>
            {
                Status = new Status(false, "Project not toggled")
            };

            try
            {
                var project = await _context.Projects.FindAsync(req.Id);

                if (project != null)
                {
                    project.IsDeleted = !project.IsDeleted;
                    _context.Projects.Update(project);
                    var res = await _context.SaveChangesAsync();

                    if (res > 0)
                    {
                        response.Status = new Classes.Status(true, "Project toggled successfully");
                        response.Data = project;
                    }
                    else
                    {
                        response.Status = new Classes.Status(false, "Project not toggled");
                    }
                }
                else
                {
                    response.Status = new Classes.Status(false, "Project not found");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }
        public async Task<DefaultResponse<Project>> GetProject(IdReq req)
        {
            var response = new DefaultResponse<Project>
            {
                Status = new Status(false, "Project not found")
            };

            try
            {
                var project = await _context.Projects
                    .Include(p => p.Templates)
                    .ThenInclude(p => p.TokenType)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == req.Id);

                if (project != null)
                {
                    response.Status = new Classes.Status(true, "Project found");
                    response.Data = project;
                }
                else
                {
                    response.Status = new Classes.Status(false, "Project not found");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }
        public async Task<DefaultResponse<PagedList<Project>>> SearchProjects(SearchProjectsReq req)
        {
            var response = new DefaultResponse<PagedList<Project>>
            {
                Status = new Status(false, "Projects not found")
            };

            try
            {
                var projects = _context.Projects
                    .Include(p => p.Users)
                    .ThenInclude(u => u.User)
                    .AsNoTracking();

                if (req.Id.HasValue)
                {
                    projects = projects.Where(p => p.Id == req.Id.Value);
                }

                if (!string.IsNullOrEmpty(req.Name))
                {
                    projects = projects.Where(p => p.Name.Contains(req.Name));
                }

                if (req.IsDeleted != null)
                {
                    projects = projects.Where(p => p.IsDeleted == req.IsDeleted);
                }
                else
                {
                    projects = projects.Where(p => p.IsDeleted == false);
                }

                var pagedProjects = new PagedList<Project>(projects, req.PagingParams.PageNumber, req.PagingParams.PageSize);

                if (pagedProjects != null)
                {
                    response.Status = new Classes.Status(true, "Projects found");
                    response.Data = pagedProjects;
                }
                else
                {
                    response.Status = new Classes.Status(false, "Projects not found");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }

        // add user to project and remove user from project 
        public async Task<DefaultResponse<Project>> AddUserToProject(ManyToManyReq req)
        {
            var response = new DefaultResponse<Project>
            {
                Status = new Status(false, "User not added to project")
            };

            try
            {
                var project = await _context.Projects
                    .Include(p => p.Users)
                    .FirstOrDefaultAsync(p => p.Id == req.Id1);
                var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == req.Id2);

                if (project == null)
                {
                    response.Status = new Classes.Status(false, "Project not found");
                    return response;
                }
                if (user == null)
                {
                    response.Status = new Classes.Status(false, "User not found");
                    return response;
                }

                // check if user project already exists
                var userProject = _context.UserProjects
                    .FirstOrDefault(up => up.ProjectId == project.Id && up.UserId == user.Id);
                if (userProject != null)
                {
                    response.Status = new Classes.Status(false, "User already added to project");
                    return response;
                }

                // add user to project
                var newUserProject = new UserProject
                {
                    ProjectId = project.Id,
                    UserId = user.Id
                };

                await _context.UserProjects.AddAsync(newUserProject);
                var res = await _context.SaveChangesAsync();

                if (res > 0)
                {
                    response.Status = new Status(true, "User added to project successfully");
                    response.Data = project;
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }

        // remove user from project (delete user project enty from IdReq)
        public async Task<DefaultResponse<string>> RemoveUserFromProject(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "User not removed from project")
            };

            try
            {
                var userProject = await _context.UserProjects.FindAsync(req.Id);

                if (userProject != null)
                {
                    _context.UserProjects.Remove(userProject);
                    var res = await _context.SaveChangesAsync();

                    if (res > 0)
                    {
                        response.Status = new Classes.Status(true, "User removed from project successfully");
                        response.Data = "User removed from project successfully";
                    }
                    else
                    {
                        response.Status = new Classes.Status(false, "User not removed from project");
                    }
                }
                else
                {
                    response.Status = new Classes.Status(false, "User project not found");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }

        // get current user projects
        public async Task<DefaultResponse<List<Project>>> GetUserProjects()
        {
            var response = new DefaultResponse<List<Project>>
            {
                Status = new Status(false, "Projects not found")
            };
            try
            {
                var user = await _users.GetCurrentUser();
                if (user == null)
                {
                    response.Status = new Classes.Status(false, "User not found");
                    return response;
                }

                var projects = await _context.Projects
                    .Include(p => p.Users)
                    .Where(p => p.IsDeleted == false && p.Users.Any(u => u.UserId == user.Data.Id))
                    .AsNoTracking()
                    .ToListAsync();
                
                response.Status = new Status(true, "Projects found");
                response.Data = projects;
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }
            return response;
        }

    }
}
