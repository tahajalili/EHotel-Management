using System.Data;
using System.IO;
using Database.Entites;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Database;

public partial class HotelChainContext : DbContext
{
    private string _connectionString = new StreamReader("./connectionString.txt").ReadToEnd();

    public HotelChainContext()
    {
    }

    public HotelChainContext(DbContextOptions<HotelChainContext> options)
        : base(options)
    {
    }

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<BookingArchive> BookingArchives { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<HotelChain> HotelChains { get; set; }

    public virtual DbSet<HotelChainAddress> HotelChainAddresses { get; set; }

    public virtual DbSet<HotelChainContactEmail> HotelChainContactEmails { get; set; }

    public virtual DbSet<HotelChainContactPhone> HotelChainContactPhones { get; set; }

    public virtual DbSet<HotelContactPhone> HotelContactPhones { get; set; }

    public virtual DbSet<Renting> Rentings { get; set; }

    public virtual DbSet<RentingArchive> RentingArchives { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(_connectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Booking__3214EC07262FE449");

            entity.ToTable("Booking");

            entity.Property(e => e.BookingDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsConfirmed).HasDefaultValue(true);

            entity.HasOne(d => d.Customer).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Booking__Custome__3493CFA7");

            entity.HasOne(d => d.Room).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__Booking__RoomId__3587F3E0");
        });

        modelBuilder.Entity<BookingArchive>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BookingA__3214EC07CA7501FD");

            entity.ToTable("BookingArchive");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Customer__3214EC0784328F66");

            entity.ToTable("Customer");

            entity.HasIndex(e => e.IdNumber, "UQ__Customer__62DF80333166DA08").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.FullName).HasMaxLength(255);
            entity.Property(e => e.IdNumber).HasMaxLength(100);
            entity.Property(e => e.IdType).HasMaxLength(50);
            entity.Property(e => e.RegistrationDate).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC0759C39B80");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.Ssn, "UQ__Employee__CA33E0E4930CF563").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.FullName).HasMaxLength(255);
            entity.Property(e => e.Ssn).HasMaxLength(50);

            entity.HasOne(d => d.Hotel).WithMany(p => p.Employees)
                .HasForeignKey(d => d.HotelId)
                .HasConstraintName("FK__Employee__HotelI__29221CFB");

            entity.HasMany(d => d.Roles).WithMany(p => p.Employees)
                .UsingEntity<Dictionary<string, object>>(
                    "EmployeeRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK__EmployeeR__RoleI__2EDAF651"),
                    l => l.HasOne<Employee>().WithMany()
                        .HasForeignKey("EmployeeId")
                        .HasConstraintName("FK__EmployeeR__Emplo__2DE6D218"),
                    j =>
                    {
                        j.HasKey("EmployeeId", "RoleId").HasName("PK__Employee__C27FE3F02356C9FB");
                        j.ToTable("EmployeeRole");
                    });
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Hotel__3214EC07679E04C1");

            entity.ToTable("Hotel");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Email).HasMaxLength(255);

            entity.HasOne(d => d.HotelChain).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.HotelChainId)
                .HasConstraintName("FK__Hotel__HotelChai__18EBB532");

            entity.HasOne(d => d.Manager).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.ManagerId)
                .HasConstraintName("FK_Hotel_Manager");
        });

        modelBuilder.Entity<HotelChain>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HotelCha__3214EC07A34FFB9E");

            entity.ToTable("HotelChain");

            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<HotelChainAddress>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HotelCha__3214EC07DCA6A4B1");

            entity.ToTable("HotelChainAddress");

            entity.Property(e => e.Address).HasMaxLength(500);

            entity.HasOne(d => d.HotelChain).WithMany(p => p.HotelChainAddresses)
                .HasForeignKey(d => d.HotelChainId)
                .HasConstraintName("FK__HotelChai__Hotel__0F624AF8");
        });

        modelBuilder.Entity<HotelChainContactEmail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HotelCha__3214EC07420D67E1");

            entity.ToTable("HotelChainContactEmail");

            entity.Property(e => e.Email).HasMaxLength(255);

            entity.HasOne(d => d.HotelChain).WithMany(p => p.HotelChainContactEmails)
                .HasForeignKey(d => d.HotelChainId)
                .HasConstraintName("FK__HotelChai__Hotel__123EB7A3");
        });

        modelBuilder.Entity<HotelChainContactPhone>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HotelCha__3214EC0787C0DF2D");

            entity.ToTable("HotelChainContactPhone");

            entity.Property(e => e.PhoneNumber).HasMaxLength(20);

            entity.HasOne(d => d.HotelChain).WithMany(p => p.HotelChainContactPhones)
                .HasForeignKey(d => d.HotelChainId)
                .HasConstraintName("FK__HotelChai__Hotel__151B244E");
        });

        modelBuilder.Entity<HotelContactPhone>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HotelCon__3214EC07986267D0");

            entity.ToTable("HotelContactPhone");

            entity.Property(e => e.PhoneNumber).HasMaxLength(20);

            entity.HasOne(d => d.Hotel).WithMany(p => p.HotelContactPhones)
                .HasForeignKey(d => d.HotelId)
                .HasConstraintName("FK__HotelCont__Hotel__1BC821DD");
        });

        modelBuilder.Entity<Renting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Renting__3214EC070BF9C3BB");

            entity.ToTable("Renting");

            entity.HasOne(d => d.CheckInEmployee).WithMany(p => p.Rentings)
                .HasForeignKey(d => d.CheckInEmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Renting__CheckIn__3B40CD36");

            entity.HasOne(d => d.Customer).WithMany(p => p.Rentings)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Renting__Custome__395884C4");

            entity.HasOne(d => d.Room).WithMany(p => p.Rentings)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Renting__RoomId__3A4CA8FD");
        });

        modelBuilder.Entity<RentingArchive>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RentingA__3214EC0759710680");

            entity.ToTable("RentingArchive");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC0714564587");

            entity.ToTable("Role");

            entity.Property(e => e.RoleName).HasMaxLength(100);
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Room__3214EC0728D39419");

            entity.ToTable("Room");

            entity.Property(e => e.Capacity).HasMaxLength(50);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Hotel).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.HotelId)
                .HasConstraintName("FK__Room__HotelId__2180FB33");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
