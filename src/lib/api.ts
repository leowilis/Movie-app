import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  },
});

export default api;