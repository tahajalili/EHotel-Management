using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class Renting
{
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? RoomId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int CheckInEmployeeId { get; set; }

    public bool IsPaid { get; set; }

    public virtual Employee CheckInEmployee { get; set; } = null!;

    public virtual Customer? Customer { get; set; }

    public virtual Room? Room { get; set; }
}
