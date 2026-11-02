using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _db;

    public EmployeeController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAll()
    {
        var employees = await _db.Employees.AsNoTracking().ToListAsync();
        return Ok(employees.Select(EmployeeDto.FromEntity));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployeeDto>> GetById(int id)
    {
        var employee = await _db.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        if (employee is null)
        {
            return NotFound();
        }

        return Ok(EmployeeDto.FromEntity(employee));
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeDto>> Create([FromForm] EmployeeFormModel form)
    {
        var employee = new Employee
        {
            Name = form.Name,
            Email = form.Email,
            Position = form.Position,
            Salary = form.Salary,
        };

        if (form.Photo is { Length: > 0 })
        {
            employee.Photo = form.Photo.FileName;
            using var stream = new MemoryStream();
            await form.Photo.CopyToAsync(stream);
            employee.PhotoData = stream.ToArray();
        }

        _db.Employees.Add(employee);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = employee.Id }, EmployeeDto.FromEntity(employee));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<EmployeeDto>> Update(int id, [FromForm] EmployeeFormModel form)
    {
        var employee = await _db.Employees.FirstOrDefaultAsync(e => e.Id == id);
        if (employee is null)
        {
            return NotFound();
        }

        employee.Name = form.Name;
        employee.Email = form.Email;
        employee.Position = form.Position;
        employee.Salary = form.Salary;

        if (form.Photo is { Length: > 0 })
        {
            employee.Photo = form.Photo.FileName;
            using var stream = new MemoryStream();
            await form.Photo.CopyToAsync(stream);
            employee.PhotoData = stream.ToArray();
        }

        await _db.SaveChangesAsync();

        return Ok(EmployeeDto.FromEntity(employee));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employee = await _db.Employees.FirstOrDefaultAsync(e => e.Id == id);
        if (employee is null)
        {
            return NotFound();
        }

        _db.Employees.Remove(employee);
        await _db.SaveChangesAsync();

        return Ok(new { id });
    }
}
