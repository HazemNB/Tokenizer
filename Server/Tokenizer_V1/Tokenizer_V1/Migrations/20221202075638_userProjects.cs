using Microsoft.EntityFrameworkCore.Migrations;

namespace Tokenizer_V1.Migrations
{
    public partial class userProjects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProject_Projects_ProjectId",
                table: "UserProject");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProject_Users_UserId",
                table: "UserProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProject",
                table: "UserProject");

            migrationBuilder.RenameTable(
                name: "UserProject",
                newName: "UserProjects");

            migrationBuilder.RenameIndex(
                name: "IX_UserProject_UserId",
                table: "UserProjects",
                newName: "IX_UserProjects_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserProject_ProjectId",
                table: "UserProjects",
                newName: "IX_UserProjects_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjects_Projects_ProjectId",
                table: "UserProjects",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjects_Users_UserId",
                table: "UserProjects",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProjects_Projects_ProjectId",
                table: "UserProjects");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProjects_Users_UserId",
                table: "UserProjects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserProjects",
                table: "UserProjects");

            migrationBuilder.RenameTable(
                name: "UserProjects",
                newName: "UserProject");

            migrationBuilder.RenameIndex(
                name: "IX_UserProjects_UserId",
                table: "UserProject",
                newName: "IX_UserProject_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserProjects_ProjectId",
                table: "UserProject",
                newName: "IX_UserProject_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserProject",
                table: "UserProject",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProject_Projects_ProjectId",
                table: "UserProject",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProject_Users_UserId",
                table: "UserProject",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
