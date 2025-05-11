using Microsoft.AspNetCore.Mvc;
using Models.Booking;
using Services.EntityServices.BookingService;

namespace E_Hotels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // Create a new booking
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDTO booking)
        {
            var bookingId = await _bookingService.CreateBookingAsync(booking);
            return Ok(bookingId); // Return created booking
        }

        // Get all bookings
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }

        // Get a booking by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        // Update a booking
        [HttpPut]
        public async Task<IActionResult> UpdateBooking([FromBody] BookingDTO booking)
        {
            var updated = await _bookingService.UpdateBookingAsync(booking);
            if (!updated)
                return NotFound();

            return NoContent(); // Successfully updated, no content to return
        }

        // Delete a booking
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var deleted = await _bookingService.DeleteBookingAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent(); // Successfully deleted, no content to return
        }
    }
}
