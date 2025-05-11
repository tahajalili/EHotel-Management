import { useState, useEffect } from 'react';
import { bookingApi, authApi } from '../services/api';
import useApi from '../hooks/useApi';

function BookingForm({ room, dateRange, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    customerId: '',
    roomId: room?.id || '',
    startDate: dateRange?.[0] || '',
    endDate: dateRange?.[1] || '',
    bookingDate: new Date().toISOString(),
    isConfirmed: true,
    customerDetails: {
      fullName: '',
      email: '',
      address: '',
      idType: '',
      idNumber: ''
    }
  });

  const [isNewCustomer, setIsNewCustomer] = useState(false);
  
  // Get current user if logged in
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (user && user.id) {
      setFormData(prev => ({
        ...prev,
        customerId: user.id,
        customerDetails: {
          fullName: user.fullName || '',
          email: user.email || '',
          address: user.address || '',
          idType: user.idType || '',
          idNumber: user.idNumber || ''
        }
      }));
    } else {
      setIsNewCustomer(true);
    }
  }, []);

  // Custom hook for creating booking
  const { 
    loading: bookingLoading, 
    error: bookingError, 
    execute: executeBooking 
  } = useApi(
    bookingApi.create,
    [],
    false
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested object properties (for customerDetails)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let customerId = formData.customerId;
      
      // If this is a new customer, create customer first
      if (isNewCustomer) {
        // This would need to be implemented on the backend
        // For now, we're simulating it
        console.log('Creating new customer:', formData.customerDetails);
        //call the API
        // const newCustomer = await customerApi.create(formData.customerDetails);
        // customerId = newCustomer.id;
        
        // For demo
        customerId = 999;
      }
      
      // Create booking with customer ID
      const bookingData = {
        customerId,
        roomId: formData.roomId,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        bookingDate: formData.bookingDate,
        isConfirmed: formData.isConfirmed
      };
      
      const result = await executeBooking(bookingData);
      
      if (result && onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!room || !formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return (days * room.price).toFixed(2);
  };

  if (!room) {
    return <div>Loading room details...</div>;
  }

  return (
    <div className="booking-form">
      <h3 className="mb-4">Book Room</h3>
      
      {bookingError && (
        <div className="alert alert-danger mb-3">
          {bookingError.response?.data?.message || 'An error occurred while creating your booking.'}
        </div>
      )}
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Room Details</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Hotel:</strong> {room.hotelName}</p>
              <p><strong>Room:</strong> {room.capacity} Person Room</p>
            </div>
            <div className="col-md-6">
              <p><strong>Price:</strong> ${room.price} per night</p>
              <p><strong>Total:</strong> ${calculateTotalPrice()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Booking Dates</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Customer Information</h5>
            
            {isNewCustomer ? (
              // New customer form
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="customerDetails.fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerDetails.fullName"
                        name="customerDetails.fullName"
                        value={formData.customerDetails.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="customerDetails.email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="customerDetails.email"
                        name="customerDetails.email"
                        value={formData.customerDetails.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="customerDetails.address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerDetails.address"
                    name="customerDetails.address"
                    value={formData.customerDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="customerDetails.idType" className="form-label">ID Type</label>
                      <select
                        className="form-select"
                        id="customerDetails.idType"
                        name="customerDetails.idType"
                        value={formData.customerDetails.idType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select ID Type</option>
                        <option value="SSN">Social Security Number</option>
                        <option value="SIN">Social Insurance Number</option>
                        <option value="DrivingLicense">Driving License</option>
                        <option value="Passport">Passport</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="customerDetails.idNumber" className="form-label">ID Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerDetails.idNumber"
                        name="customerDetails.idNumber"
                        value={formData.customerDetails.idNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Existing customer info display
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {formData.customerDetails.fullName}</p>
                  <p><strong>Email:</strong> {formData.customerDetails.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>ID Type:</strong> {formData.customerDetails.idType}</p>
                  <p><strong>ID Number:</strong> {formData.customerDetails.idNumber}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="d-flex justify-content-between">
          <button 
            type="button" 
            className="btn btn-outline-secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Booking...
              </>
            ) : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;