import { ColorSchemeScript } from "@mantine/core";
import axios from "axios";

// Create axios instance with default config
const API_BASE_URL = "https://localhost:7280"; // Change to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Customer API calls
export const customerApi = {
  // Get all customers
  getAll: async () => {
    try {
      const response = await api.get("/api/customers");
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  // Get customer by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  // Create a new customer
  create: async (customerData) => {
    try {
      const response = await api.post("/api/customers", customerData);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  },

  // Update a customer
  update: async (customerData) => {
    try {
      const response = await api.put("/api/customers", customerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${customerData.id}:`, error);
      throw error;
    }
  },

  // Delete a customer
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },
};

// Employee API calls
export const employeeApi = {

  getHotelBookings:async (employeeId) =>{
    try {
      const response = await api.get(`/api/employees/${employeeId}/hotelBookings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },
  // Get all employees
  getAll: async () => {
    try {
      const response = await api.get("/api/employees");
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  // Get employee by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  },

  // Create a new employee
  create: async (employeeData) => {
    try {
      const response = await api.post("/api/employees", employeeData);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  // Update an employee
  update: async (id, employeeData) => {
    try {
      const response = await api.put(`/api/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  },

  // Delete an employee
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  },
};

// Hotel API calls
export const hotelApi = {
  // Get all hotels
  getAll: async () => {
    try {
      const response = await api.get("/api/Hotel");
      return response.data;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }
  },

  // Get hotel by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/Hotel/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hotel ${id}:`, error);
      throw error;
    }
  },

  // Create a new hotel
  create: async (hotelData) => {
    try {
      const response = await api.post("/api/Hotel", hotelData);
      return response.data;
    } catch (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
  },

  // Update a hotel
  update: async (hotelData) => {
    try {
      const response = await api.put("/api/Hotel", hotelData);
      return response.data;
    } catch (error) {
      console.error(`Error updating hotel ${hotelData.id}:`, error);
      throw error;
    }
  },

  // Delete a hotel
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/Hotel/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting hotel ${id}:`, error);
      throw error;
    }
  },
};

// Room API calls
export const roomApi = {
  // Get all rooms
  getAll: async () => {
    try {
      const response = await api.get("/api/Room");
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  },

  // Get room by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/Room/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error);
      throw error;
    }
  },

  // Create a new room
  create: async (roomData) => {
    try {
      const response = await api.post("/api/Room", roomData);
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },

  // Update a room
  update: async (roomData) => {
    try {
      const response = await api.put("/api/Room", roomData);
      return response.data;
    } catch (error) {
      console.error(`Error updating room ${roomData.id}:`, error);
      throw error;
    }
  },

  // Delete a room
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/Room/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting room ${id}:`, error);
      throw error;
    }
  },
};

// Booking API calls
export const bookingApi = {
  // Get all bookings
  getAll: async () => {
    try {
      const response = await api.get("/api/Booking");
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // Get booking by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/Booking/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  // Create a new booking
  create: async (bookingData) => {
    try {
      const response = await api.post("/api/Booking", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  // Update a booking
  update: async (bookingData) => {
    try {
      const response = await api.put("/api/Booking", bookingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating booking ${bookingData.id}:`, error);
      throw error;
    }
  },

  // Delete a booking
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/Booking/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      throw error;
    }
  },
};

// Renting API calls
export const rentingApi = {
  // Get all rentings
  getAll: async () => {
    try {
      const response = await api.get("/api/Renting");
      return response.data;
    } catch (error) {
      console.error("Error fetching rentings:", error);
      throw error;
    }
  },

  // Get renting by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/Renting/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching renting ${id}:`, error);
      throw error;
    }
  },

  // Create a new renting
  create: async (rentingData) => {
    try {
      const response = await api.post("/api/Renting", rentingData);
      return response.data;
    } catch (error) {
      console.error("Error creating renting:", error);
      throw error;
    }
  },

  // Update a renting
  update: async (rentingData) => {
    try {
      const response = await api.put("/api/Renting", rentingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating renting ${rentingData.id}:`, error);
      throw error;
    }
  },

  // Delete a renting
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/Renting/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting renting ${id}:`, error);
      throw error;
    }
  },

  // Convert booking to renting
  convertBookingToRenting: async (bookingId, employeeId) => {
    try {
      // This would need to be implemented on the backend
      // For now, we'll get the booking details, create a renting, then delete the booking
      const booking = await bookingApi.getById(bookingId);

      const rentingData = {
        customerId: booking.customerId,
        roomId: booking.roomId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        checkInEmployeeId: employeeId,
        isPaid: false,
      };

      const response = await api.post("/api/Renting", rentingData);

      // After successful renting creation, delete the booking
      await bookingApi.delete(bookingId);

      return response.data;
    } catch (error) {
      console.error(`Error converting booking ${bookingId} to renting:`, error);
      throw error;
    }
  },
};

// Search API - This would need to be implemented on the backend
export const searchApi = {
  // Search for available rooms
  searchRooms: async (searchParams) => {
    try {
      // This endpoint doesn't exist in the Swagger doc, but you'd need it
      // You could build a query string based on the search parameters
      let queryString = "/api/Room/filter?";

      // Add search parameters to query string
      if (searchParams.startDate)
        queryString += `startDate=${searchParams.startDate}&`;
      if (searchParams.endDate)
        queryString += `endDate=${searchParams.endDate}&`;
      if (searchParams.capacity)
        queryString += `capacity=${searchParams.capacity}&`;
      if (searchParams.area) queryString += `area=${searchParams.area}&`;
      if (searchParams.hotelChain)
        queryString += `hotelChain=${searchParams.hotelChain}&`;
      if (searchParams.category)
        queryString += `category=${searchParams.category}&`;
      if (searchParams.minRooms)
        queryString += `minRooms=${searchParams.minRooms}&`;
      if (searchParams.priceMin)
        queryString += `priceMin=${searchParams.priceMin}&`;
      if (searchParams.priceMax)
        queryString += `priceMax=${searchParams.priceMax}&`;

      // Remove trailing '&' if present
      queryString = queryString.endsWith("&")
        ? queryString.slice(0, -1)
        : queryString;

      const response = await api.get(queryString);
      return response.data;
    } catch (error) {
      console.error("Error searching rooms:", error);
      throw error;
    }
  },
};

// Auth API - This would need to be implemented on the backend
export const authApi = {
  // Login
  login: async (credentials) => {
    try {
      const endPoint =
        credentials.userType == "customer"
          ? "api/customers/login"
          : "api/employees/login";

      // This endpoint doesn't exist in the Swagger doc, but you'd need it
      const response = await api.post(endPoint, credentials);

      // Store token in localStorage
      // if (response.data.token) {
      //   localStorage.setItem("token", response.data.token);
      //   localStorage.setItem("user", JSON.stringify(response.data.user));
      // }

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      // This endpoint doesn't exist in the Swagger doc, but you'd need it
      // For customers, you might use the /api/customers endpoint
      // const response = await api.post('/api/auth/register', userData);

      const endPoint =
        userData.userType == "customer" ? "api/customers" : "api/employees";
      const response = await api.post(endPoint, userData);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Views API - For SQL Views required by the project
export const viewsApi = {
  // Get available rooms per area
  getAvailableRoomsByArea: async () => {
    try {
      // This endpoint doesn't exist in the Swagger doc, but you'd need it
      const response = await api.get("/api/views/available-rooms-by-area");
      return response.data;
    } catch (error) {
      console.error("Error fetching available rooms by area:", error);
      throw error;
    }
  },

  // Get aggregated capacity for a specific hotel
  getHotelCapacity: async (hotelId) => {
    try {
      // This endpoint doesn't exist in the Swagger doc, but you'd need it
      const response = await api.get(`/api/views/hotel-capacity/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching capacity for hotel ${hotelId}:`, error);
      throw error;
    }
  },
};

export default {
  customerApi,
  employeeApi,
  hotelApi,
  roomApi,
  bookingApi,
  rentingApi,
  searchApi,
  authApi,
  viewsApi,
};
