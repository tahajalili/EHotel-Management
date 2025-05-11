using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class HotelChainContactPhone
{
    public int Id { get; set; }

    public int HotelChainId { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual HotelChain HotelChain { get; set; } = null!;
}
