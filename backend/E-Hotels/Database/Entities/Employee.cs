using System;
using System.Collections.Generic;

namespace Database.Entites;

public partial class Employee
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public string FullName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Ssn { get; set; } = null!;

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

    public virtual ICollection<Renting> Rentings { get; set; } = new List<Renting>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
