import React, { useState } from 'react';
import { createBooking } from '../services/bookingService';

interface ModalProps {
  room: any;
  onClose: () => void;
}

const BookingModal = ({ room, onClose }: ModalProps) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error tiap kali mencoba

    try {
      if (new Date(startTime) >= new Date(endTime)) {
        setError('Jam mulai harus lebih awal dari jam selesai!');
        return;
      }

      await createBooking({
        roomId: room.id,
        startTime: startTime,
        endTime: endTime
      });

      alert(`Sukses! Ruangan ${room.name} berhasil dipesan.`);
      onClose();
    } catch (err: any) {
      setError(err.response?.data || 'Jadwal bentrok atau ada error sistem!');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl shadow-blue-900/20 border border-white relative overflow-hidden">
        
        {/* Dekorasi kecil biar mewah */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>

        <header className="relative mb-8 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Pesan {room.name}
          </h2>
          <p className="text-slate-500 font-medium mt-1">Konfirmasi jadwal peminjaman lu.</p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 text-xs font-bold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Waktu Mulai</label>
            <input 
              type="datetime-local" 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 outline-none shadow-inner"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Waktu Selesai</label>
            <input 
              type="datetime-local" 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 outline-none shadow-inner"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 shadow-sm"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;