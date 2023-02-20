using Clinic_V2._0.Paging;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tokenizer_V1.Classes;
using Tokenizer_V1.Db;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Users;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _http;

        public UsersService(ApplicationDbContext context, IHttpContextAccessor http)
        {
            _context = context;
            _http = http;
        }

        public async Task<DefaultResponse<User>> CreateUser(CreateUserReq req)
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "User not created")
            };

            try
            {
                var CurrentUser = await GetCurrentUser();

                if ((req.UserType == "Admin" || req.UserType == "SuperAdmin") && CurrentUser.Data.UserType != "SuperAdmin")
                {
                    response.Status.Message = "You are not authorized to create an admin user";
                    return response;
                }

                if (req.UserType == UserTypes.Manager && CurrentUser.Data.UserType != UserTypes.SuperAdmin
                    && CurrentUser.Data.UserType != UserTypes.Admin)
                {
                    response.Status.Message = "You are not authorized to create a manager user";
                    return response;
                }

                if (req.UserType == UserTypes.CompanyAdmin && CurrentUser.Data.UserType != UserTypes.SuperAdmin
                    && CurrentUser.Data.UserType != UserTypes.Admin
                    && CurrentUser.Data.UserType != UserTypes.CompanyAdmin)
                {
                    response.Status.Message = "You are not authorized to create a company admin user";
                    return response;
                }


                FirebaseAdmin.Auth.UserRecord userRecord = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.CreateUserAsync(new FirebaseAdmin.Auth.UserRecordArgs
                {
                    Email = req.Email,
                    EmailVerified = false,
                    Password = req.Password,
                    DisplayName = req.Name,
                    Disabled = false
                });

                // add security

                var user = new User
                {
                    FirebaseId = userRecord.Uid,
                    Name = userRecord.DisplayName,
                    Email = userRecord.Email,
                    Phone = req.Phone,
                    UserType = req.UserType,
                    IsActive = true,
                    IsDeleted = false
                };

                await _context.Users.AddAsync(user);
                var res = await _context.SaveChangesAsync();

                if (res > 0)
                {
                    response.Status = new Classes.Status(true, "User created successfully");
                    response.Data = user;
                }
                else
                {
                    response.Status = new Classes.Status(false, "User not created");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Classes.Status(false, ex.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<PagedList<User>>> SearchUsers(SearchUsersReq req)
        {
            var response = new DefaultResponse<PagedList<User>>
            {
                Status = new Status(false, "Users not found")
            };

            try
            {
                var users = _context.Users
                    .Include(p => p.Projects)
                    .ThenInclude(p => p.Project)
                    .OrderByDescending(p => p.Id)
                    .AsNoTracking().AsQueryable();

                if (req.Id.HasValue)
                {
                    users = users.Where(x => x.Id == req.Id.Value);
                }

                if (!string.IsNullOrWhiteSpace(req.Name))
                {
                    users = users.Where(x => x.Name.Contains(req.Name));
                }

                if (!string.IsNullOrWhiteSpace(req.Email))
                {
                    users = users.Where(x => x.Email.Contains(req.Email));
                }

                if (!string.IsNullOrWhiteSpace(req.Phone))
                {
                    users = users.Where(x => x.Phone.Contains(req.Phone));
                }

                if (!string.IsNullOrWhiteSpace(req.UserType))
                {
                    users = users.Where(x => x.UserType.Contains(req.UserType));
                }

                if (req.IsActive.HasValue)
                {
                    users = users.Where(x => x.IsActive == req.IsActive.Value);
                }

                if (req.IsDeleted.HasValue)
                {
                    users = users.Where(p => p.IsDeleted == req.IsDeleted.Value);
                }
                else
                {
                    users = users.Where(p => p.IsDeleted == false);
                }

                var userList = new PagedList<User>(users, req.PagingParams.PageNumber, req.PagingParams.PageSize);

                if (userList != null)
                {
                    response.Status = new Status(true, "Users found");
                    response.Data = userList;
                }
            }
            catch (Exception ex)
            {
                response.Status = new Status(false, ex.Message);
            }

            return response;
        }

        // get user by id and include projects
        public async Task<DefaultResponse<User>> GetUserById(IdReq req)
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "User not found")
            };

            try
            {
                var user = await _context.Users
                    .Include(x => x.Projects)
                    .FirstOrDefaultAsync(x => x.Id == req.Id);

                if (user != null)
                {
                    response.Status = new Status(true, "User found");
                    response.Data = user;
                }
                else
                {
                    response.Status = new Status(false, "User not found");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);

            }

            return response;

        }

        // Toggle user Delete 

        public async Task<DefaultResponse<User>> ToggleUserDelete(IdReq req)
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "User not found")
            };

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == req.Id);

                if (user != null)
                {
                    user.IsDeleted = !user.IsDeleted;
                    _context.Users.Update(user);
                    var res = await _context.SaveChangesAsync();

                    if (res > 0)
                    {
                        response.Status = new Status(true, "User updated successfully");
                        response.Data = user;
                    }
                    else
                    {
                        response.Status = new Status(false, "User not updated");
                    }
                }
                else
                {
                    response.Status = new Status(false, "User not found");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // Toggle user Activation

        public async Task<DefaultResponse<User>> ToggleUserActivation(IdReq req)
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "User not found")
            };

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == req.Id);

                if (user != null)
                {
                    user.IsActive = !user.IsActive;
                    _context.Users.Update(user);
                    var res = await _context.SaveChangesAsync();

                    if (res > 0)
                    {
                        response.Status = new Status(true, "User updated successfully");
                        response.Data = user;
                    }
                    else
                    {
                        response.Status = new Status(false, "User not updated");
                    }
                }
                else
                {
                    response.Status = new Status(false, "User not found");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // Get Caller

        public async Task<DefaultResponse<User>> GetCurrentUser()
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "User not found")
            };

            try
            {
                var accessToken = _http.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
                    .VerifyIdTokenAsync(accessToken);
                string uid = decodedToken.Uid;
                var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(p => p.FirebaseId == uid);

                if (user != null)
                {
                    response.Status = new Status(true, "User found");
                    response.Data = user;
                }
                else
                {
                    response.Status = new Status(false, "User not found");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }
    }



}
