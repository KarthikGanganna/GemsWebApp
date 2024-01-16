namespace GemsWebApi
{
    public interface IUserInterface
    {
        bool AddUser(User user);
        bool DeleteUser(int id);
        bool EditUser(User user);
        Dashboard GetDashboard();
        List<User> GetUser();
        User GetUser(int id);
        bool LoginCheck(LoginDetails loginDetails);
    }
}
