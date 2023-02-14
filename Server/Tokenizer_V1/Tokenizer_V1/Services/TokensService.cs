using Clinic_V2._0.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tokenizer_V1.Classes;
using Tokenizer_V1.Db;
using Tokenizer_V1.Models;
using Tokenizer_V1.Requests;
using Tokenizer_V1.Requests.Templates;
using Tokenizer_V1.Requests.Tokens;
using Tokenizer_V1.Responses;
using Tokenizer_V1.Responses.ViewModels;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1.Services
{
    public class TokensService : ITokensService
    {
        private readonly ApplicationDbContext _context;

        public TokensService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DefaultResponse<Template>> CreateTemplate(CreateTemplateReq req)
        {
            var response = new DefaultResponse<Template>
            {
                Status = new Status(false, "Template not created")
            };

            try
            {
                var template = new Template
                {
                    Name = req.Name,
                    QrCodeColor = req.QrCodeColor,
                    QrCodeBackgroundColor = req.QrCodeBackgroundColor,
                    TextColor = req.TextColor,
                    BackgroundColor = req.BackgroundColor,
                    CurvedTextBottom = req.CurvedTextBottom,
                    CurvedTextTop = req.CurvedTextTop,
                    CurvedTextTopOffset = req.CurvedTextTopOffset,
                    CurvedTextBottomOffset = req.CurvedTextBottomOffset,
                    QrCodeUrl = req.QrCodeUrl,
                    TokenTypeId = req.TokenTypeId,
                    TokenTypeOffset = req.TokenTypeOffset,
                    UseImage = req.UseImage,
                    AltText = req.AltText,
                    ProjectId = req.ProjectId,
                };


                byte[] imageData = null;

                if (req.Image != null)
                {

                    using (var binaryReader = new BinaryReader(req.Image.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Image.Length);
                    }
                }

                template.Image = imageData;

                await _context.Templates.AddAsync(template);
                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Template created successfully");
                    response.Data = template;
                }
                else
                {

                    response.Status = new Status(false, "Template not created");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Status(false, ex.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<Template>> EditTemplate(CreateTemplateReq req)
        {
            var response = new DefaultResponse<Template>
            {
                Status = new Status(false, "Template not edited")
            };

            try
            {
                var template = await _context.Templates.FirstOrDefaultAsync(p => p.Id == req.Id);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                template.QrCodeColor = req.QrCodeColor;
                template.QrCodeBackgroundColor = req.QrCodeBackgroundColor;
                template.TextColor = req.TextColor;
                template.BackgroundColor = req.BackgroundColor;
                template.CurvedTextBottom = req.CurvedTextBottom;
                template.CurvedTextTop = req.CurvedTextTop;
                template.CurvedTextTopOffset = req.CurvedTextTopOffset;
                template.CurvedTextBottomOffset = req.CurvedTextBottomOffset;
                template.QrCodeUrl = req.QrCodeUrl;
                template.TokenTypeId = req.TokenTypeId;
                template.TokenTypeOffset = req.TokenTypeOffset;
                template.AltText = req.AltText;
                template.UseImage = req.UseImage;

                byte[] imageData = null;

                if (req.Image != null)
                {

                    using (var binaryReader = new BinaryReader(req.Image.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Image.Length);
                    }
                }

                template.Image = imageData;

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Template edited successfully");
                    response.Data = template;
                }
                else
                {
                    response.Status = new Status(false, "Template not edited");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<Template>> UpdateTemplateImage(CreateTemplateReq req)
        {
            var response = new DefaultResponse<Template>
            {
                Status = new Status(false, "Template not edited")
            };

            try
            {
                var template = await _context.Templates.FirstOrDefaultAsync(p => p.Id == req.Id);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                byte[] imageData = null;

                if (req.Image != null)
                {

                    using (var binaryReader = new BinaryReader(req.Image.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Image.Length);
                    }
                }

                template.Image = imageData;


                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Template edited successfully");
                    response.Data = template;
                }
                else
                {
                    response.Status = new Status(false, "Template not edited");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> DeleteTemplate(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Template not deleted")
            };

            try
            {
                // delete template and its tokens and their scans
                var template = await _context.Templates.FirstOrDefaultAsync(p => p.Id == req.Id);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                var tokens = await _context.Tokens.Where(p => p.TemplateId == req.Id).ToListAsync();

                if (tokens.Count > 0)
                {
                    _context.Tokens.RemoveRange(tokens);
                }

                _context.Templates.Remove(template);




                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Template deleted successfully");
                }
                else
                {
                    response.Status = new Status(false, "Template not deleted");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<TokenType>> CreateTokenType(IdReq req)
        {
            var response = new DefaultResponse<TokenType>
            {
                Status = new Status(false, "Token type not created")
            };

            try
            {
                var tokenType = new TokenType
                {
                    Name = req.Name,
                };

                await _context.TokenTypes.AddAsync(tokenType);
                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Token type created successfully");
                    response.Data = tokenType;
                }
                else
                {
                    response.Status = new Status(false, "Token type not created");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<TokenType>> EditTokenType(IdReq req)
        {
            var response = new DefaultResponse<TokenType>
            {
                Status = new Status(false, "Token type not edited")
            };

            try
            {
                var tokenType = await _context.TokenTypes.FirstOrDefaultAsync(p => p.Id == req.Id);

                if (tokenType == null)
                {
                    response.Status = new Status(false, "Token type not found");
                    return response;
                }

                tokenType.Name = req.Name;

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Token type edited successfully");
                    response.Data = tokenType;
                }
                else
                {
                    response.Status = new Status(false, "Token type not edited");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<List<TokenType>>> GetTokenTypes(IdReq req)
        {
            var response = new DefaultResponse<List<TokenType>>
            {
                Status = new Status(false, "Token types not found")
            };

            try
            {
                var tokenTypes = string.IsNullOrWhiteSpace(req.Name) ? await _context.TokenTypes.ToListAsync() :
                    await _context.TokenTypes.Where(p => p.Name.Contains(req.Name)).ToListAsync();

                if (tokenTypes == null)
                {
                    response.Status = new Status(false, "Token types not found");
                    return response;
                }

                response.Status = new Status(true, "Token types found");
                response.Data = tokenTypes;

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> DeleteTokenType(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Token type not deleted")
            };

            try
            {
                var tokenType = await _context.TokenTypes.FirstOrDefaultAsync(p => p.Id == req.Id);

                if (tokenType == null)
                {
                    response.Status = new Status(false, "Token type not found");
                    return response;
                }

                var tokens = await _context.Tokens
                                .AnyAsync(o => o.TokenTypeId == req.Id);

                if (tokens)
                {
                    response.Status = new Status(false, "Token type has tokens, cannot delete");
                    return response;
                }

                _context.TokenTypes.Remove(tokenType);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Token type deleted successfully");
                }
                else
                {
                    response.Status = new Status(false, "Token type not deleted");
                }

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> CreateTokens(CreateTokensReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not created")
            };

            try
            {

                var template = await _context.Templates
                    .Include(p => p.Project)
                    .Include(p => p.TokenType)
                    .FirstOrDefaultAsync(p => p.Id == req.TemplateId);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                if (template.Project == null)
                {
                    response.Status = new Status(false, "Project not found");
                    return response;
                }

                if (template.TokenType == null)
                {
                    response.Status = new Status(false, "Token type not found");
                    return response;
                }

                var tokens = new List<Token>();
                var lastNumber = _context.Tokens.Where(p => p.TokenTypeId == template.TokenTypeId)
                    .OrderByDescending(p => p.Number).FirstOrDefault()?.Number ?? 0;
                for (int i = 0; i < req.Quantity; i++)
                {
                    var token = new Token
                    {
                        ProjectId = template.Project.Id,
                        TemplateId = template.Id,
                        TokenTypeId = template.TokenType.Id,
                        TokenType = template.TokenType,
                        Project = template.Project,
                        Template = template,

                        CreatedAt = DateTime.Now,
                        Number = lastNumber + 1,
                        Url = string.IsNullOrWhiteSpace(req.OtherUrl) ? template.QrCodeUrl : req.OtherUrl,
                    };
                    lastNumber++;
                    tokens.Add(token);
                }

                await _context.Tokens.AddRangeAsync(tokens);
                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens created successfully");
                    response.Data = "Tokens created successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not created");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<Token>> GetToken(IdReq req)
        {
            var response = new DefaultResponse<Token>
            {
                Status = new Status(false, "Token not found")
            };

            try
            {
                var token = await _context.Tokens
                    .FirstOrDefaultAsync(p => p.Id == req.Id);

                if (token == null)
                {
                    response.Status = new Status(false, "Token not found");
                    return response;
                }

                response.Status = new Status(true, "Token found");
                response.Data = token;

            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> EditTokenBatch(EditTokenBatchReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not edited")
            };

            try
            {


                var tokens = await _context.Tokens
                    .Where(p => p.Id >= req.IdFrom && p.Id <= req.IdTo)
                    .ToListAsync();

                if (tokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }

                if (tokens.Any(p => p.ProjectId != req.ProjectId))
                {
                    response.Status = new Status(false, "Tokens not in same project");
                    return response;
                }

                foreach (var token in tokens)
                {
                    token.Url = req.NewUrl;
                }

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens edited successfully");
                    response.Data = "Tokens edited successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not edited");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> UpdateAllTemplateTokens(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not updated")
            };

            try
            {
                var template = await _context.Templates
                    .Include(p => p.Tokens)
                    .FirstOrDefaultAsync(p => p.Id == req.Id);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                if (template.Tokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }
                template.QrCodeUrl = req.Name;
                foreach (var token in template.Tokens)
                {
                    token.Url = template.QrCodeUrl;
                }

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens updated successfully");
                    response.Data = "Tokens updated successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not updated");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> DeleteTokenBatch(EditTokenBatchReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not deleted")
            };

            try
            {
                var tokens = await _context.Tokens
                    .Where(p => p.Id >= req.IdFrom && p.Id <= req.IdTo)
                    .ToListAsync();

                if (tokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }
                if (tokens.Any(p => p.ProjectId != req.ProjectId))
                {
                    response.Status = new Status(false, "Tokens not in same project");
                    return response;
                }
                _context.Tokens.RemoveRange(tokens);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens deleted successfully");
                    response.Data = "Tokens deleted successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not deleted");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> DeleteAllTemplateTokens(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not deleted")
            };

            try
            {
                var template = await _context.Templates
                    .Include(p => p.Tokens)
                    .FirstOrDefaultAsync(p => p.Id == req.Id);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                if (template.Tokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }

                _context.Tokens.RemoveRange(template.Tokens);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens deleted successfully");
                    response.Data = "Tokens deleted successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not deleted");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<string>> DeleteToken(IdReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Token not deleted")
            };

            try
            {
                var token = await _context.Tokens
                    .FirstOrDefaultAsync(p => p.Id == req.Id);

                if (token == null)
                {
                    response.Status = new Status(false, "Token not found");
                    return response;
                }

                _context.Tokens.Remove(token);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Token deleted successfully");
                    response.Data = "Token deleted successfully";
                }
                else
                {
                    response.Status = new Status(false, "Token not deleted");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<List<Token>>> GetBatchTokens(EditTokenBatchReq req)
        {
            var response = new DefaultResponse<List<Token>>
            {
                Status = new Status(false, "Tokens not found")
            };

            try
            {
                var tokens = await _context.Tokens
                    .Include(p => p.Template)
                    .Include(p => p.TokenType)
                    .Where(p => p.Id >= req.IdFrom && p.Id <= req.IdTo)
                    .ToListAsync();

                if (tokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }

                response.Status = new Status(true, "Tokens found");
                response.Data = tokens;
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        public async Task<DefaultResponse<PagedList<Token>>> SearchTokens(SearchTokensReq req)
        {
            var response = new DefaultResponse<PagedList<Token>>
            {
                Status = new Status(false, "Tokens not found")
            };

            try
            {
                var tokens = _context.Tokens
                    .AsNoTracking()
                    .Include(p => p.Template)
                    .Include(p => p.TokenType)
                    .AsQueryable();

                if (req.IdFrom != null)
                {
                    tokens = tokens.Where(p => p.Id >= req.IdFrom);
                }
                if (req.IdTo != null)
                {
                    tokens = tokens.Where(p => p.Id <= req.IdTo);
                }
                if (req.ProjectId != null)
                {
                    tokens = tokens.Where(p => p.ProjectId == req.ProjectId);
                }
                if (req.TemplateId != null)
                {
                    tokens = tokens.Where(p => p.TemplateId == req.TemplateId);
                }
                if (req.NumberFrom != null)
                {
                    tokens = tokens.Where(p => p.Number >= req.NumberFrom);
                }
                if (req.NumberTo != null)
                {
                    tokens = tokens.Where(p => p.Number <= req.NumberTo);
                }
                if (req.CreatedAtFrom != null)
                {
                    tokens = tokens.Where(p => p.CreatedAt >= req.CreatedAtFrom);
                }
                if (req.CreatedAtTo != null)
                {
                    tokens = tokens.Where(p => p.CreatedAt <= req.CreatedAtTo);
                }
                if (req.HasImage != null)
                {
                    tokens = tokens.Where(p => p.Template.UseImage == req.HasImage);
                }
                if (!string.IsNullOrWhiteSpace(req.Url))
                {
                    tokens = tokens.Where(p => p.Url.Contains(req.Url));
                }
                if (!string.IsNullOrWhiteSpace(req.CurvedTextTop))
                {
                    tokens = tokens.Where(p => p.Template.CurvedTextTop == req.CurvedTextTop);
                }
                if (!string.IsNullOrWhiteSpace(req.CurvedTextBottom))
                {
                    tokens = tokens.Where(p => p.Template.CurvedTextBottom == req.CurvedTextBottom);
                }

                // NEW

                //companyID
                if (req.CompanyId != null)
                {
                    tokens = tokens.Where(p => p.CompanyId == req.CompanyId);
                }

                //current owner
                if (req.CurrentOwnerId != null)
                {
                    tokens = tokens.Where(p => p.CurrentOwnerId == req.CurrentOwnerId);
                }

                //company token
                if (req.CompanyToken != null)
                {
                    tokens = tokens.Where(p => p.CompanyToken == req.CompanyToken);
                }

                //active
                if (req.IsActive != null)
                {
                    tokens = tokens.Where(p => p.IsActive == req.IsActive);
                }

                //>amount
                if (req.Amount != null)
                {
                    tokens = tokens.Where(p => p.Amount >= req.Amount);
                }

                //LastUpdatedAt
                if (req.LastUpdated != null)
                {
                    tokens = tokens.Where(p => p.LastUpdated >= req.LastUpdated);
                }

                //redeemed
                if (req.Redeemed != null)
                {
                    tokens = tokens.Where(p => p.Redeemed == req.Redeemed);
                }

                //claimed
                if (req.Claimed != null)
                {
                    tokens = tokens.Where(p => p.Claimed == req.Claimed);
                }

                //playedforwardcount
                if (req.PlayedForwardCount != null)
                {
                    tokens = tokens.Where(p => p.PlayedForwardCount >= req.PlayedForwardCount);
                }




                var pagedTokens = new PagedList<Token>(tokens, req.pagingParams.PageNumber, req.pagingParams.PageSize);
                if (pagedTokens == null)
                {
                    response.Status = new Status(false, "Tokens not found");
                    return response;
                }
                response.Status = new Status(true, "Tokens found successfully");
                response.Data = pagedTokens;
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // scans 
        //create scan

        public async Task<DefaultResponse<Scan>> CreateScan(CreateScanReq req)
        {
            var response = new DefaultResponse<Scan>
            {
                Status = new Status(false, "Scan not created")
            };

            try
            {
                var scan = new Scan
                {
                    Date = DateTime.Now,
                    IpAddress = req.IpAddress,
                    Browser = req.Browser,
                    Country = req.Country,
                    Os = req.Os,
                    Device = req.Device,
                    DeviceType = req.DeviceType,
                    TokenId = req.TokenId
                };

                await _context.Scans.AddAsync(scan);

                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Scan created successfully");
                    response.Data = scan;
                }
                else
                {
                    response.Status = new Status(false, "Scan not created");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        //get scan batch

        public async Task<DefaultResponse<ScansViewModel>> GetBatchScans(EditTokenBatchReq req)
        {
            var response = new DefaultResponse<ScansViewModel>
            {
                Status = new Status(false, "Scans not found")
            };

            try
            {
                var scans = await _context.Scans
                    .Include(p => p.Token)
                    .Where(p => p.TokenId >= req.IdFrom && p.TokenId <= req.IdTo)
                    .ToListAsync();

                if (scans == null)
                {
                    response.Status = new Status(false, "Scans not found");
                    return response;
                }

                var vm = new ScansViewModel();

                vm.TotalScans = scans.Count();
                vm.TotalScansToday = scans.Count(p => p.Date.Date == DateTime.Now.Date);
                vm.TotalScansThisYear = scans.Count(p => p.Date.Year == DateTime.Now.Year);
                vm.TotalScansThisMonth = scans.Count(p => p.Date.Year == DateTime.Now.Year && p.Date.Month == DateTime.Now.Month);
                //scans of the week
                vm.ScansThisWeek = new Dictionary<string, int>();
                for (int i = 0; i < 7; i++)
                {
                    var date = DateTime.Now.AddDays(-i);
                    var scansOfTheDay = scans.Count(p => p.Date.Date == date.Date);
                    vm.ScansThisWeek.Add(
                        date.ToShortDateString(),
                        scansOfTheDay
                    );
                }

                //Top 5 Browsers
                var top5Browsers = scans.GroupBy(p => p.Browser)
                    .OrderByDescending(p => p.Count())
                    .Take(5)
                    .Select(p => new KeyValuePair<string, int>(p.Key, p.Count()))
                    .ToList();

                vm.TopBrowsers = top5Browsers.ToDictionary(p => p.Key, p => p.Value);

                //Top 10 Countries
                var topCountries = scans.GroupBy(p => p.Country)
                    .OrderByDescending(p => p.Count())
                    .Take(10)
                    .Select(p => new KeyValuePair<string, int>(p.Key, p.Count()))
                    .ToList();

                vm.TopCountries = topCountries.ToDictionary(p => p.Key, p => p.Value);

                //Top 5 Devices
                var top5Devices = scans.GroupBy(p => p.Device)
                    .OrderByDescending(p => p.Count())
                    .Take(5)
                    .Select(p => new KeyValuePair<string, int>(p.Key, p.Count()))
                    .ToList();

                vm.TopDevices = top5Devices.ToDictionary(p => p.Key, p => p.Value);

                //Top 5 Operating Systems
                var top5Os = scans.GroupBy(p => p.Os)
                    .OrderByDescending(p => p.Count())
                    .Take(5)
                    .Select(p => new KeyValuePair<string, int>(p.Key, p.Count()))
                    .ToList();

                vm.TopOs = top5Os.ToDictionary(p => p.Key, p => p.Value); ;

                response.Status = new Status(true, "Scans found successfully");
                response.Data = vm;
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);

            }

            return response;
        }


        // Companies

        //create company template

        public async Task<DefaultResponse<Template>> CreateCompanyTemplate(CreateTemplateReq req)
        {
            var response = new DefaultResponse<Template>
            {
                Status = new Status(false, "Template not created")
            };

            try
            {
                var template = new Template
                {
                    Name = req.Name,
                    QrCodeColor = req.QrCodeColor,
                    QrCodeBackgroundColor = req.QrCodeBackgroundColor,
                    TextColor = req.TextColor,
                    BackgroundColor = req.BackgroundColor,
                    CurvedTextBottom = req.CurvedTextBottom,
                    CurvedTextTop = req.CurvedTextTop,
                    CurvedTextTopOffset = req.CurvedTextTopOffset,
                    CurvedTextBottomOffset = req.CurvedTextBottomOffset,
                    QrCodeUrl = req.QrCodeUrl,
                    TokenTypeId = req.TokenTypeId,
                    TokenTypeOffset = req.TokenTypeOffset,
                    UseImage = req.UseImage,
                    AltText = req.AltText,
                    CompanyId = req.CompanyId,
                };


                byte[] imageData = null;

                if (req.Image != null)
                {

                    using (var binaryReader = new BinaryReader(req.Image.OpenReadStream()))
                    {
                        imageData = binaryReader.ReadBytes((int)req.Image.Length);
                    }
                }

                template.Image = imageData;

                await _context.Templates.AddAsync(template);
                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Template created successfully");
                    response.Data = template;
                }
                else
                {

                    response.Status = new Status(false, "Template not created");
                }
            }
            catch (Exception ex)
            {
                response.Status = new Status(false, ex.Message);
            }

            return response;
        }

        // Create Company Tokens

        public async Task<DefaultResponse<string>> CreateCompanyTokens(CreateTokensReq req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Tokens not created")
            };

            try
            {

                var template = await _context.Templates
                    .Include(p => p.Company)
                    .Include(p => p.TokenType)
                    .FirstOrDefaultAsync(p => p.Id == req.TemplateId);

                if (template == null)
                {
                    response.Status = new Status(false, "Template not found");
                    return response;
                }

                if (template.Company == null)
                {
                    response.Status = new Status(false, "Company not found");
                    return response;
                }

                if (template.TokenType == null)
                {
                    response.Status = new Status(false, "Token type not found");
                    return response;
                }

                var tokens = new List<Token>();
                var lastNumber = _context.Tokens.Where(p => p.TokenTypeId == template.TokenTypeId)
                    .OrderByDescending(p => p.Number).FirstOrDefault()?.Number ?? 0;
                for (int i = 0; i < req.Quantity; i++)
                {
                    var token = new Token
                    {
                        CompanyId = template.Company.Id,
                        TemplateId = template.Id,
                        TokenTypeId = template.TokenType.Id,
                        TokenType = template.TokenType,
                        Company = template.Company,
                        Template = template,
                        CreatedAt = DateTime.Now,
                        Number = lastNumber + 1,
                        Url = string.IsNullOrWhiteSpace(req.OtherUrl) ? template.QrCodeUrl : req.OtherUrl,

                        Amount = req.Amount,
                        Claimed = false,
                        Redeemed = false,
                        LastUpdated = DateTime.Now,
                        IsActive = true,
                        CompanyToken = true,

                    };
                    lastNumber++;
                    tokens.Add(token);
                }

                await _context.Tokens.AddRangeAsync(tokens);
                var saveRes = await _context.SaveChangesAsync();

                if (saveRes > 0)
                {
                    response.Status = new Status(true, "Tokens created successfully");
                    response.Data = "Tokens created successfully";
                }
                else
                {
                    response.Status = new Status(false, "Tokens not created");
                }
            }
            catch (Exception e)
            {
                response.Status = new Status(false, e.Message);
            }

            return response;
        }

        // create token transaction 

        public async Task<DefaultResponse<string>> CreateTokenTransaction(CreateTokenTransactionRequest req)
        {
            var response = new DefaultResponse<string>
            {
                Status = new Status(false, "Transaction not created")
            };

            try
            {
                var token = await _context.Tokens
                    .Include(p => p.Company)
                    .FirstOrDefaultAsync(p => p.Id == req.TokenId);

                if (token == null)
                {
                    response.Status = new Status(false, "Token not found");
                    return response;
                }

                if (token.Company == null)
                {
                    response.Status = new Status(false, "Company not found");
                    return response;
                }

                var transaction = new TokenTransaction
                {
                    TokenId = token.Id,
                    Token = token,
                    CompanyId = token.Company.Id,
                    Company = token.Company,
                    TransactionType = req.TransactionType,
                    Amount = req.Amount,
                    CreatedAt = DateTime.Now,
                };

                switch (req.TransactionType)
                {
                    case TokenTransactionTypes.Claim:
                        break;
                    case TokenTransactionTypes.Redeem:
                        break;
                    case TokenTransactionTypes.Transfer:
                        break;
                    case TokenTransactionTypes.Load:
                        break;
                    case TokenTransactionTypes.PlayForward:
                        break;
                    default:
                        response.Status = new Status(false, "Invalid transaction type");
                        return response;
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
