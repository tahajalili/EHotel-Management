using Database.Entites;
using Models.Customer;
using Models.LoginDTO;
using Services.Common;
using Services.EntityServices.BookingService;
using Services.EntityServices.RentingService;

public class CustomerService : IScopedInjectable, ICustomerService
{
    private readonly DapperService _dapperService;
    private readonly IRentingService _rentingService;
    private readonly IBookingService _bookingService;

    public CustomerService(DapperService dapperService, IRentingService rentingService, IBookingService bookingService)
    {
        _dapperService = dapperService;
        _rentingService = rentingService;
        _bookingService = bookingService;
    }

    // Get all customers (GET /api/customer)
    public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
    {
        var sql = "SELECT [Id], [FullName], [Address], [IdType], [IdNumber], [RegistrationDate] FROM [Customer]";
        return await _dapperService.QueryAsync<Customer>(sql);
    }

    // Get a customer by Id (GET /api/customer/{id})
    public async Task<Customer> GetCustomerByIdAsync(int id)
    {
        var sql = "SELECT [Id], [FullName], [Address], [IdType], [IdNumber], [RegistrationDate] FROM [Customer] WHERE [Id] = @Id";
        return await _dapperService.QuerySingleAsync<Customer>(sql, new { Id = id });
    }

    public async Task<int> AddOrUpdateCustomerAsync(CustomerDTO dto)
    {
        if (dto.Id == null) // Create new customer
        {
            var sql = @"INSERT INTO [Customer] ([FullName], [Address], [IdType], [IdNumber], [RegistrationDate], [Password], [Email])
                    VALUES (@FullName, @Address, @IdType, @IdNumber, @RegistrationDate,@Password,@Email);
                    SELECT CAST(SCOPE_IDENTITY() as int);"; // Returns new ID
            return await _dapperService.QuerySingleAsync<int>(sql, dto);
        }
        else // Update existing customer
        {
            var sql = @"UPDATE [Customer] SET [FullName] = @FullName, [Address] = @Address, 
                    [IdType] = @IdType, [IdNumber] = @IdNumber, [RegistrationDate] = @RegistrationDate
                    WHERE [Id] = @Id";
            return await _dapperService.ExecuteAsync(sql, new
            {
                Id = dto.Id, // Ensure it's not null
                dto.FullName,
                dto.Address,
                dto.IdType,
                dto.IdNumber,
                dto.RegistrationDate
            });
        }
    }


    // Delete a customer (DELETE /api/customer/{id})
    public async Task<int> DeleteCustomerAsync(int id)
    {
        var sql = "DELETE FROM [Customer] WHERE [Id] = @Id";
        return await _dapperService.ExecuteAsync(sql, new { Id = id });
    }

    public async Task<Customer> GetByEmailPass(LoginDTO loginDTO)
    {
        var sql = "SELECT * FROM dbo.Customer WHERE Email = @Email AND Password = @Password";
        var customer = await _dapperService.QuerySingleAsync<Customer>(sql, loginDTO);

        var bookings = await _bookingService.GetAllBookingsAsync();
        var rentings = await _rentingService.GetAllRentingsAsync();

        customer.Bookings = bookings.Where(z => z.CustomerId == customer.Id).Select(z => new Booking
        {
            Id = z.Id.Value,
            RoomId = z.RoomId,
            CustomerId = z.CustomerId,
            IsConfirmed = z.IsConfirmed,
            StartDate = z.StartDate,
            BookingDate = z.BookingDate,
            EndDate = z.EndDate
        }).ToList();

        customer.Rentings = rentings.Where(z => z.CustomerId == customer.Id).Select(z => new Renting
        {
            Id = z.Id.Value,
            CustomerId = customer.Id,
            CheckInEmployeeId = z.CheckInEmployeeId,
            EndDate = z.EndDate,
            IsPaid = z.IsPaid,
            RoomId = z.RoomId,
            StartDate = z.StartDate,
        }).ToList();

        return customer;
    }
}
