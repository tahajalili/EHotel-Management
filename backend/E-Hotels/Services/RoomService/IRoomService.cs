using Database.Entites;
using Models.Room;

namespace Services.RoomService
{
    public interface IRoomService
    {
        Task<int> CreateRoomAsync(RoomDTO room);
        Task<bool> DeleteRoomAsync(int id);
        Task<IEnumerable<RoomDTO>> GetAllRoomsAsync();
        Task<RoomDTO> GetRoomByIdAsync(int id);
        Task<List<Room>> GetWithFilterAsync(RoomFilterDTO filters);
        Task<bool> UpdateRoomAsync(RoomDTO room);
    }
}