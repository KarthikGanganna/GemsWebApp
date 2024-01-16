using GemsWebApi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        Token jwt = builder.Configuration.GetSection("Jwt").Get<Token>();
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
        };
    });

//builder.Services.AddAuthorization();


builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});


//.AddJsonOptions(options =>
//{
//   options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
//options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
//options.SerializerSettings.ContractResolver = new DefaultContractResolver();
//}); ;
builder.Services.AddScoped<IUserInterface, UserRepository>();
//builder.Services.Configure<MongoDataBase>(builder.Configuration.GetSection("MongoDataBase"));
builder.Services.Configure<DataBaseModel>(builder.Configuration.GetSection("MongoDataBase"));
builder.Services.Configure<Token>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddSingleton<DatabaseConnection>();
builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();


app.MapRazorPages();

app.UseCors(builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

app.Run();
