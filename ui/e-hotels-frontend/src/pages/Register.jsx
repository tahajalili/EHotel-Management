import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi, hotelApi } from '../services/api';
import useApi from '../hooks/useApi';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    idType: '',
    idNumber: '',
    userType: 'customer', // Default to customer registration
    hotelId: '', // For employees only
    role: 'employee' // Default role (employee or manager)
  });

  const [errors, setErrors] = useState({});
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  
  // Use our custom hook for registration
  const { 
    loading, 
    error, 
    execute: executeRegister 
  } = useApi(
    authApi.register,
    [],
    false
  );

  // Fetch hotels for employee registration
  useEffect(() => {
    if (formData.userType === 'employee') {
      const fetchHotels = async () => {
        setLoadingHotels(true);
        try {
          // For development without backend
          // Mock data
          const mockHotels = [
            { id: 1, name: "Grand Hotel Downtown", address: "123 Main St" },
            { id: 2, name: "Seaside Beach Resort", address: "456 Ocean Ave" },
            { id: 3, name: "Mountain View Lodge", address: "789 Mountain Rd" },
            { id: 4, name: "City Center Hotel", address: "101 Urban St" },
            { id: 5, name: "Luxury Plaza", address: "555 Elite Ave" }
          ];
          setHotels(mockHotels);
          
          // When backend is ready, uncomment this:
          // const hotelsList = await hotelApi.getAll();
          // setHotels(hotelsList);
        } catch (error) {
          console.error('Error fetching hotels:', error);
        } finally {
          setLoadingHotels(false);
        }
      };
      
      fetchHotels();
    }
  }, [formData.userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    
    if (!formData.idType) {
      newErrors.idType = 'ID type is required';
    }
    
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }
    
    
    if (formData.userType === 'employee' && !formData.hotelId) {
      newErrors.hotelId = 'Please select the hotel you want to work for';
    }
    
    
    if (formData.userType === 'employee' && !formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // For development without backend, simulate successful registration
      // setTimeout(() => {
      //   alert('Registration successful! Please log in.');
      //   navigate('/login');
      // }, 1000);
      
      // When backend is ready, uncomment this:

      
      const result = await executeRegister({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        idType: formData.idType,
        idNumber: formData.idNumber,
        userType: formData.userType,
        registrationDate: new Date().toISOString()
      };
      
      // Add hotelId and role for employee registrations
      if (formData.userType === 'employee') {
        registrationData.hotelId = formData.hotelId;
        registrationData.role = formData.role;
      }
      
      const result = await executeRegister(registrationData);
      
      if (result) {
        //Redirect to login page after successful registration
        navigate('/login');
      }
      
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="register-page">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Create an Account</h2>
          
          {error && (
            <div className="alert alert-danger mb-3">
              {error.response?.data?.message || 'An error occurred during registration.'}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Register as:</label>
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="customerType"
                    name="userType"
                    value="customer"
                    checked={formData.userType === 'customer'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="customerType">
                    Customer
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="employeeType"
                    name="userType"
                    value="employee"
                    checked={formData.userType === 'employee'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="employeeType">
                    Hotel Employee
                  </label>
                </div>
              </div>
            </div>
            
            {formData.userType === 'employee' && (
              <>
                <div className="mb-3">
                  <label htmlFor="hotelId" className="form-label">Select Hotel</label>
                  <select
                    className={`form-select ${errors.hotelId ? 'is-invalid' : ''}`}
                    id="hotelId"
                    name="hotelId"
                    value={formData.hotelId}
                    onChange={handleInputChange}
                    disabled={loadingHotels}
                  >
                    <option value="">Select the hotel you want to work for</option>
                    {hotels.map(hotel => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.address}
                      </option>
                    ))}
                  </select>
                  {errors.hotelId && <div className="invalid-feedback">{errors.hotelId}</div>}
                  {loadingHotels && <div className="form-text text-muted">Loading hotels...</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Select Role:</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="employeeRole"
                        name="role"
                        value="employee"
                        checked={formData.role === 'employee'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="employeeRole">
                        Regular Employee
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="managerRole"
                        name="role"
                        value="manager"
                        checked={formData.role === 'manager'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="managerRole">
                        Manager
                      </label>
                    </div>
                  </div>
                  {errors.role && <div className="text-danger mt-1">{errors.role}</div>}
                </div>
              </>
            )}
            
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="idType" className="form-label">ID Type</label>
                  <select
                    className={`form-select ${errors.idType ? 'is-invalid' : ''}`}
                    id="idType"
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select ID Type</option>
                    <option value="SSN">Social Security Number</option>
                    <option value="SIN">Social Insurance Number</option>
                    <option value="DrivingLicense">Driving License</option>
                    <option value="Passport">Passport</option>
                  </select>
                  {errors.idType && <div className="invalid-feedback">{errors.idType}</div>}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">ID Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your ID number"
                  />
                  {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
                </div>
              </div>
            </div>
            
            <div className="d-grid mt-4">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : 'Register'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <p>
              Already have an account? 
              <Link to="/login" className="ms-1">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;