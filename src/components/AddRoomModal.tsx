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
      onRefresh(); 
      onClose();
    } catch {
      alert('Gagal menambahkan ruangan, cek koneksi backend!');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl shadow-blue-900/20 border border-white relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>

        <header className="relative mb-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mx-auto mb-4 rotate-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Tambah Ruangan
          </h2>
          <p className="text-slate-500 font-medium mt-1">Masukkan data ruangan baru.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Nama Ruangan</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 outline-none shadow-inner"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Contoh: Lab Komputer 2"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Kapasitas (Orang)</label>
            <input 
              type="number" 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 outline-none shadow-inner"
              value={capacity} 
              onChange={(e) => setCapacity(Number(e.target.value))} 
              required 
              min="1"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;