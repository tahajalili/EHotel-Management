namespace Models.Hotel
{
    public class HotelDTO
    {
        public int? Id { get; set; } // Used for update
        public int HotelChainId { get; set; }
        public int? Star { get; set; }
        public int NumRooms { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int? ManagerId { get; set; }

        /// <summary>
        /// Send NULL if you dont want to replace previous ones in HTTPPUT
        /// </summary>
        public List<string> PhoneNumbers { get; set; }
    }
}
