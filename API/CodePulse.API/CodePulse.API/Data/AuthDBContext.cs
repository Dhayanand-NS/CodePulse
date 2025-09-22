using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class AuthDBContext : IdentityDbContext
    {
        public AuthDBContext(DbContextOptions<AuthDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "c155e658-b986-4887-b461-a99636b069ea";
            var writerRoleId = "2509955b-a72a-4e0e-abaa-883c42562f75";

            // Create Reader and Writer roles

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = readerRoleId,
                    Name = "Reader",    
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };
            // Seed the roles into the database
            builder.Entity<IdentityRole>().HasData(roles);


            //create an Admin user
            var adminUserId = "d1f5c3b2-4e8a-4f0b-9c3e-6f7d8e9a0b1c";
            var admin = new IdentityUser
            {
                Id = adminUserId,
                UserName = "admin@codepulse.com",
                Email = "admin@codepulse.com",
                NormalizedEmail = "admin@codepulse.com".ToUpper(),
                NormalizedUserName = "admin@codepulse.com".ToUpper(),
            };
            //admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");
            admin.PasswordHash = "AQAAAAIAAYagAAAAEIsT9nX8RfQkBtj8zQHrRz0gr1PLOygOv3x3PYJk1kYyb1MFmKjKv12UoyH/VMeZAw==";

            // Seed the admin user into the database
            builder.Entity<IdentityUser>().HasData(admin);

            // Assig roles to the admin
            var adinRole = new List<IdentityUserRole<string>>
            {
                new IdentityUserRole<string>
                { 
                UserId = adminUserId,
                RoleId = readerRoleId // Assigning Reader role to the admin
                },
                new IdentityUserRole<string>
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId // Assigning Writer role to the admin
                }
            };
            // Seed the admin user roles into the database
            builder.Entity<IdentityUserRole<string>>().HasData(adinRole);
        }
    }
}
