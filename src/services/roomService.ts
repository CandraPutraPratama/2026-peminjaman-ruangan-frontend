import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/rooms';

export const getRooms = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const addRoom = async (roomData: { name: string, capacity: number }) => {
  const token = localStorage.getItem('token');
  return await axios.post(API_URL, roomData, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteRoom = async (id: number) => {
  const token = localStorage.getItem('token');
  return await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};