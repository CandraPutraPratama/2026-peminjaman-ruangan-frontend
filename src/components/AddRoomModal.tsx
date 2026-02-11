import React, { useState } from 'react';
import { addRoom } from '../services/roomService';

const AddRoomModal = ({ onClose, onRefresh }: { onClose: () => void, onRefresh: () => void }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRoom({ name, capacity });
      alert('Ruangan baru berhasil ditambahkan!');
      onRefresh(); // Refresh daftar ruangan di dashboard
      onClose();
    } catch {
      alert('Gagal menambahkan ruangan, cek koneksi backend!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Tambah Ruangan Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Ruangan</label>
            <input 
              type="text" className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={name} onChange={(e) => setName(e.target.value)} required placeholder="Misal: Ruangan A301"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">Kapasitas (Orang)</label>
            <input 
              type="number" className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded-lg font-bold">Batal</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;