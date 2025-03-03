import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-veterinaria-ph2u.onrender.com/api', // URL del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
