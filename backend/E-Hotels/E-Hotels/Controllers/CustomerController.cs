using Database.Entites;
using Microsoft.AspNetCore.Mvc;
using Models.Customer;
using Models.LoginDTO;

[Route("api/customers")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    // GET: api/customers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAll()
    {
        var customers = await _customerService.GetAllCustomersAsync();
        return Ok(customers);
    }

    // GET: api/customers/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Customer>> GetById(int id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);
        return customer is not null ? Ok(customer) : NotFound();
    }

    [HttpPost("login")]
    public async Task<ActionResult<Customer>> GetByEmailPass([FromBody] LoginDTO loginDTO)
    {
        var customer = await _customerService.GetByEmailPass(loginDTO);
        return customer is not null ? Ok(customer) : NotFound();
    }

    // POST: api/customers (Create)
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CustomerDTO dto)
    {
        if (dto is null) return BadRequest("Invalid customer data.");
        var result = await _customerService.AddOrUpdateCustomerAsync(dto);

        return result > 0 ? Ok("200OK") : StatusCode(500, "Failed to create customer.");
    }

    // PUT: api/customers/{id} (Update)
    [HttpPut]
    public async Task<ActionResult> Update([FromBody] CustomerDTO dto)
    {
        if (dto is null || dto.Id == null) return BadRequest("Invalid request data.");
        var result = await _customerService.AddOrUpdateCustomerAsync(dto);

        return result > 0 ? NoContent() : NotFound();
    }

    // DELETE: api/customers/{id}
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await _customerService.DeleteCustomerAsync(id);
        return result > 0 ? NoContent() : NotFound();
    }
}
