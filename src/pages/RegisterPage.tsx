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
      alert('Registrasi Berhasil! Silakan Login!.');
      navigate('/login');
    } catch {
      setError('Gagal mendaftar. Pastikan username belum digunakan.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-green-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Daftar Admin Baru</h2>
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
              value={username} onChange={(e) => setUsername(e.target.value)} required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-bold shadow-md">
            Daftar Sekarang
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;