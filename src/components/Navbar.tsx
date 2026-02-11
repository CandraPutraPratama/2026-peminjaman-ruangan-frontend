import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex gap-12 items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            CampusRoom
          </h1>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors relative group">
            Cari Ruangan
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/my-bookings" className="hover:text-blue-600 transition-colors relative group">
            Bookingan Saya
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2 rounded-xl transition-all font-bold text-sm active:scale-95 border border-red-100"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;