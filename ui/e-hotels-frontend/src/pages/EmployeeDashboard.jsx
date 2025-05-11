import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingApi, rentingApi } from '../services/api';

function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Here you would fetch bookings and rentals from your API
    // For now, using dummy data
    setBookings([
      {
        id: 1,
        customerName: 'John Doe',
        hotelName: 'Grand Hotel',
        roomNumber: '101',
        startDate: '2025-04-15',
        endDate: '2025-04-18',
        totalPrice: 450
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        hotelName: 'Seaside Resort',
        roomNumber: '205',
        startDate: '2025-05-20',
        endDate: '2025-05-25',
        totalPrice: 1000
      }
    ]);
    
    setRentals([
      {
        id: 1,
        customerName: "Alice Johnson",
        hotelName: "Grand Hotel",
        roomNumber: "102",
        checkInDate: "2025-03-25",
        checkOutDate: "2025-03-28",
        totalPrice: 600,
        paymentStatus: "paid"
      },
    ]);

    setLoading(false);
  }, []);

  const handleCheckIn = async (bookingId) => {
    try {
      setLoading(true);
      
      // For development without backend
      console.log('Converting booking to rental:', bookingId);
      
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        const newRental = {
          id: Date.now(), // Temporary ID for mock
          customerName: booking.customerName,
          hotelName: booking.hotelName,
          roomNumber: booking.roomNumber,
          checkInDate: new Date().toISOString().split('T')[0],
          checkOutDate: booking.endDate,
          totalPrice: booking.totalPrice,
          paymentStatus: 'pending'
        };
        
        // Update state
        setRentals([...rentals, newRental]);
        setBookings(bookings.filter(b => b.id !== bookingId));
        
        // Show success message
        setMessage({ type: 'success', text: 'Check-in completed successfully!' });
      }
      
      // When backend is ready, uncomment this:
      /*
      const employeeId = user.id;
      const response = await rentingApi.convertBookingToRenting(bookingId, employeeId);
      
      if (response) {
        // Update local state to reflect the change
        setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
        setRentals(prevRentals => [...prevRentals, response]);
        
        // Show success message
        setMessage({ type: 'success', text: 'Check-in completed successfully!' });
      }
      */
    } catch (error) {
      console.error('Error checking in:', error);
      setMessage({ type: 'danger', text: 'Error processing check-in. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = (rentalId) => {
    // Here you would call your API to process payment
    console.log('Processing payment for rental:', rentalId);
    
    // For demo, just update payment status
    setRentals(rentals.map(rental => 
      rental.id === rentalId 
        ? {...rental, paymentStatus: 'paid'} 
        : rental
    ));
    
    setMessage({ type: 'success', text: 'Payment processed successfully!' });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="employee-dashboard">
        <h1>Access Denied</h1>
        <p>
          Please <Link to="/login">login</Link> as an employee to view this
          dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="employee-dashboard">
      <header className="mb-4">
        <h1>Employee Dashboard</h1>
        <div className="user-info">
          <p>Welcome, <strong>{user.fullName || 'Employee'}</strong></p>
          <p>Hotel: <strong>{user.hotelName || 'All Hotels'}</strong></p>
        </div>
      </header>
      
      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setMessage({ type: '', text: '' })}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="nav nav-tabs mb-4">
        <button 
          className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button 
          className={`nav-link ${activeTab === 'rentals' ? 'active' : ''}`}
          onClick={() => setActiveTab('rentals')}
        >
          Rentals
        </button>
        <button 
          className={`nav-link ${activeTab === 'newRental' ? 'active' : ''}`}
          onClick={() => setActiveTab('newRental')}
        >
          New Direct Rental
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'bookings' && (
          <div className="tab-pane active">
            <h2>Current Bookings</h2>

            {bookings.length === 0 ? (
              <div className="alert alert-info">No bookings available.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.customerName}</td>
                        <td>
                          {booking.hotelName} - {booking.roomNumber}
                        </td>
                        <td>{booking.startDate}</td>
                        <td>{booking.endDate}</td>
                        <td>${booking.totalPrice}</td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleCheckIn(booking.id)}
                            disabled={loading}
                          >
                            {loading ? 'Processing...' : 'Check In'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rentals' && (
          <div className="tab-pane active">
            <h2>Current Rentals</h2>

            {rentals.length === 0 ? (
              <div className="alert alert-info">No active rentals.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.map((rental) => (
                      <tr key={rental.id}>
                        <td>{rental.id}</td>
                        <td>{rental.customerName}</td>
                        <td>
                          {rental.hotelName} - {rental.roomNumber}
                        </td>
                        <td>{rental.checkInDate}</td>
                        <td>{rental.checkOutDate}</td>
                        <td>${rental.totalPrice}</td>
                        <td>
                          <span className={`badge bg-${rental.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                            {rental.paymentStatus.charAt(0).toUpperCase() + rental.paymentStatus.slice(1)}
                          </span>
                        </td>
                        <td>
                          {rental.paymentStatus === 'pending' && (
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleProcessPayment(rental.id)}
                            >
                              Process Payment
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'newRental' && (
          <div className="tab-pane active">
            <h2>Create New Direct Rental</h2>
            <p>This feature allows creating a rental for walk-in customers without prior booking.</p>
            
            <div className="alert alert-info">
              <p>This feature is under development.</p>
              <p>When implemented, it will allow you to:</p>
              <ul>
                <li>Select an available room</li>
                <li>Enter customer details or select an existing customer</li>
                <li>Specify rental dates</li>
                <li>Create the rental and process payment</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
