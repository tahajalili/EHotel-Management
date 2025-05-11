using System.Net.WebSockets;
using Database.Entites;
using Microsoft.IdentityModel.Tokens;
using Models.Room;
using Services.Common;

namespace Services.RoomService
{
    public class RoomService : IScopedInjectable, IRoomService
    {
        private readonly DapperService _dapperService;

        public RoomService(DapperService dapperService)
        {
            _dapperService = dapperService;
        }

        // Create a new room record
        public async Task<int> CreateRoomAsync(RoomDTO room)
        {
            var sql = @"
            INSERT INTO dbo.Room (HotelId, Price, Capacity, SeaView, MountainView, Extendable, Amenities, ProblemsDamages)
            VALUES (@HotelId, @Price, @Capacity, @SeaView, @MountainView, @Extendable, @Amenities, @ProblemsDamages);
            SELECT CAST(SCOPE_IDENTITY() AS INT);"; // Get the generated Id

            var parameters = new
            {
                room.HotelId,
                room.Price,
                room.Capacity,
                room.SeaView,
                room.MountainView,
                room.Extendable,
                room.Amenities,
                room.ProblemsDamages
            };

            var roomId = await _dapperService.QuerySingleAsync<int>(sql, parameters);
            return roomId; // Return generated Id
        }

        // Get all room records
        public async Task<IEnumerable<RoomDTO>> GetAllRoomsAsync()
        {
            var sql = @"
            SELECT Id, HotelId, Price, Capacity, SeaView, MountainView, Extendable, Amenities, ProblemsDamages
            FROM dbo.Room;";

            var rooms = await _dapperService.QueryAsync<RoomDTO>(sql);
            return rooms;
        }

        // Get a room record by Id
        public async Task<RoomDTO> GetRoomByIdAsync(int id)
        {
            var sql = @"
            SELECT Id, HotelId, Price, Capacity, SeaView, MountainView, Extendable, Amenities, ProblemsDamages
            FROM dbo.Room
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var room = await _dapperService.QuerySingleAsync<RoomDTO>(sql, parameters);
            return room;
        }

        // Update a room record
        public async Task<bool> UpdateRoomAsync(RoomDTO room)
        {
            var sql = @"
            UPDATE dbo.Room
            SET HotelId = @HotelId,
                Price = @Price,
                Capacity = @Capacity,
                SeaView = @SeaView,
                MountainView = @MountainView,
                Extendable = @Extendable,
                Amenities = @Amenities,
                ProblemsDamages = @ProblemsDamages
            WHERE Id = @Id;";

            var parameters = new
            {
                room.Id,
                room.HotelId,
                room.Price,
                room.Capacity,
                room.SeaView,
                room.MountainView,
                room.Extendable,
                room.Amenities,
                room.ProblemsDamages
            };

            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the update was successful
        }

        // Delete a room record by Id
        public async Task<bool> DeleteRoomAsync(int id)
        {
            var sql = @"
            DELETE FROM dbo.Room
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the deletion was successful
        }

        public async Task<List<Room>> GetWithFilterAsync(RoomFilterDTO filters)
        {

            //                AND (@MinRooms IS NULL OR h.NumRooms >= @MinRooms)

            var sql = @"
                        SELECT 
                            r.Id,
                            r.HotelId,
                            r.Price,
                            r.Capacity,
                            r.SeaView,
                            r.MountainView,
                            r.Extendable,
                            r.Amenities,
                            r.ProblemsDamages
                        FROM dbo.Room r
                        JOIN dbo.Hotel h ON h.Id = r.HotelId
                        JOIN dbo.HotelChain hc ON hc.Id = h.HotelChainId
                        WHERE 
                            (@PriceMin IS NULL OR r.Price >= @PriceMin)
                            AND (@PriceMax IS NULL OR r.Price <= @PriceMax)
                            AND (@Capacity IS NULL OR @Capacity = '' OR r.Capacity LIKE '%' + @Capacity + '%')
                            AND (@HotelChain IS NULL  OR hc.Id = @HotelChain)
                            AND (@Category IS NULL OR @Category = '' OR CAST(h.Star AS NVARCHAR) LIKE '%' + @Category + '%')
                            AND (@Area IS NULL OR @Area = '' OR h.Address LIKE '%' + @Area + '%')
                            AND (
                                @StartDate IS NULL 
                                OR @EndDate IS NULL 
                                OR NOT EXISTS (
                                    SELECT 1 
                                    FROM dbo.Booking b 
                                    WHERE b.RoomId = r.Id 
                                    AND (
                                        (b.StartDate <= @EndDate AND b.EndDate >= @StartDate)
                                    )
                                )
                            );";

            var rooms = await _dapperService.QueryAsync<RoomDTO>(sql, filters);

            if (!rooms.Any())
                return new();

            var hotels = await _dapperService.QueryAsync<Hotel>($"select * from hotel where id in ({string.Join(",", rooms.Select(z => z.HotelId))})");

            var result = rooms.Select(z => new Room
            {
                HotelId = z.HotelId,
                Amenities = z.Amenities,
                Capacity = z.Capacity,
                Extendable = z.Extendable,
                Hotel = hotels.FirstOrDefault(x => x.Id == z.HotelId),
                ProblemsDamages = z.ProblemsDamages,
                MountainView = z.MountainView,
                Id = z.Id.Value,
                Price = z.Price.Value,
                SeaView = z.SeaView,
            }).ToList();

            return result;
        }
    }
}
