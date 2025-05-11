using Database.Entites;
using Models.Customer;
using Models.LoginDTO;

public interface ICustomerService
{
    Task<int> AddOrUpdateCustomerAsync(CustomerDTO dto);
    Task<int> DeleteCustomerAsync(int id);
    Task<IEnumerable<Customer>> GetAllCustomersAsync();
    Task<Customer> GetCustomerByIdAsync(int id);

    Task<Customer> GetByEmailPass(LoginDTO loginDTO);
}