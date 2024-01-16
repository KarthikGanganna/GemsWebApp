using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace GemsWebApi
{
    public class UserRepository : IUserInterface
    {
        private readonly DatabaseConnection databaseConnection;
        public UserRepository(DatabaseConnection _databaseConnection)
        {
            databaseConnection = _databaseConnection;
        }
        public Dashboard GetDashboard()
        {
            Dashboard dashboard = new Dashboard();
            //dashboard = databaseConnection.Dashboard.
            dashboard = new Dashboard
            {
                Users = 1,
                Application = 4,
                Modules = 7,
                Packages = 5
            };

            return dashboard;
        }
        public bool LoginCheck(LoginDetails loginDetails)
        {
            bool response = false;
            //dashboard = databaseConnection.Dashboard.

            try
            {
                LoginDetails loginDetailsDB = new LoginDetails
                {
                    UserName = "ABCD",
                    Password = "1234"
                };

                if(loginDetails != null && loginDetails.UserName == loginDetailsDB.UserName && loginDetails.Password == loginDetailsDB.Password)
                {
                    response = true;
                }
                else
                {
                    response = false;
                }

            }
            catch (Exception)
            {
                response=false;
            }

            return response;
        }


        public List<User> GetUser()
        {
            List<User> users = new List<User>();
            try
            {
                users = databaseConnection.Users.AsQueryable().ToList();
                
            }
            catch (Exception)
            {

                throw;
            }
            return users;
        }


        public User GetUser(int id)
        {
            User result = databaseConnection.Users.AsQueryable().FirstOrDefault(x => x.id == id);

            //result.Add(users);
            return result;
        }

        public bool AddUser(User users)
        {
            bool flag = false;

            try
            {
                users.id = ObjectId.GenerateNewId().Increment;
                databaseConnection.Users.InsertOne(users);
                flag = true;
            }
            catch (Exception)
            {
                flag = true;
            }

            return flag;

        }

        public bool EditUser(User users)
        {
            bool response = false;
            try
            {
                databaseConnection.Users.ReplaceOne(x => x.id == users.id, users);
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;
        }


        public bool DeleteUser(int id)
        {
            bool response = true;

            try
            {
                User users = GetUser(id);
                databaseConnection.Users.DeleteOne(x => x.id == users.id);
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;
        }



    }
}
