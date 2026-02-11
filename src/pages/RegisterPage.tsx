import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert('Registrasi Berhasil! Silakan Login.');
      navigate('/login');
    } catch {
      setError('Gagal mendaftar. Username sudah dipakai atau hubungi admin!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-green-100/50 w-full max-w-md border border-white/50 relative z-10">
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mx-auto mb-4 -rotate-3">
            <span className="text-white font-black text-3xl italic">R</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Daftar Akun</h2>
          <p className="text-slate-500 font-medium mt-1">Register Akun Baru</p>
        </header>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-xs font-bold border-l-4 border-red-500 animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Username Baru</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all placeholder:text-slate-300 font-medium text-slate-700 outline-none shadow-inner" 
              placeholder="Pilih username unik"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all placeholder:text-slate-300 font-medium text-slate-700 outline-none shadow-inner" 
              placeholder="Minimal 6 karakter"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all font-bold shadow-xl shadow-green-200 active:scale-95 text-lg"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-10 text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline transition-all">Login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;