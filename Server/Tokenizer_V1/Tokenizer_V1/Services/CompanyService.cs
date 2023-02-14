using Clinic_V2._0.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tokenizer_V1.Classes;
using Tokenizer_V1.Db;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Companies;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ApplicationDbContext _context;
        public CompanyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DefaultResponse<Company>> CreateCompany(CreateCompanyReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Creating Company")
            };

            try
            {
                var company = new Company
                {
                    Address = req.Address,
                    Name = req.Name,
                    Phone = req.Phone,
                    Email = req.Email,
                    Website = req.Website,
                    CreatedAt = DateTime.Now,
                    Description = req.Description,
                    City = req.City,
                    Zip = req.Zip,
                    Country = req.Country,
                    CompanyTypeId = req.CompanyTypeId.Value,
                    IsActive = true,
                    IsDeleted = false,
                    TemplateLimit = req.TemplateLimit.Value,
                    TokenLimit = req.TokenLimit.Value,
                    UserLimit = req.UserLimit.Value
                };

                byte[] imageData = null;

                if (req.Logo != null)
                {
                    using (var binaryReader = new BinaryReader(req.Logo.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Logo.Length);
                    }
                }

                company.Logo = imageData;

                await _context.Companies.AddAsync(company);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Company Created");
                    response.Data = company;
                }
                else
                {
                    response.Status = new Status(false, "Company Not Created");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }


        // edit company

        public async Task<DefaultResponse<Company>> EditCompany(CreateCompanyReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Editing Company")
            };

            try
            {
                var company = await _context.Companies.FindAsync(req.Id);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                company.Address = req.Address;
                company.Name = req.Name;
                company.Phone = req.Phone;
                company.Email = req.Email;
                company.Website = req.Website;
                company.Description = req.Description;
                company.City = req.City;
                company.Zip = req.Zip;
                company.Country = req.Country;
                company.CompanyTypeId = req.CompanyTypeId.Value;
                company.TemplateLimit = req.TemplateLimit.Value;
                company.TokenLimit = req.TokenLimit.Value;
                company.UserLimit = req.UserLimit.Value;

                byte[] imageData = null;

                if (req.Logo != null)
                {
                    using (var binaryReader = new BinaryReader(req.Logo.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Logo.Length);
                    }
                }

                company.Logo = imageData;

                _context.Companies.Update(company);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Company Edited");
                    response.Data = company;
                }
                else
                {
                    response.Status = new Status(false, "Company Not Edited");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // delete company

        public async Task<DefaultResponse<Company>> DeleteCompany(IdReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Deleting Company")
            };

            try
            {
                var company = await _context.Companies.FindAsync(req.Id);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                company.IsDeleted = true;

                _context.Companies.Update(company);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Company Deleted");
                    response.Data = company;
                }
                else
                {
                    response.Status = new Status(false, "Company Not Deleted");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // get company

        public async Task<DefaultResponse<ExpandoObject>> GetCompany(IdReq req)
        {
            var response = new DefaultResponse<ExpandoObject>
            {
                Status = new Status(false, "Getting Company")
            };

            try
            {
                var company = await _context.Companies.AsNoTracking().FirstOrDefaultAsync(x => x.Id == req.Id);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                response.Status = new Status(true, "Company Found");
                dynamic res = new ExpandoObject();
                res.Company = company;

                var TemplatesAndTokensCount = new Dictionary<Template, int>();

                var templates = await _context.Templates.AsNoTracking().Where(x => x.CompanyId == req.Id).ToListAsync();

                foreach (var template in templates)
                {
                    var tokensCount = await _context.Tokens.AsNoTracking().Where(x => x.TemplateId == template.Id).CountAsync();
                    TemplatesAndTokensCount.Add(template, tokensCount);
                }
                res.TemplatesAndTokensCount = TemplatesAndTokensCount;
                var Users = await _context.Users.AsNoTracking().Where(x => x.CompanyId == req.Id).ToListAsync();
                res.Users = Users;
                response.Data = res;
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // search companies (SearchCompaniesReq)

        public async Task<DefaultResponse<PagedList<Company>>> SearchCompanies(SearchCompaniesReq req)
        {
            var response = new DefaultResponse<PagedList<Company>>
            {
                Status = new Status(false, "Searching Companies")
            };

            try
            {
                var companies = _context.Companies.Where(x => x.IsDeleted == false).AsQueryable();
                if (req.Id.HasValue)
                {
                    companies = companies.Where(x => x.Id == req.Id);
                }

                if (!string.IsNullOrEmpty(req.Name))
                {
                    companies = companies.Where(x => x.Name.Contains(req.Name));
                }

                //email
                //phone
                //website
                //address
                //zip

                if (!string.IsNullOrEmpty(req.Email))
                {
                    companies = companies.Where(x => x.Email.Contains(req.Email));
                }

                if (!string.IsNullOrEmpty(req.Phone))
                {
                    companies = companies.Where(x => x.Phone.Contains(req.Phone));
                }

                if (!string.IsNullOrEmpty(req.Website))
                {
                    companies = companies.Where(x => x.Website.Contains(req.Website));
                }

                if (!string.IsNullOrEmpty(req.Address))
                {
                    companies = companies.Where(x => x.Address.Contains(req.Address));
                }

                if (!string.IsNullOrEmpty(req.Zip))
                {
                    companies = companies.Where(x => x.Zip.Contains(req.Zip));
                }


                if (!string.IsNullOrEmpty(req.Description))
                {
                    companies = companies.Where(x => x.Description.Contains(req.Description));
                }

                if (!string.IsNullOrEmpty(req.Country))
                {
                    companies = companies.Where(x => x.Country.Contains(req.Country));
                }

                if (!string.IsNullOrEmpty(req.City))
                {
                    companies = companies.Where(x => x.City.Contains(req.City));
                }

                if (req.CompanyTypeId.HasValue)
                {
                    companies = companies.Where(x => x.CompanyTypeId == req.CompanyTypeId);
                }

                var pagedCompanies = new PagedList
                    <Company>(companies, req.pagingParams.PageNumber, req.pagingParams.PageSize);

                if (pagedCompanies != null)
                {
                    response.Status = new Status(true, "Companies Found");
                    response.Data = pagedCompanies;
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // add user to company (AddManyToManyReq)


        public async Task<DefaultResponse<Company>> AddUserToCompany(ManyToManyReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Adding User to Company")
            };

            try
            {
                var company = await _context.Companies.FindAsync(req.Id2);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                var user = await _context.Users.FindAsync(req.Id2);

                if (user == null)
                {
                    response.Status = new Status(false, "User Not Found");
                    return response;
                }

                user.CompanyId = company.Id;

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "User Added to Company");
                    response.Data = company;
                }
                else
                {
                    response.Status = new Status(false, "User Not Added to Company");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // remove user from company (RemoveManyToManyReq)

        public async Task<DefaultResponse<Company>> RemoveUserFromCompany(ManyToManyReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Removing User from Company")
            };

            try
            {
                var company = await _context.Companies.FindAsync(req.Id2);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                var user = await _context.Users.FindAsync(req.Id2);

                if (user == null)
                {
                    response.Status = new Status(false, "User Not Found");
                    return response;
                }


                if (user.CompanyId != company.Id)
                {
                    response.Status = new Status(false, "User Not Found in Company");
                    return response;
                }

                user.CompanyId = null;

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 1)
                {
                    response.Status = new Status(true, "User Removed from Company");
                }
                else
                {
                    response.Status = new Status(false, "User Removal Failed");
                }
                response.Data = company;
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }
            return response;
        }

        //Edit company user type (IdReq)
        //user.id = idreq.id, user.usertype = idreq.name

        public async Task<DefaultResponse<User>> EditCompanyUserType(IdReq req)
        {
            var response = new DefaultResponse<User>
            {
                Status = new Status(false, "Editing Company User Type")
            };

            try
            {
                var user = await _context.Users.FindAsync(req.Id);

                if (user == null)
                {
                    response.Status = new Status(false, "User Not Found");
                    return response;
                }
                //TODO: 
                //make sure sender is user's company admin
                user.UserType = req.Name;

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "User Type Edited");
                    response.Data = user;
                }
                else
                {
                    response.Status = new Status(false, "User Type Not Edited");
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
