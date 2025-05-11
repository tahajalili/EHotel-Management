using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class Booking
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int RoomId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public DateTime BookingDate { get; set; }

    public bool IsConfirmed { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Room Room { get; set; } = null!;
}
