import axios from 'axios';

const axiosInstance = axios.create({ 
    baseURL: 'https://drive-app-9zyb.onrender.com/api'
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default axiosInstance;