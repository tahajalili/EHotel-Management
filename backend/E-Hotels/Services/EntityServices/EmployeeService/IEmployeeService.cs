using Models.Employee;
using Models.LoginDTO;

namespace Services.EntityServices.EmployeeService
{
    public interface IEmployeeService
    {
        Task<int> AddOrUpdateEmployeeAsync(EmployeeDTO dto);
        Task<int> DeleteEmployeeAsync(int id);
        Task<IEnumerable<EmployeeDTO>> GetAllEmployeesAsync();
        Task<EmployeeDTO> GetByEmailPass(LoginDTO loginDTO);
        Task<EmployeeDTO> GetEmployeeByIdAsync(int id);
        Task<List<EmployeeBookings>> GetEmployeeHotelBookings(int employeeId);
    }
}