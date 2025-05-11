namespace Models.Room
{
    public class RoomDTO
    {
        public int? Id { get; set; }
        public int HotelId { get; set; }
        public decimal? Price { get; set; }
        public string Capacity { get; set; }
        public bool SeaView { get; set; }
        public bool MountainView { get; set; }
        public bool Extendable { get; set; }
        public string Amenities { get; set; }
        public string ProblemsDamages { get; set; }
    }
}
