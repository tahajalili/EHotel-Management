using Models.Employee;
using Models.LoginDTO;
using Services.Common;

namespace Services.EntityServices.EmployeeService
{
    public class EmployeeService : IEmployeeService, IScopedInjectable
    {
        private readonly DapperService _dapperService;

        public EmployeeService(DapperService dapperService)
        {
            _dapperService = dapperService;
        }

        public async Task<IEnumerable<EmployeeDTO>> GetAllEmployeesAsync()
        {
            var sql = "SELECT Id, HotelId, FullName, Address, Ssn FROM Employee";
            return await _dapperService.QueryAsync<EmployeeDTO>(sql);
        }

        public async Task<EmployeeDTO> GetEmployeeByIdAsync(int id)
        {
            var sql = "SELECT Id, HotelId, FullName, Address, Ssn FROM Employee WHERE Id = @Id";
            return await _dapperService.QuerySingleAsync<EmployeeDTO>(sql, new { Id = id });
        }

        public async Task<int> AddOrUpdateEmployeeAsync(EmployeeDTO dto)
        {
            if (dto.Id == null) // Create new employee
            {
                var roleId = _dapperService.QuerySingleAsync<int>($"Select Id from Role where Name = {dto.Role}");

                var sql = @"INSERT INTO Employee (HotelId, FullName, Address, Ssn, Password, Email)
                        VALUES (@HotelId, @FullName, @Address, @Ssn, @Password, @Email);
                        SELECT CAST(SCOPE_IDENTITY() as int);"; // Returns new ID
                var employeeId = await _dapperService.QuerySingleAsync<int>(sql, new
                {
                    dto.HotelId,
                    dto.FullName,
                    dto.Address,
                    Ssn = dto.IdNumber,
                    dto.Password,
                    dto.Email,
                });

                _dapperService.Execute(@$"INSERT INTO dbo.EmployeeRole
                                        (
                                            EmployeeId,
                                            RoleId
                                        )
                                        VALUES
                                        (   {employeeId}, -- EmployeeId - int
                                            {roleId}  -- RoleId - int
                                        )");

                return employeeId;
            }
            else // Update existing employee
            {
                var sql = @"UPDATE Employee SET HotelId = @HotelId, FullName = @FullName, 
                        Address = @Address, Ssn = @Ssn WHERE Id = @Id";
                return await _dapperService.ExecuteAsync(sql, new
                {
                    Id = dto.Id, // Ensure it's not null
                    dto.HotelId,
                    dto.FullName,
                    dto.Address,
                    Ssn = dto.IdNumber
                });
            }
        }

        public async Task<int> DeleteEmployeeAsync(int id)
        {
            var sql = "DELETE FROM Employee WHERE Id = @Id";
            return await _dapperService.ExecuteAsync(sql, new { Id = id });
        }

        public async Task<EmployeeDTO> GetByEmailPass(LoginDTO loginDTO)
        {
            var sql = "SELECT * FROM dbo.Employee WHERE Email = @Email AND Password = @Password";
            var employee = await _dapperService.QuerySingleAsync<EmployeeDTO>(sql, loginDTO);

            return employee;
        }

        public async Task<List<EmployeeBookings>> GetEmployeeHotelBookings(int employeeId)
        {
            var bookings = await _dapperService.QueryAsync<EmployeeBookings>(@$"SELECT b.Id,
                                                                       c.FullName CustomerName,
                                                                       hc.Name HotelName,
                                                                       b.RoomId RoomNumber,
                                                                       b.StartDate,
                                                                       b.EndDate,
                                                                       r.Price
                                                                FROM dbo.Booking b
                                                                    JOIN dbo.Room r ON r.Id = b.RoomId
                                                                    JOIN dbo.Hotel h ON h.Id = r.HotelId
                                                                    JOIN dbo.HotelChain hc ON hc.Id = h.HotelChainId
                                                                    JOIN dbo.Employee e ON e.HotelId = h.Id
                                                                    JOIN dbo.Customer c ON c.Id = b.CustomerId
                                                                WHERE e.Id = {employeeId};");

            return bookings.ToList();
        }
    }
}
