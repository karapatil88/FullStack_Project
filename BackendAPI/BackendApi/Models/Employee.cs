namespace BackendAPI.Models;

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public decimal Salary { get; set; }

    // Original uploaded filename, kept only so the client can guess a MIME type.
    public string? Photo { get; set; }
    public byte[]? PhotoData { get; set; }
}
