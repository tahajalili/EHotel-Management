using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models.Room;
using Services.RoomService;

namespace E_Hotels.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        // Create a new room record
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomDTO room)
        {
            var roomId = await _roomService.CreateRoomAsync(room);
            return Ok();
        }

        // Get all room records
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(rooms);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetRoomsWithFilterAsync([FromQuery] RoomFilterDTO filters)
        {
            var rooms = await _roomService.GetWithFilterAsync(filters);

            return Ok(rooms);
        }

        // Get a room record by Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(int id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }

        // Update a room record
        [HttpPut]
        public async Task<IActionResult> UpdateRoom([FromBody] RoomDTO room)
        {
            var updated = await _roomService.UpdateRoomAsync(room);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent(); // Successfully updated, no content to return
        }

        // Delete a room record
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var deleted = await _roomService.DeleteRoomAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent(); // Successfully deleted, no content to return
        }
    }

}
