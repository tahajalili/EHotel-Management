using Database;
using Services.Common;

namespace Services.InitService
{
    public class DatabaseInitiator : IScopedInjectable, IDatabaseInitiator
    {
        private readonly HotelChainContext _context;

        public DatabaseInitiator(HotelChainContext context)
        {
            _context = context;
        }

        public async Task InitDataBaseAsync()
        {
            var dapperService = new DapperService(_context);

            dapperService.Execute(Queries.Queries.InitDataBase);
        }
    }
}
