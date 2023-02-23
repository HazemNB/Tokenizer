﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tokenizer_V1.Db;

namespace Tokenizer_V1.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("Tokenizer_V1.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<int>("CompanyTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Country")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<byte[]>("Logo")
                        .HasColumnType("longblob");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext");

                    b.Property<int>("TemplateLimit")
                        .HasColumnType("int");

                    b.Property<int>("TokenLimit")
                        .HasColumnType("int");

                    b.Property<int>("UserLimit")
                        .HasColumnType("int");

                    b.Property<string>("Website")
                        .HasColumnType("longtext");

                    b.Property<string>("Zip")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CompanyTypeId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.CompanyType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("CompanyTypes");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Scan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Browser")
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Device")
                        .HasColumnType("longtext");

                    b.Property<string>("DeviceType")
                        .HasColumnType("longtext");

                    b.Property<string>("IpAddress")
                        .HasColumnType("longtext");

                    b.Property<string>("Os")
                        .HasColumnType("longtext");

                    b.Property<int>("TokenId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TokenId");

                    b.ToTable("Scans");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Template", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AltText")
                        .HasColumnType("longtext");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("BackgroundColor")
                        .HasColumnType("longtext");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("CurvedTextBottom")
                        .HasColumnType("longtext");

                    b.Property<int>("CurvedTextBottomOffset")
                        .HasColumnType("int");

                    b.Property<string>("CurvedTextTop")
                        .HasColumnType("longtext");

                    b.Property<int>("CurvedTextTopOffset")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<byte[]>("Image")
                        .HasColumnType("longblob");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.Property<string>("QrCodeBackgroundColor")
                        .HasColumnType("longtext");

                    b.Property<string>("QrCodeColor")
                        .HasColumnType("longtext");

                    b.Property<string>("QrCodeUrl")
                        .HasColumnType("longtext");

                    b.Property<string>("TextColor")
                        .HasColumnType("longtext");

                    b.Property<int>("TokenTypeId")
                        .HasColumnType("int");

                    b.Property<int>("TokenTypeOffset")
                        .HasColumnType("int");

                    b.Property<bool>("UseImage")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("TokenTypeId");

                    b.ToTable("Templates");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Token", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool?>("Claimed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<bool?>("CompanyToken")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("CurrentOwnerId")
                        .HasColumnType("int");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool?>("IsPlayedForward")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("LastUpdated")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int?>("PlayedForwardCount")
                        .HasColumnType("int");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.Property<bool?>("Redeemed")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("TemplateId")
                        .HasColumnType("int");

                    b.Property<int>("TokenTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CurrentOwnerId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("TemplateId");

                    b.HasIndex("TokenTypeId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenOwner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("TokenId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("TokenOwners");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenTransaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("FirstPartyId")
                        .HasColumnType("int");

                    b.Property<int?>("SecondPartyId")
                        .HasColumnType("int");

                    b.Property<int>("TokenId")
                        .HasColumnType("int");

                    b.Property<string>("TransactionType")
                        .HasColumnType("longtext");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("FirstPartyId");

                    b.HasIndex("SecondPartyId");

                    b.HasIndex("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("TokenTransactions");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("TokenTypes");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("FirebaseId")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext");

                    b.Property<bool?>("SmsVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserType")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.UserProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserId");

                    b.ToTable("UserProjects");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Company", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.CompanyType", "CompanyType")
                        .WithMany("Companies")
                        .HasForeignKey("CompanyTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompanyType");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Scan", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Token", "Token")
                        .WithMany("Scans")
                        .HasForeignKey("TokenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Token");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Template", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Company", "Company")
                        .WithMany("Templates")
                        .HasForeignKey("CompanyId");

                    b.HasOne("Tokenizer_V1.Models.Project", "Project")
                        .WithMany("Templates")
                        .HasForeignKey("ProjectId");

                    b.HasOne("Tokenizer_V1.Models.TokenType", "TokenType")
                        .WithMany("Temaplates")
                        .HasForeignKey("TokenTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Project");

                    b.Navigation("TokenType");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Token", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Company", "Company")
                        .WithMany("Tokens")
                        .HasForeignKey("CompanyId");

                    b.HasOne("Tokenizer_V1.Models.User", "CurrentOwner")
                        .WithMany("OwnedTokens")
                        .HasForeignKey("CurrentOwnerId");

                    b.HasOne("Tokenizer_V1.Models.Project", "Project")
                        .WithMany("Tokens")
                        .HasForeignKey("ProjectId");

                    b.HasOne("Tokenizer_V1.Models.Template", "Template")
                        .WithMany("Tokens")
                        .HasForeignKey("TemplateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Tokenizer_V1.Models.TokenType", "TokenType")
                        .WithMany("Tokens")
                        .HasForeignKey("TokenTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("CurrentOwner");

                    b.Navigation("Project");

                    b.Navigation("Template");

                    b.Navigation("TokenType");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenOwner", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Token", "Token")
                        .WithMany("Owners")
                        .HasForeignKey("TokenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Tokenizer_V1.Models.User", "User")
                        .WithMany("Tokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Token");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenTransaction", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Company", "Company")
                        .WithMany("TokenTransactions")
                        .HasForeignKey("CompanyId");

                    b.HasOne("Tokenizer_V1.Models.User", "FirstParty")
                        .WithMany("FirstTransactions")
                        .HasForeignKey("FirstPartyId");

                    b.HasOne("Tokenizer_V1.Models.User", "SecondParty")
                        .WithMany("SecondTransactions")
                        .HasForeignKey("SecondPartyId");

                    b.HasOne("Tokenizer_V1.Models.Token", "Token")
                        .WithMany("Transactions")
                        .HasForeignKey("TokenId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Tokenizer_V1.Models.User", null)
                        .WithMany("Transactions")
                        .HasForeignKey("UserId");

                    b.Navigation("Company");

                    b.Navigation("FirstParty");

                    b.Navigation("SecondParty");

                    b.Navigation("Token");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.User", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Company", "Company")
                        .WithMany("Users")
                        .HasForeignKey("CompanyId");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.UserProject", b =>
                {
                    b.HasOne("Tokenizer_V1.Models.Project", "Project")
                        .WithMany("Users")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Tokenizer_V1.Models.User", "User")
                        .WithMany("Projects")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Company", b =>
                {
                    b.Navigation("Templates");

                    b.Navigation("Tokens");

                    b.Navigation("TokenTransactions");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.CompanyType", b =>
                {
                    b.Navigation("Companies");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Project", b =>
                {
                    b.Navigation("Templates");

                    b.Navigation("Tokens");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Template", b =>
                {
                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.Token", b =>
                {
                    b.Navigation("Owners");

                    b.Navigation("Scans");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.TokenType", b =>
                {
                    b.Navigation("Temaplates");

                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("Tokenizer_V1.Models.User", b =>
                {
                    b.Navigation("FirstTransactions");

                    b.Navigation("OwnedTokens");

                    b.Navigation("Projects");

                    b.Navigation("SecondTransactions");

                    b.Navigation("Tokens");

                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
