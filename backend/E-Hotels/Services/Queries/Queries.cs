namespace Services.Queries
{
    public class Queries
    {
        public static string InitDataBase => new StreamReader(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "./Queries/InitDatabase.sql")).ReadToEnd();
    }
}
