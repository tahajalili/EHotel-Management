using Database;
using Helpers.RegisterExtensions;
using Microsoft.EntityFrameworkCore;
using Services.Common;
using Services.InitService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Adding DB

builder.Services.AddDbContext<HotelChainContext>(z =>
{
    //z.UseSqlServer(ConnectionStringManager.GetConnectionString((RunMode)builder.Configuration.GetSection("RunMode").Value.ToInt()));
});
#endregion

#region Registering Services
builder.Services.RegisterScoped<IScopedInjectable>(typeof(IScopedInjectable).Assembly);
#endregion

#region CORS
builder.Services.AddCors(z =>
{
    z.AddPolicy("Policy", x =>
    {
        x.AllowAnyOrigin();
        x.AllowAnyHeader();
        x.AllowAnyMethod();
    });
});
#endregion

var app = builder.Build();

app.UseCors("Policy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var scopedInjectable = scope.ServiceProvider.GetRequiredService<IDatabaseInitiator>();
    await scopedInjectable.InitDataBaseAsync();  // Call the method on the service
}

app.Run();
