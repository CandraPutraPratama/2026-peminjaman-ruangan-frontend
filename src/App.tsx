import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
      </Routes>
    </Router>
  );
}

export default App;