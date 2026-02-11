import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyBookingsPage from './pages/MyBookingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman utama langsung kita arahin ke Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rute Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rute Register */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rute Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        {/* Rute My Bookings */}
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;