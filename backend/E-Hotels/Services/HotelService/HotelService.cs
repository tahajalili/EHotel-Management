using Models.Hotel;
using Services.Common;

namespace Services.HotelService
{
    public class HotelService : IScopedInjectable, IHotelService
    {
        private readonly DapperService _dapperService;

        public HotelService(DapperService dapperService)
        {
            _dapperService = dapperService;
        }

        // Create a new hotel record
        public async Task<int> CreateHotelAsync(HotelDTO hotel)
        {
            var sql = @"
            INSERT INTO dbo.Hotel (HotelChainId, Star, NumRooms, Address, Email, ManagerId)
            VALUES (@HotelChainId, @Star, @NumRooms, @Address, @Email, @ManagerId);
            SELECT CAST(SCOPE_IDENTITY() AS INT);"; // Get the generated Id

            var parameters = new
            {
                hotel.HotelChainId,
                hotel.Star,
                hotel.NumRooms,
                hotel.Address,
                hotel.Email,
                hotel.ManagerId
            };

            var hotelId = await _dapperService.QuerySingleAsync<int>(sql, parameters);

            await AddHotelPhoneNumbers(hotel.PhoneNumbers, hotelId);

            return hotelId; // Return generated Id
        }

        private async Task AddHotelPhoneNumbers(List<string> phoneNumbers, int hotelId)
        {
            foreach (var item in phoneNumbers)
            {
                var HotelContactPhoneSQL = @" INSERT INTO  dbo.HotelContactPhone
                         (
                             HotelId,
                             PhoneNumber
                         )
                             VALUES
                         (   @hotelId,  
                             @phoneNumber
                         )";
                await _dapperService.QuerySingleAsync<int>(HotelContactPhoneSQL, new
                {
                    hotelId = hotelId,
                    phoneNumber = item
                });
            }
        }

        // Get all hotel records
        public async Task<IEnumerable<HotelVM>> GetAllHotelsAsync()
        {
            var sql = @"
                      SELECT h.Id,
                            HotelChainId,
                     	    hc.Name as HotelChainName,
                            Star,
                            NumRooms,
                            Address,
                            Email,
                            ManagerId
                     FROM dbo.Hotel h 
                     JOIN dbo.HotelChain hc ON hc.Id = h.HotelChainId;";

            var hotelPhoneNumbersSQL = @"SELECT 
                                        HotelId,
                                        PhoneNumber FROM dbo.HotelContactPhone";


            var hotels = await _dapperService.QueryAsync<HotelVM>(sql);
            var hotelPhoneNumbers = await _dapperService.QueryAsync<(int hotelId, string phoneNumber)>(hotelPhoneNumbersSQL);

            foreach (var hotel in hotels)
                hotel.PhoneNumbers = hotelPhoneNumbers.Where(z => z.hotelId == hotel.Id).Select(z => z.phoneNumber).ToList();

            return hotels;
        }

        // Get a hotel record by Id
        public async Task<HotelDTO> GetHotelByIdAsync(int id)
        {
            var sql = @"
            SELECT Id, HotelChainId, Star, NumRooms, Address, Email, ManagerId
            FROM dbo.Hotel
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var hotel = await _dapperService.QuerySingleAsync<HotelDTO>(sql, parameters);
            return hotel;
        }

        // Update a hotel record
        public async Task<bool> UpdateHotelAsync(HotelDTO hotel)
        {
            var sql = @"
            UPDATE dbo.Hotel
            SET HotelChainId = @HotelChainId,
                Star = @Star,
                NumRooms = @NumRooms,
                Address = @Address,
                Email = @Email,
                ManagerId = @ManagerId
            WHERE Id = @Id;";

            var parameters = new
            {
                hotel.Id,
                hotel.HotelChainId,
                hotel.Star,
                hotel.NumRooms,
                hotel.Address,
                hotel.Email,
                hotel.ManagerId
            };

            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);

            if (rowsAffected <= 0)
                return false;

            if (hotel.PhoneNumbers != null && hotel.PhoneNumbers.Any())
            {
                await _dapperService.ExecuteAsync(@"DELETE FROM dbo.HotelContactPhone WHERE HotelId = @hotelId", new { hotelId = hotel.Id });
                await AddHotelPhoneNumbers(hotel.PhoneNumbers, hotel.Id.Value);
            }

            return true; // Returns true if the update was successful
        }

        // Delete a hotel record by Id
        public async Task<bool> DeleteHotelAsync(int id)
        {
            var sql = @"
            DELETE FROM dbo.Hotel
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            await _dapperService.ExecuteAsync(@"DELETE FROM dbo.HotelContactPhone WHERE HotelId = @hotelId", new { hotelId = id });
            return rowsAffected > 0; // Returns true if the deletion was successful
        }
    }

}
