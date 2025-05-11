using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class BookingArchive
{
    public int Id { get; set; }

    public string CustomerInfo { get; set; } = null!;

    public string RoomInfo { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public DateOnly BookingDate { get; set; }

    public bool IsConfirmed { get; set; }
}
