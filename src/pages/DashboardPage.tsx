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
      console.error("Gagal memuat data ruangan!", error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleDeleteRoom = async (id: number, name: string) => {
    if (window.confirm(`Yakin mau hapus ${name}? Semua riwayat bokingan ruangan ini bakal ikutan ilang!`)) {
      try {
        await deleteRoom(id);
        alert('Ruangan berhasil dihapus!');
        loadRooms();
      } catch (error) {
        alert('Gagal menghapus ruangan, mungkin masih ada bokingan aktif atau koneksi backend bermasalah.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Daftar Ruangan</h2>
          
          {userRole === 'Admin' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-lg flex items-center gap-2"
            >
              <span>+</span> Tambah Ruangan
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-blue-600">{room.name}</h3>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">ID: {room.id}</span>
                </div>
                <p className="text-gray-600 mb-6">Kapasitas: <span className="font-bold">{room.capacity}</span> Orang</p>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setSelectedRoom(room)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Pesan Sekarang
                </button>
                
                {userRole === 'Admin' && (
                  <button 
                    onClick={() => handleDeleteRoom(room.id, room.name)}
                    className="w-full bg-white text-red-500 border border-red-200 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-50 transition"
                  >
                    Hapus Ruangan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <BookingModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}

      {showAddModal && (
        <AddRoomModal 
          onClose={() => setShowAddModal(false)} 
          onRefresh={loadRooms} 
        />
      )}
    </div>
  );
};

export default DashboardPage;