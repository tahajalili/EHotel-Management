using Microsoft.AspNetCore.Mvc;
using Models.Hotel;
using Services.HotelService;

namespace E_Hotels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        // Create a new hotel record
        [HttpPost]
        public async Task<IActionResult> CreateHotel([FromBody] HotelDTO hotel)
        {
            var hotelId = await _hotelService.CreateHotelAsync(hotel);
            return CreatedAtAction(nameof(GetHotelById), new { id = hotelId }, hotel);
        }

        // Get all hotel records
        [HttpGet]
        public async Task<IActionResult> GetAllHotels()
        {
            var hotels = await _hotelService.GetAllHotelsAsync();
            return Ok(hotels);
        }

        // Get a hotel record by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelById(int id)
        {
            var hotel = await _hotelService.GetHotelByIdAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }

        // Update a hotel record
        [HttpPut]
        public async Task<IActionResult> UpdateHotel([FromBody] HotelDTO hotel)
        {
            var updated = await _hotelService.UpdateHotelAsync(hotel);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent(); // Successfully updated, no content to return
        }

        // Delete a hotel record
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var deleted = await _hotelService.DeleteHotelAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent(); // Successfully deleted, no content to return
        }
    }

}
