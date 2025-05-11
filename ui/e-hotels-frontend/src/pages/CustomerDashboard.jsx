import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CustomerDashboard() {
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    api.bookingApi.getAll().then((response) => {
      setBookings(response.filter((z) => z.customerId == user.id));
    });
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="customer-dashboard">
        <h1>Access Denied</h1>
        <p>
          Please <Link to="/login">login</Link> to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.fullName}</h1>
        <Link to="/search" className="search-button">
          Search Rooms
        </Link>
      </header>

      <main className="dashboard-content">
        <section className="bookings-section">
          <h2>Your Bookings</h2>

          {bookings.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>
                      {booking.name} - Room {booking.roomId}
                    </h3>
                    <span className={`booking-status ${booking.isConfirmed}`}>
                      {booking.isConfirmed ? "confirmed" : "pending"}
                    </span>
                  </div>

                  <div className="booking-details">
                    <p>
                      <strong>Check-in:</strong> {booking.startDate}
                    </p>
                    <p>
                      <strong>Check-out:</strong> {booking.endDate}
                    </p>
                    <p>
                      <strong>Total:</strong> $
                      {Math.floor(
                        (new Date(booking.endDate) -
                          new Date(booking.startDate)) /
                          (1000 * 60 * 60 * 24)
                      ) * booking.price}
                    </p>
                  </div>

                  <div className="booking-actions">
                    <button className="view-details-button">
                      View Details
                    </button>
                    {booking.status === "confirmed" && (
                      <button className="cancel-button">Cancel Booking</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default CustomerDashboard;
