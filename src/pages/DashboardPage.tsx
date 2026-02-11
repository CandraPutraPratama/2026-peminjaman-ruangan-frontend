import { useEffect, useState } from 'react';
import { getRooms } from '../services/roomService';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';

const DashboardPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Gagal memuat data ruangan!", error);
      }
    };
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Pilih Ruangan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-4">Kapasitas: {room.capacity} Orang</p>
              <button 
                onClick={() => setSelectedRoom(room)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Pesan Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>

      {}
      {selectedRoom && (
        <BookingModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </div>
  );
};

export default DashboardPage;