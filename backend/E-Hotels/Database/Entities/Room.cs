using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class Room
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public decimal Price { get; set; }

    public string Capacity { get; set; } = null!;

    public bool SeaView { get; set; }

    public bool MountainView { get; set; }

    public bool Extendable { get; set; }

    public string? Amenities { get; set; }

    public string? ProblemsDamages { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual ICollection<Renting> Rentings { get; set; } = new List<Renting>();
}
