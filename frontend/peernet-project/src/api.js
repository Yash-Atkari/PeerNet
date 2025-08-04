import axios from 'axios';

export const api = axios.create({
  BASE_URL: import.meta.env.VITE_API_BASE,
  withCredentials: true,            // ← Allow sending cookies
});
