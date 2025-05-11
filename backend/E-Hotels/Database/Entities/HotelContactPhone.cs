using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class HotelContactPhone
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual Hotel Hotel { get; set; } = null!;
}
