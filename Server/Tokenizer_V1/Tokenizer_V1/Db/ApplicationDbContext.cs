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
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyType> CompanyTypes { get; set; }
        public DbSet<TokenOwner> TokenOwners { get; set; }
        public DbSet<TokenTransaction> TokenTransactions { get; set; }


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


            // <<<<<<<<<<<<<<< NEW >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            builder.Entity<Token>()
                .HasOne(t => t.Company)
                .WithMany(c => c.Tokens)
                .HasForeignKey(t => t.CompanyId);

            builder.Entity<Token>()
                .HasOne(t => t.CurrentOwner)
                .WithMany(u => u.OwnedTokens)
                .HasForeignKey(t => t.CurrentOwnerId);

            builder.Entity<TokenOwner>()
                .HasOne(to => to.Token)
                .WithMany(t => t.Owners)
                .HasForeignKey(to => to.TokenId);

            builder.Entity<TokenOwner>()
                .HasOne(to => to.User)
                .WithMany(u => u.Tokens)
                .HasForeignKey(to => to.UserId);

            builder.Entity<TokenTransaction>()
                .HasOne(tt => tt.Token)
                .WithMany(t => t.Transactions)
                .HasForeignKey(tt => tt.TokenId);

            builder.Entity<TokenTransaction>()
                .HasOne(tt => tt.FirstParty)
                .WithMany(u => u.FirstTransactions)
                .HasForeignKey(tt => tt.FirstPartyId);

            builder.Entity<TokenTransaction>()
                .HasOne(tt => tt.SecondParty)
                .WithMany(u => u.SecondTransactions)
                .HasForeignKey(tt => tt.SecondPartyId);

            builder.Entity<TokenTransaction>()
                .HasOne(tt => tt.Company)
                .WithMany(c => c.TokenTransactions)
                .HasForeignKey(tt => tt.CompanyId);

            builder.Entity<User>()
                .HasOne(u => u.Company)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.CompanyId);

            builder.Entity<Company>()
                .HasOne(c => c.CompanyType)
                .WithMany(ct => ct.Companies)
                .HasForeignKey(c => c.CompanyTypeId);

            builder.Entity<Company>()
                .HasMany(c => c.Templates)
                .WithOne(t => t.Company)
                .HasForeignKey(t => t.CompanyId);

            builder.Entity<Company>()
                .HasMany(c => c.Tokens)
                .WithOne(t => t.Company)
                .HasForeignKey(t => t.CompanyId);

        }
    }
}
