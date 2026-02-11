import { useEffect, useState } from 'react';
import { getMyBookings, deleteBooking } from '../services/bookingService';
import Navbar from '../components/Navbar';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchMyData = async () => {
    try {
      const response = await getMyBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Gagal mengambil riwayat bokingan, coba lagi!", error);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  const handleCancel = async (id: number) => {
    if (window.confirm('Yakin mau membatalkan bokingan ini?')) {
      try {
        await deleteBooking(id);
        alert('Bokingan berhasil dibatalkan!');
        fetchMyData();
      } catch (error) {
        alert('Gagal membatalkan bokingan, coba lagi nanti!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Bookingan Saya</h2>
          <p className="text-slate-500 font-medium mt-1">Pantau dan kelola semua reservasi ruangan kamu disini.</p>
        </header>
        
        {/* Table Container with Glassmorphism Effect */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest pl-10">Ruangan</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Waktu Mulai</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Waktu Selesai</th>
                <th className="p-6 font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Opsi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-400 font-bold">Belum ada ruangan yang kamu booking.</p>
                      <button onClick={() => window.history.back()} className="text-blue-600 font-black text-xs hover:underline uppercase tracking-tighter">Cari Ruangan Sekarang →</button>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                    <td className="p-6 pl-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="font-bold text-slate-700 text-lg tracking-tight">{b.roomName}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="inline-block px-4 py-2 bg-white rounded-xl text-slate-500 font-bold text-xs border border-slate-100 shadow-sm">
                        {new Date(b.startTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="inline-block px-4 py-2 bg-white rounded-xl text-slate-500 font-bold text-xs border border-slate-100 shadow-sm">
                        {new Date(b.endTime).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => handleCancel(b.id)}
                        className="bg-red-50 text-red-500 px-6 py-2 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        BATALKAN
                      </button>
                    </td>
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