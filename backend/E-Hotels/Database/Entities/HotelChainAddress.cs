using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class HotelChainAddress
{
    public int Id { get; set; }

    public int HotelChainId { get; set; }

    public string Address { get; set; } = null!;

    public virtual HotelChain HotelChain { get; set; } = null!;
}
