import { useEffect, useState } from 'react';
import { getMyBookings } from '../services/bookingService';
import Navbar from '../components/Navbar';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await getMyBookings();
        setBookings(response.data);
      } catch (error) {
        console.error("Gagal mengambil riwayat bokingan!", error);
      }
    };
    fetchMyData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Riwayat Bokingan Saya</h2>
        
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-bold text-gray-600">Ruangan</th>
                <th className="p-4 font-bold text-gray-600 text-center">Waktu Mulai</th>
                <th className="p-4 font-bold text-gray-600 text-center">Waktu Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">Belum ada riwayat bokingan!, silahkan boking ruangan terlebih dahulu.</td></tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold text-blue-600">{b.roomName}</td>
                    <td className="p-4 text-center text-gray-600">{new Date(b.startTime).toLocaleString()}</td>
                    <td className="p-4 text-center text-gray-600">{new Date(b.endTime).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;