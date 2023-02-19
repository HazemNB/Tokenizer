using Microsoft.EntityFrameworkCore.Migrations;

namespace Tokenizer_V1.Migrations
{
    public partial class dt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountryCode",
                table: "Scans");

            migrationBuilder.AddColumn<string>(
                name: "DeviceType",
                table: "Scans",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeviceType",
                table: "Scans");

            migrationBuilder.AddColumn<int>(
                name: "CountryCode",
                table: "Scans",
                type: "int",
                nullable: true);
        }
    }
}
