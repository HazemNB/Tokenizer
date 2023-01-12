using Microsoft.EntityFrameworkCore.Migrations;

namespace Tokenizer_V1.Migrations
{
    public partial class removeTokenTypeStringFromToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeString",
                table: "Tokens");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TypeString",
                table: "Tokens",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
