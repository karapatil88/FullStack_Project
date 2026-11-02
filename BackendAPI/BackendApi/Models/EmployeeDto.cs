namespace BackendAPI.Models;

public class EmployeeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public decimal Salary { get; set; }
    public string? Photo { get; set; }
    public string? PhotoBase64 { get; set; }

    public static EmployeeDto FromEntity(Employee employee) => new()
    {
        Id = employee.Id,
        Name = employee.Name,
        Email = employee.Email,
        Position = employee.Position,
        Salary = employee.Salary,
        Photo = employee.Photo,
        PhotoBase64 = employee.PhotoData is { Length: > 0 } data ? Convert.ToBase64String(data) : null,
    };
}

public class EmployeeFormModel
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public decimal Salary { get; set; }
    public IFormFile? Photo { get; set; }
}
