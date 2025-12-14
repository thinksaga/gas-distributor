import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action.');
        }

        // Handle 429 Too Many Requests
        if (error.response?.status === 429) {
            toast.error('Too many requests. Please try again later.');
        }

        // Handle 500 Server Error
        if (error.response?.status >= 500) {
            toast.error('Server error. Please try again later.');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
