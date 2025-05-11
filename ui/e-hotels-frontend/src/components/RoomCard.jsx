import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../services/api';

function RoomCard({ room, onBookNow }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Parse amenities from string to array
  const getAmenities = () => {
    if (!room.amenities) return [];
    
    try {
      // Check if amenities is already an array
      if (Array.isArray(room.amenities)) {
        return room.amenities;
      }
      
      // Try to parse JSON if it's a string
      return JSON.parse(room.amenities);
    } catch (error) {
      // If not valid JSON, split by commas
      return room.amenities.split(',').map(item => item.trim());
    }
  };

  // Parse problems/damages from string to array
  const getProblems = () => {
    if (!room.problemsDamages) return [];
    
    try {
      // Check if problems is already an array
      if (Array.isArray(room.problemsDamages)) {
        return room.problemsDamages;
      }
      
      // Try to parse JSON if it's a string
      return JSON.parse(room.problemsDamages);
    } catch (error) {
      // If not valid JSON, split by commas
      return room.problemsDamages.split(',').map(item => item.trim());
    }
  };

  // Generate badge for amenity
  const getAmenityBadge = (amenity) => {
    const amenityColors = {
      'TV': 'info',
      'WiFi': 'success',
      'Air Conditioning': 'primary',
      'Fridge': 'secondary',
      'Sea View': 'danger'
    };
    
    const colorClass = amenityColors[amenity] || 'light text-dark';
    
    return (
      <span key={crypto.randomUUID()} className={`badge bg-${colorClass} me-1 mb-1`}>
        {amenity}
      </span>
    );
  };

  // Generate stars for hotel rating
  const renderStars = (rating) => {
    if (!rating) return null;
    
    return Array(rating)
      .fill()
      .map((_, index) => (
        <span key={index} className="text-warning">★</span>
      ));
  };
  
  // Format room capacity
  const formatCapacity = (capacity) => {
    if (!capacity) return 'N/A';
    
    // If capacity is a number, format as "X Person(s)"
    if (!isNaN(capacity)) {
      return `${capacity} ${parseInt(capacity) === 1 ? 'Person' : 'People'}`;
    }
    
    // Otherwise return as is (it might be "Single", "Double", etc.)
    return capacity;
  };

  // Handle booking a room
  const handleBookNow = async () => {
    try {
      console.log('Booking room:', room);
      
      // For development without backend
      alert(`You are about to book ${room.hotel?.name || 'a room'} - $${room.price}/night`);
      
      // Navigate to booking page
      navigate(`/booking/${room.id}`);
      
      // When backend is ready, uncomment this:
      /*
      const bookingData = {
        roomId: room.id,
        customerId: currentUserId, // Get from auth context or state
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        bookingDate: new Date().toISOString(),
        isConfirmed: true
      };
      
      const response = await bookingApi.create(bookingData);
      if (response) {
        // Show success message or redirect to confirmation page
        navigate(`/booking/confirmation/${response.id}`);
      }
      */
    } catch (error) {
      console.error('Error booking room:', error);
      // Show error message to user
    }
  };

  const amenities = getAmenities();
  const problems = getProblems();
  
  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        {/* Placeholder for room image */}
        <div className="bg-light" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-image text-secondary" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
          </svg>
        </div>
        
        {/* Price tag */}
        <div className="position-absolute top-0 end-0 bg-primary text-white py-1 px-2 m-2 rounded">
          ${room.price}/night
        </div>
      </div>
      
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{room.hotel?.name || 'Hotel'}</h5>
          <div className="hotel-stars">
            {renderStars(room.hotel?.star)}
          </div>
        </div>
        
        <h6 className="card-subtitle mb-2 text-muted">Room #{room.id}</h6>
        
        <p className="card-text">
          <strong>Capacity:</strong> {formatCapacity(room.capacity)}
        </p>
        
        <div className="mb-2">
          <strong>Amenities:</strong><br />
          <div className="mt-1">
            {amenities.length > 0 ? (
              amenities.map(amenity => getAmenityBadge(amenity))
            ) : (
              <span className="text-muted">No amenities listed</span>
            )}
          </div>
        </div>
        
        {showDetails && (
          <div className="additional-details mt-3">
            {room.seaView && (
              <div className="mb-1 text-success">
                <i className="bi bi-binoculars me-1"></i> Sea View
              </div>
            )}
            {room.mountainView && (
              <div className="mb-1 text-success">
                <i className="bi bi-binoculars me-1"></i> Mountain View
              </div>
            )}
            {room.extendable && (
              <div className="mb-1 text-info">
                <i className="bi bi-plus-circle me-1"></i> Extendable with extra bed
              </div>
            )}
            
            {problems.length > 0 && (
              <div className="mt-2 text-danger">
                <small>
                  <i className="bi bi-exclamation-triangle me-1"></i> 
                  <strong>Issues: </strong>
                  {problems.join(', ')}
                </small>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="card-footer bg-white border-top-0">
        <div className="d-flex justify-content-between">
          <button 
            onClick={() => setShowDetails(!showDetails)} 
            className="btn btn-sm btn-outline-secondary"
          >
            {showDetails ? 'Less details' : 'More details'}
          </button>
          <button 
            onClick={handleBookNow} 
            className="btn btn-sm btn-primary"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;