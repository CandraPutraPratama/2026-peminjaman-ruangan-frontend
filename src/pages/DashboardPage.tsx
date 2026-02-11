import { useEffect, useState } from 'react';
import { getRooms, deleteRoom } from '../services/roomService';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';
import AddRoomModal from '../components/AddRoomModal';

const DashboardPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const userRole = localStorage.getItem('role');

  const loadRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error("Gagal memuat data ruangan, coba refresh halaman atau hubungi admin!", error);
    }
  };

  useEffect(() => { loadRooms(); }, []);

  const handleDeleteRoom = async (id: number, name: string) => {
    if (window.confirm(`Yakin mau hapus ${name}? Semua riwayat bokingan bakal ikut hilang!`)) {
      try {
        await deleteRoom(id);
        alert('Ruangan berhasil dihapus!');
        loadRooms();
      } catch (error) {
        alert('Gagal menghapus ruangan, coba lagi.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Daftar Ruangan</h2>
            <p className="text-gray-500 font-medium mt-1">Pilih ruangan yang ingin kamu pakai</p>
          </div>
          
          {userRole === 'Admin' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center gap-2 active:scale-95"
            >
              <span className="text-xl">+</span> Tambah Ruangan
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </div>
                  <span className="bg-gray-100 text-gray-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">ID: {room.id}</span>
                </div>
                
                <h3 className="text-2xl font-extrabold text-gray-800 mb-1">{room.name}</h3>
                <p className="text-gray-400 text-sm font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Kapasitas: <span className="text-gray-700 font-bold">{room.capacity} Orang</span>
                </p>
              </div>

              <div className="p-2 space-y-3">
                <button 
                  onClick={() => setSelectedRoom(room)}
                  className="w-full bg-blue-600 text-white py-4 rounded-[1.5rem] font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                >
                  Pesan Sekarang
                </button>
                
                {userRole === 'Admin' && (
                  <button 
                    onClick={() => handleDeleteRoom(room.id, room.name)}
                    className="w-full bg-white text-red-400 hover:text-red-600 py-2 rounded-xl text-xs font-bold transition-colors opacity-50 hover:opacity-100"
                  >
                    Hapus Ruangan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal tetep ditaruh di bawah agar tidak merusak layout */}
      {selectedRoom && <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      {showAddModal && <AddRoomModal onClose={() => setShowAddModal(false)} onRefresh={loadRooms} />}
    </div>
  );
};

export default DashboardPage;