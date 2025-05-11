using Models.Booking;
using Services.Common;

namespace Services.EntityServices.BookingService
{
    public class BookingService : IScopedInjectable, IBookingService
    {
        private readonly DapperService _dapperService;

        public BookingService(DapperService dapperService)
        {
            _dapperService = dapperService;
        }

        // Create: Insert a new booking
        public async Task<int> CreateBookingAsync(BookingDTO booking)
        {
            var sql = @"
            INSERT INTO dbo.Booking (CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed)
            VALUES (@CustomerId, @RoomId, @StartDate, @EndDate, @BookingDate, @IsConfirmed);
            SELECT CAST(SCOPE_IDENTITY() AS INT);"; // Get the generated Id

            var parameters = new
            {
                CustomerId = booking.CustomerId,
                RoomId = booking.RoomId,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                BookingDate = booking.BookingDate,
                IsConfirmed = false
            };

            var bookingId = await _dapperService.QuerySingleAsync<int>(sql, parameters);
            return bookingId; // Return the generated Id
        }

        // Read: Get all bookings
        public async Task<IEnumerable<BookingVM>> GetAllBookingsAsync()
        {
            var sql = @"SELECT * FROM dbo.Booking b
	                        JOIN dbo.Room r ON r.Id = b.RoomId
	                        JOIN dbo.Hotel h ON h.Id = r.HotelId
	                        JOIN dbo.HotelChain hc ON hc.Id = h.HotelChainId";

            var bookings = await _dapperService.QueryAsync<BookingVM>(sql);
            return bookings;
        }

        // Read: Get a booking by Id
        public async Task<BookingDTO> GetBookingByIdAsync(int id)
        {
            var sql = @"
            SELECT Id, CustomerId, RoomId, StartDate, EndDate, BookingDate, IsConfirmed
            FROM dbo.Booking
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var booking = await _dapperService.QuerySingleAsync<BookingDTO>(sql, parameters);
            return booking;
        }

        // Update: Modify an existing booking
        public async Task<bool> UpdateBookingAsync(BookingDTO booking)
        {
            var sql = @"
            UPDATE dbo.Booking
            SET CustomerId = @CustomerId,
                RoomId = @RoomId,
                StartDate = @StartDate,
                EndDate = @EndDate,
                BookingDate = @BookingDate,
                IsConfirmed = @IsConfirmed
            WHERE Id = @Id;";

            var parameters = new
            {
                Id = booking.Id,
                CustomerId = booking.CustomerId,
                RoomId = booking.RoomId,
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                BookingDate = booking.BookingDate,
                IsConfirmed = booking.IsConfirmed
            };

            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the update was successful
        }

        // Delete: Remove a booking by Id
        public async Task<bool> DeleteBookingAsync(int id)
        {
            var sql = @"
            DELETE FROM dbo.Booking
            WHERE Id = @Id;";

            var parameters = new { Id = id };
            var rowsAffected = await _dapperService.ExecuteAsync(sql, parameters);
            return rowsAffected > 0; // Returns true if the deletion was successful
        }
    }
}
