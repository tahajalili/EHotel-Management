namespace Models.Booking
{
    public class BookingDTO
    {
        public int? Id { get; set; } 
        public int CustomerId { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime BookingDate { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
