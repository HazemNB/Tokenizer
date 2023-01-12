using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tokenizer_V1.Db;
using Tokenizer_V1.Services;
using Tokenizer_V1.Services.Interfaces;

namespace Tokenizer_V1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Tokenizer_V1", Version = "v1" });
            });

            FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile("./xtokenizer-firebase-adminsdk-e8u5m-4418cf2ba9.json")
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(opt =>
                    {
                        opt.Authority = Configuration["Jwt:Firebase:ValidIssuer"];
                        opt.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = Configuration["Jwt:Firebase:ValidIssuer"],
                            ValidAudience = Configuration["Jwt:Firebase:ValidAudience"]
                        };
                    });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            services.AddDbContextPool<ApplicationDbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("DevConnection"),
                ServerVersion.AutoDetect(Configuration.GetConnectionString("DevConnection"))));
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IProjectsService, ProjectsService>();
            services.AddScoped<ITokensService, TokensService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tokenizer_V1 v1"));
            }

            app.UseCors("AllowAllOrigins");
            
            

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseDeveloperExceptionPage();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
