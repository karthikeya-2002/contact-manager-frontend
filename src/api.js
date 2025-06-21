import axios from 'axios';

const api = axios.create({
  baseURL: 'https://contact-manager-backend-g1r9.onrender.com'
});

export default api;
