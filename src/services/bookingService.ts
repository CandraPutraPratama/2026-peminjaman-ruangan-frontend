import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/bookings';

export const createBooking = async (bookingData: { roomId: number, startTime: string, endTime: string }) => {
  const token = localStorage.getItem('token');
  // header Authorization wajib ada untuk identitas user
  return await axios.post(API_URL, bookingData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMyBookings = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(`${API_URL}/my-bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteBooking = async (id: number) => {
  const token = localStorage.getItem('token');
  return await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};