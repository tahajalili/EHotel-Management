using Models.Renting;
using Services.Common;

namespace Services.EntityServices.RentingService
{
    public class RentingService : IScopedInjectable, IRentingService
    {
        private readonly DapperService _dapperService;

        public RentingService(DapperService dapperService)
        {
            _dapperService = dapperService;
        }

        // Create a new renting record
        public async Task<int> CreateRentingAsync(RentingDTO renting)
        {
            var sql = @"
            INSERT INTO dbo.Renting (CustomerId, RoomId, StartDate, EndDate, CheckInEmployeeId, IsPaid)
            VALUES (@CustomerId, @RoomId, @StartDate, @EndDate, @CheckInEmployeeId, @IsPaid);
            SELECT CAST(SCOPE_IDENTITY() AS INT);"; // Get the generated Id

            var parameters = new
            {
                renting.CustomerId,
                renting.RoomId,
                renting.StartDate,
                renting.EndDate,
                renting.CheckInEmployeeId,
                renting.IsPaid
            };

            var rentingId = await _dapperService.QuerySingleAsync<int>(sql, parameters);
            return rentingId; // Return generated Id
        }

        // Get all renting records
        public async Task<IEnumerable<RentingDTO>> GetAllRentingsAsync()
        {
            var sql = @"
            SELECT Id, CustomerId, RoomId, StartDate, EndDate, CheckInEmployeeId, IsPaid
            FROM dbo.Renting;";

            var rentings = await _dapperService.QueryAsync<RentingDTO>(sql);
            return rentings;
        }

        // Get a renting record by Id
        public async Task<RentingDTO> GetRentingByIdAsync(int id)
        {
            var sql = @"
            SELECT Id, CustomerId, RoomId, StartDate, EndDate, CheckInEmployeeId, IsPaid
            FROM dbo.Renting
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var renting = await _dapperService.QuerySingleAsync<RentingDTO>(sql, parameters);
            return renting;
        }

        // Update a renting record
        public async Task<bool> UpdateRentingAsync(RentingDTO renting)
        {
            var sql = @"
            UPDATE dbo.Renting
            SET CustomerId = @CustomerId,
                RoomId = @RoomId,
                StartDate = @StartDate,
                EndDate = @EndDate,
                CheckInEmployeeId = @CheckInEmployeeId,
                IsPaid = @IsPaid
            WHERE Id = @Id;";

            var parameters = new
            {
                renting.Id,
                renting.CustomerId,
                renting.RoomId,
                renting.StartDate,
                renting.EndDate,
                renting.CheckInEmployeeId,
                renting.IsPaid
            };

            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the update was successful
        }

        // Delete a renting record by Id
        public async Task<bool> DeleteRentingAsync(int id)
        {
            var sql = @"
            DELETE FROM dbo.Renting
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the deletion was successful
        }
    }

}
