using Models.Hotel;

namespace Services.HotelService
{
    public interface IHotelService
    {
        Task<int> CreateHotelAsync(HotelDTO hotel);
        Task<bool> DeleteHotelAsync(int id);
        Task<IEnumerable<HotelVM>> GetAllHotelsAsync();
        Task<HotelDTO> GetHotelByIdAsync(int id);
        Task<bool> UpdateHotelAsync(HotelDTO hotel);
    }
}