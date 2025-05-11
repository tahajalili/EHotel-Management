using System;
using System.Threading.Tasks;
using Database.Entites;
using Microsoft.AspNetCore.Mvc;
using Models.Employee;
using Models.LoginDTO;
using Services.EntityServices.EmployeeService;

[Route("api/employees")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    // GET: api/employees
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetAll()
    {
        var employees = await _employeeService.GetAllEmployeesAsync();
        return Ok(employees);
    }

    // GET: api/employees/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployeeDTO>> GetById(int id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        return employee is not null ? Ok(employee) : NotFound();
    }

    [HttpGet("{employeeId:int}/hotelBookings")]
    public async Task<IActionResult> GetEmployeeHotelBookingsAsync([FromRoute] int employeeId)
    {
        var employeeHotelBookings = await _employeeService.GetEmployeeHotelBookings(employeeId);

        return Ok(employeeHotelBookings);
    }

    // POST: api/employees (Create)
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] EmployeeDTO dto)
    {
        if (dto is null) return BadRequest("Invalid employee data.");
        var result = await _employeeService.AddOrUpdateEmployeeAsync(dto);

        return result > 0 ? Ok() : StatusCode(500, "Failed to create employee.");
    }

    [HttpPost("login")]
    public async Task<ActionResult<Customer>> GetByEmailPass([FromBody] LoginDTO loginDTO)
    {
        var employee = await _employeeService.GetByEmailPass(loginDTO);
        return employee is not null ? Ok(employee) : NotFound();
    }

    // PUT: api/employees/{id} (Update)
    [HttpPut("{id:int}")]
    public async Task<ActionResult> Update(int id, [FromBody] EmployeeDTO dto)
    {
        if (dto is null) return BadRequest("Invalid request data.");
        var result = await _employeeService.AddOrUpdateEmployeeAsync(dto);

        return result > 0 ? NoContent() : NotFound();
    }

    // DELETE: api/employees/{id}
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await _employeeService.DeleteEmployeeAsync(id);
        return result > 0 ? NoContent() : NotFound();
    }
}
