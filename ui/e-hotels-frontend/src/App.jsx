import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import BookingPage from './pages/BookingPage';
import Register from './pages/Register';
import { authApi } from './services/api';
import AdminPage from './pages/AdminPage';

// Auth route component to handle protected routes
const ProtectedRoute = ({ children, userType }) => {
  const user = authApi.getCurrentUser();
  
  // if (!user) {
  //   // Not logged in
  //   return <Navigate to="/login" replace />;
  // }
  
  // if (userType && user.userType !== userType) {
  //   // Wrong user type
  //   return <Navigate to="/" replace />;
  // }
  
  return children;
};

function App() {
  // State to track auth changes
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status on load
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = authApi.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
    };
    
    checkAuth();
    
    // Listen for storage events to detect login/logout
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Import Bootstrap JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:roomId" element={
            <ProtectedRoute userType="customer">
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/customer-dashboard" element={
            <ProtectedRoute userType="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/employee-dashboard" element={
            <ProtectedRoute userType="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;