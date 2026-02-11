import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/rooms';

export const getRooms = async () => {
  const token = localStorage.getItem('token');
  
  // untuk kirim token di Header agar diizinkan backend
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};