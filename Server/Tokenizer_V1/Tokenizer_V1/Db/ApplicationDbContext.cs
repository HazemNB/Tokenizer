using Microsoft.EntityFrameworkCore;
using Tokenizer_V1.Models;

namespace Tokenizer_V1.Db
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Scan> Scans { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<TokenType> TokenTypes { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Scan>()
                .HasOne(s => s.Token)
                .WithMany(p => p.Scans)
                .HasForeignKey(s => s.TokenId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Token>()
                .HasOne(t => t.TokenType)
                .WithMany(p => p.Tokens)
                .HasForeignKey(t => t.TokenTypeId);

            builder.Entity<Token>()
                .HasOne(t => t.Template)
                .WithMany(p => p.Tokens)
                .HasForeignKey(t => t.TemplateId);

            builder.Entity<Token>()
                .HasOne(t => t.Project)
                .WithMany(p => p.Tokens)
                .HasForeignKey(t => t.ProjectId);

            builder.Entity<Project>()
                .HasMany(p => p.Templates)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId);

            builder.Entity<UserProject>()
                .HasOne(up => up.User)
                .WithMany(u => u.Projects)
                .HasForeignKey(up => up.UserId);

            builder.Entity<UserProject>()
                .HasOne(up => up.Project)
                .WithMany(p => p.Users)
                .HasForeignKey(up => up.ProjectId);
            




        }
    }
}
