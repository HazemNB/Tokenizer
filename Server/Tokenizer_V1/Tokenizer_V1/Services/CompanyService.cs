using Clinic_V2._0.Paging;
using System;
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

        public async Task<DefaultResponse<Company>> GetCompany(IdReq req)
        {
            var response = new DefaultResponse<Company>
            {
                Status = new Status(false, "Getting Company")
            };

            try
            {
                var company = await _context.Companies.FindAsync(req.Id);

                if (company == null)
                {
                    response.Status = new Status(false, "Company Not Found");
                    return response;
                }

                response.Status = new Status(true, "Company Found");
                response.Data = company;
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
    }
}
