using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class HotelChainContactEmail
{
    public int Id { get; set; }

    public int HotelChainId { get; set; }

    public string Email { get; set; } = null!;

    public virtual HotelChain HotelChain { get; set; } = null!;
}
