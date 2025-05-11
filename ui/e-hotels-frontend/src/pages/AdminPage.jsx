import { useState } from 'react';
import { hotelApi, roomApi } from '../services/api';

function AdminPage() {
  // State for hotel form
  const [hotelForm, setHotelForm] = useState({
    hotelChainId: '',
    star: '',
    numRooms: '',
    address: '',
    email: '',
    managerId: '',
    phoneNumbers: ['']
  });

  // State for room form
  const [roomForm, setRoomForm] = useState({
    hotelId: '',
    price: '',
    capacity: '',
    seaView: false,
    mountainView: false,
    extendable: false,
    amenities: '',
    problemsDamages: ''
  });

  // State for hotel chains (mock data)
  const hotelChains = [
    { id: 1, name: "Grand Hotels" },
    { id: 2, name: "Seaside Resorts" },
    { id: 3, name: "Mountain Retreats" },
    { id: 4, name: "Urban Stays" },
    { id: 5, name: "Luxury Collection" }
  ];

  // State for hotels (mock data)
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Hotel Downtown", hotelChainId: 1, star: 4, numRooms: 200, address: "123 Main St" },
    { id: 2, name: "Seaside Beach Resort", hotelChainId: 2, star: 5, numRooms: 150, address: "456 Ocean Ave" },
    { id: 3, name: "Mountain View Lodge", hotelChainId: 3, star: 3, numRooms: 75, address: "789 Mountain Rd" }
  ]);

  // State for success/error messages
  const [hotelMessage, setHotelMessage] = useState({ type: '', text: '' });
  const [roomMessage, setRoomMessage] = useState({ type: '', text: '' });

  // Handle hotel form input changes
  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelForm({
      ...hotelForm,
      [name]: value
    });
  };

  // Handle room form input changes
  const handleRoomInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomForm({
      ...roomForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle hotel phone number changes
  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...hotelForm.phoneNumbers];
    updatedPhones[index] = value;
    setHotelForm({
      ...hotelForm,
      phoneNumbers: updatedPhones
    });
  };

  // Add phone number field
  const addPhoneField = () => {
    setHotelForm({
      ...hotelForm,
      phoneNumbers: [...hotelForm.phoneNumbers, '']
    });
  };

  // Remove phone number field
  const removePhoneField = (index) => {
    const updatedPhones = [...hotelForm.phoneNumbers];
    updatedPhones.splice(index, 1);
    setHotelForm({
      ...hotelForm,
      phoneNumbers: updatedPhones
    });
  };

  // Submit hotel form
  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // For development without backend
      setHotelMessage({ 
        type: 'success', 
        text: 'Hotel created successfully!' 
      });
      
      // Add the new hotel to our mock data
      const newHotel = {
        id: hotels.length + 1,
        name: `Hotel at ${hotelForm.address}`,
        ...hotelForm
      };
      
      setHotels([...hotels, newHotel]);
      
      // Reset form
      setHotelForm({
        hotelChainId: '',
        star: '',
        numRooms: '',
        address: '',
        email: '',
        managerId: '',
        phoneNumbers: ['']
      });
      
      // When backend is ready, uncomment this:
      // await hotelApi.create(hotelForm);
    } catch (error) {
      console.error('Error creating hotel:', error);
      setHotelMessage({ 
        type: 'danger', 
        text: 'Error creating hotel. Please try again.' 
      });
    }
  };

  // Submit room form
  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // For development without backend
      setRoomMessage({ 
        type: 'success', 
        text: 'Room created successfully!' 
      });
      
      // Reset form
      setRoomForm({
        hotelId: '',
        price: '',
        capacity: '',
        seaView: false,
        mountainView: false,
        extendable: false,
        amenities: '',
        problemsDamages: ''
      });
      
      // When backend is ready, uncomment this:
      // await roomApi.create(roomForm);
    } catch (error) {
      console.error('Error creating room:', error);
      setRoomMessage({ 
        type: 'danger', 
        text: 'Error creating room. Please try again.' 
      });
    }
  };

  return (
    <div className="admin-page container py-4 mb-5">
      <h1 className="mb-4">Hotel & Room Management</h1>
      
      <div className="row">
        {/* Hotel Form */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Add New Hotel</h5>
            </div>
            <div className="card-body">
              {hotelMessage.text && (
                <div className={`alert alert-${hotelMessage.type}`} role="alert">
                  {hotelMessage.text}
                </div>
              )}
              
              <form onSubmit={handleHotelSubmit}>
                <div className="mb-3">
                  <label htmlFor="hotelChainId" className="form-label">Hotel Chain</label>
                  <select
                    className="form-select"
                    id="hotelChainId"
                    name="hotelChainId"
                    value={hotelForm.hotelChainId}
                    onChange={handleHotelInputChange}
                    required
                  >
                    <option value="">Select a hotel chain</option>
                    {hotelChains.map(chain => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="star" className="form-label">Star Rating</label>
                  <select
                    className="form-select"
                    id="star"
                    name="star"
                    value={hotelForm.star}
                    onChange={handleHotelInputChange}
                    required
                  >
                    <option value="">Select rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="numRooms" className="form-label">Number of Rooms</label>
                  <input
                    type="number"
                    className="form-control"
                    id="numRooms"
                    name="numRooms"
                    value={hotelForm.numRooms}
                    onChange={handleHotelInputChange}
                    min="1"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={hotelForm.address}
                    onChange={handleHotelInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={hotelForm.email}
                    onChange={handleHotelInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="managerId" className="form-label">Manager ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="managerId"
                    name="managerId"
                    value={hotelForm.managerId}
                    onChange={handleHotelInputChange}
                  />
                  <div className="form-text">Optional - can be assigned later</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone Numbers</label>
                  {hotelForm.phoneNumbers.map((phone, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => handlePhoneChange(index, e.target.value)}
                        placeholder="Phone number"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => removePhoneField(index)}
                        disabled={hotelForm.phoneNumbers.length <= 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={addPhoneField}
                  >
                    Add Phone Number
                  </button>
                </div>
                
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Create Hotel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Room Form */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Add New Room</h5>
            </div>
            <div className="card-body">
              {roomMessage.text && (
                <div className={`alert alert-${roomMessage.type}`} role="alert">
                  {roomMessage.text}
                </div>
              )}
              
              <form onSubmit={handleRoomSubmit}>
                <div className="mb-3">
                  <label htmlFor="hotelId" className="form-label">Hotel</label>
                  <select
                    className="form-select"
                    id="hotelId"
                    name="hotelId"
                    value={roomForm.hotelId}
                    onChange={handleRoomInputChange}
                    required
                  >
                    <option value="">Select a hotel</option>
                    {hotels.map(hotel => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price per Night ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={roomForm.price}
                    onChange={handleRoomInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="capacity" className="form-label">Capacity</label>
                  <select
                    className="form-select"
                    id="capacity"
                    name="capacity"
                    value={roomForm.capacity}
                    onChange={handleRoomInputChange}
                    required
                  >
                    <option value="">Select capacity</option>
                    <option value="1">1 Person (Single)</option>
                    <option value="2">2 People (Double)</option>
                    <option value="3">3 People (Triple)</option>
                    <option value="4">4 People (Quad)</option>
                    <option value="5">5+ People (Suite)</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Room Features</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="seaView"
                      name="seaView"
                      checked={roomForm.seaView}
                      onChange={handleRoomInputChange}
                    />
                    <label className="form-check-label" htmlFor="seaView">
                      Sea View
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mountainView"
                      name="mountainView"
                      checked={roomForm.mountainView}
                      onChange={handleRoomInputChange}
                    />
                    <label className="form-check-label" htmlFor="mountainView">
                      Mountain View
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="extendable"
                      name="extendable"
                      checked={roomForm.extendable}
                      onChange={handleRoomInputChange}
                    />
                    <label className="form-check-label" htmlFor="extendable">
                      Extendable (Can add extra bed)
                    </label>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="amenities" className="form-label">Amenities</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amenities"
                    name="amenities"
                    value={roomForm.amenities}
                    onChange={handleRoomInputChange}
                    placeholder="TV, WiFi, Air Conditioning, etc. (comma separated)"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="problemsDamages" className="form-label">Problems/Damages</label>
                  <textarea
                    className="form-control"
                    id="problemsDamages"
                    name="problemsDamages"
                    value={roomForm.problemsDamages}
                    onChange={handleRoomInputChange}
                    placeholder="Describe any problems or damages (if any)"
                    rows="2"
                  ></textarea>
                </div>
                
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Create Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;