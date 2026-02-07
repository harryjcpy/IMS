using Microsoft.EntityFrameworkCore;
using IMS_Audit;

var builder = WebApplication.CreateBuilder(args);

// Configure port: Use PORT env var (Render) or default to 5158 (local)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5158";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Add SQLite Database
builder.Services.AddDbContext<AuditDbContext>(options =>
    options.UseSqlite("Data Source=audit.db"));

var app = builder.Build();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AuditDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapPost("/api/audit", async (AuditLog log, AuditDbContext db) => {
    try
    {
        log.Timestamp = DateTime.UtcNow;
        db.AuditLogs.Add(log);
        await db.SaveChangesAsync();
        
        Console.WriteLine($"[AUDIT] {log.Timestamp}: User {log.UserId} performed {log.Action} on {log.Resource}");
        
        return Results.Ok(new { message = "Audit log recorded successfully", id = log.Id });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[ERROR] Failed to save audit log: {ex.Message}");
        return Results.Problem("Failed to save audit log");
    }
})
.WithName("CreateAuditLog")
.WithOpenApi();

app.MapGet("/api/audit", async (AuditDbContext db) => {
    try
    {
        var logs = await db.AuditLogs.OrderByDescending(l => l.Timestamp).ToListAsync();
        return Results.Ok(logs);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[ERROR] Failed to retrieve audit logs: {ex.Message}");
        return Results.Problem("Failed to retrieve audit logs");
    }
})
.WithName("GetAuditLogs")
.WithOpenApi();

app.Run();
