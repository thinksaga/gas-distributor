import axios from 'axios';
import API_BASE_URL from '../api';

export const fetchOutlets = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/outlet`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching outlets:", error);
        throw error;
    }
};

export const getOutletStock = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/outlet/stock`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching outlet stock:", error);
        throw error;
    }
};

export const updateStock = async (stockData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/outlet/stock`, stockData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating stock:", error);
        throw error;
    }
};

export const getPendingRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/outlet/requests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        throw error;
    }
};

export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/outlet/validate-token`, { token }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error validating token:", error);
        throw error;
    }
};

export const fulfillRequest = async (requestId, location) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/outlet/fulfill`, { requestId, location }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fulfilling request:", error);
        throw error;
    }
};
