using ElectricGamesApi.Services;
using ElectricGamesApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ElectricGamesDBSettings>(builder.Configuration.GetSection("ElectricGamesDatabase"));
builder.Services.AddSingleton<GamesService>();
builder.Services.AddSingleton<CharacterService>();

// Add CORS to give react access to api
builder.Services.AddCors(
    options => {
        options.AddPolicy("AllowAnyOrigin",
        policies => policies
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        );
    }
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// line 10 continuation (AddCors)
app.UseCors("AllowAnyOrigin");

// Use static files to get acces to images stored in wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
