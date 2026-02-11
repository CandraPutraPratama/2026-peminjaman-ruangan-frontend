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
    try {
      // pastikan jam mulai lebih awal dari jam selesai
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
      // Nangkep error bentrok dari backend lu
      setError(err.response?.data || 'Jadwal bentrok atau ada error sistem!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">Pesan {room.name}</h2>
        <p className="text-gray-500 mb-6">Pilih jadwal peminjaman lu.</p>

        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Jam Mulai</label>
            <input 
              type="datetime-local" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">Jam Selesai</label>
            <input 
              type="datetime-local" 
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded-lg font-bold hover:bg-gray-300">Batal</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">Konfirmasi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;