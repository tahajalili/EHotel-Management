namespace Models.Renting
{
    public class RentingDTO
    {
        public int? Id { get; set; }  
        public int CustomerId { get; set; }
        public int RoomId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CheckInEmployeeId { get; set; }
        public bool IsPaid { get; set; }
    }
}
