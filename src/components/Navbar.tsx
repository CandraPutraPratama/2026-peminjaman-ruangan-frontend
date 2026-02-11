import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg px-8">
      {/* bagian kiri: judul & navigasi */}
      <div className="flex gap-10 items-center">
        <h1 className="text-xl font-bold tracking-tight">Sistem Peminjaman Ruangan</h1>
        
        <div className="flex gap-6 text-sm font-semibold">
          {/* link untuk balik ke daftar ruangan */}
          <Link to="/dashboard" className="hover:text-blue-200 transition">
            Cari Ruangan
          </Link>
          
          {/* link baru untuk liat riwayat bokingan */}
          <Link to="/my-bookings" className="hover:text-blue-200 transition">
            Bookingan Saya
          </Link>
        </div>
      </div>

      {/* bagian kanan: tombol untuk logout */}
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-bold text-sm shadow-md"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;