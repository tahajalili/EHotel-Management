namespace Services.InitService
{
    public interface IDatabaseInitiator
    {
        Task InitDataBaseAsync();
    }
}