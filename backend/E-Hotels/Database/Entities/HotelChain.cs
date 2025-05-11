using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class HotelChain
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int NumHotels { get; set; }

    public virtual ICollection<HotelChainAddress> HotelChainAddresses { get; set; } = new List<HotelChainAddress>();

    public virtual ICollection<HotelChainContactEmail> HotelChainContactEmails { get; set; } = new List<HotelChainContactEmail>();

    public virtual ICollection<HotelChainContactPhone> HotelChainContactPhones { get; set; } = new List<HotelChainContactPhone>();

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
}
