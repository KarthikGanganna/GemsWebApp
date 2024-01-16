using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GemsWebApi
{
    public class DatabaseConnection : IDisposable
    {
        public IMongoDatabase mongoDataBase { get; set; }

        public DatabaseConnection(IOptions<DataBaseModel> dataBaseModel)
        {
            //MongoClient mongoClient =
            string connectionstring = dataBaseModel.Value.ConnectionString;
            MongoClient  mongoClient = new MongoClient(connectionstring);
            mongoDataBase = mongoClient.GetDatabase(new MongoUrl(connectionstring).DatabaseName);
        }

       public IMongoCollection<User> Users => mongoDataBase.GetCollection<User>("User");

        public void Dispose()
        {
            GC.Collect();
        }

    }


}
