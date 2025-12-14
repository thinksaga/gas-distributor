import axios from 'axios';
import API_BASE_URL from '../api';

export const getUserRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/requests`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user requests:", error);
        throw error;
    }
};

export const requestGas = async (requestData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/token/request`, requestData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error requesting gas:", error);
        throw error;
    }
};