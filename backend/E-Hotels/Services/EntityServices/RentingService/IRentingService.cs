using Models.Renting;

namespace Services.EntityServices.RentingService
{
    public interface IRentingService
    {
        Task<int> CreateRentingAsync(RentingDTO renting);
        Task<bool> DeleteRentingAsync(int id);
        Task<IEnumerable<RentingDTO>> GetAllRentingsAsync();
        Task<RentingDTO> GetRentingByIdAsync(int id);
        Task<bool> UpdateRentingAsync(RentingDTO renting);
    }
}