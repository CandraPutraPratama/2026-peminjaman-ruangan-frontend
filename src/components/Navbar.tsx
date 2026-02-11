import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // untuk hapus token dari localStorage
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Campus Room Reserve</h1>
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-medium"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;