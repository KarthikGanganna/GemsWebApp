namespace GemsWebApi
{
    public class UserModel
    {

    }
    public class LoginDetails
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class MongoDataBase
    {
        public string ConnectionString { get; set; }
    }
    
    public class Token
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }

    }

    public class Dashboard
    {
        public int Users { get; set; }
        public int Application { get; set; }
        public int Modules { get; set; }
        public int Packages { get; set; }
    }
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string emailId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string customer { get; set; }
        public List<string> roles { get; set; }
        public bool trialUser { get; set; }


    }


}
