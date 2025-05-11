namespace Models.Employee
{
    public class EmployeeDTO
    {
        public int? Id { get; set; }

        public int HotelId { get; set; }

        public string FullName { get; set; }

        public string Address { get; set; }

        public string IdNumber { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public string Role { get; set; }
    }
}
