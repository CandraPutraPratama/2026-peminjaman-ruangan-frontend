import axios from 'axios';

// untuk ambil URL dari .env biar ngga ganti ganti
const API_URL = import.meta.env.VITE_API_URL + '/api/auth';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  
  if (response.data) {
    localStorage.setItem('token', response.data);
  }
  return response.data;
};

export const register = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};