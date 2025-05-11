namespace Models.Room
{
    public class RoomFilterDTO
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Capacity { get; set; }
        public string? Area { get; set; }
        public int? HotelChain { get; set; }
        public string? Category { get; set; }
        public int? PriceMin { get; set; }
        public int? PriceMax { get; set; }
    }
}
