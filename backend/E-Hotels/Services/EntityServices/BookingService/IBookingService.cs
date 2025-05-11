using Models.Booking;

namespace Services.EntityServices.BookingService
{
    public interface IBookingService
    {
        Task<int> CreateBookingAsync(BookingDTO booking);
        Task<bool> DeleteBookingAsync(int id);
        Task<IEnumerable<BookingVM>> GetAllBookingsAsync();
        Task<BookingDTO> GetBookingByIdAsync(int id);
        Task<bool> UpdateBookingAsync(BookingDTO booking);
    }
}