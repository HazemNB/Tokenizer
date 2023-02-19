using Microsoft.EntityFrameworkCore.Migrations;

namespace Tokenizer_V1.Migrations
{
    public partial class useAltTextTemplates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "UseAltText",
                table: "Templates",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UseAltText",
                table: "Templates");
        }
    }
}
