using Microsoft.EntityFrameworkCore.Migrations;

namespace Tokenizer_V1.Migrations
{
    public partial class templateModelChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UseAltText",
                table: "Templates");

            migrationBuilder.RenameColumn(
                name: "QrCodeColour",
                table: "Templates",
                newName: "TextColor");

            migrationBuilder.RenameColumn(
                name: "CurvedTextSize",
                table: "Templates",
                newName: "QrCodeColor");

            migrationBuilder.RenameColumn(
                name: "CurvedTextFont",
                table: "Templates",
                newName: "QrCodeBackgroundColor");

            migrationBuilder.RenameColumn(
                name: "CurvedTextColour",
                table: "Templates",
                newName: "BackgroundColor");

            migrationBuilder.AddColumn<int>(
                name: "CurvedTextBottomOffset",
                table: "Templates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CurvedTextTopOffset",
                table: "Templates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TokenTypeOffset",
                table: "Templates",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurvedTextBottomOffset",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "CurvedTextTopOffset",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "TokenTypeOffset",
                table: "Templates");

            migrationBuilder.RenameColumn(
                name: "TextColor",
                table: "Templates",
                newName: "QrCodeColour");

            migrationBuilder.RenameColumn(
                name: "QrCodeColor",
                table: "Templates",
                newName: "CurvedTextSize");

            migrationBuilder.RenameColumn(
                name: "QrCodeBackgroundColor",
                table: "Templates",
                newName: "CurvedTextFont");

            migrationBuilder.RenameColumn(
                name: "BackgroundColor",
                table: "Templates",
                newName: "CurvedTextColour");

            migrationBuilder.AddColumn<bool>(
                name: "UseAltText",
                table: "Templates",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
