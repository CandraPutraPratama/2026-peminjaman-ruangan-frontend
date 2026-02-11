import { useEffect, useState } from 'react';
import { getRooms } from '../services/roomService';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await getRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Gagal mengambil data ruangan!", error);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Daftar Ruangan</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {rooms.length} Ruangan Tersedia
          </span>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading data</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-600 uppercase text-xs">Nama Ruangan</th>
                  <th className="p-4 font-bold text-gray-600 uppercase text-xs text-center">Kapasitas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-700">{room.name}</td>
                    <td className="p-4 text-center">
                      <span className="bg-gray-100 px-3 py-1 rounded-md text-gray-600">
                        {room.capacity} Orang
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;