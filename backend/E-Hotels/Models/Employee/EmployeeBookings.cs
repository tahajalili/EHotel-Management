namespace Models.Employee
{
    public class EmployeeBookings
    {
        public int Id { get; set; }
        public string HotelName { get; set; }
        public int RoomNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice => (decimal)(EndDate - StartDate).TotalDays * Price;
    }
}
