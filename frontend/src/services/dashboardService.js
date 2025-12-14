import axios from 'axios';
import API_BASE_URL from '../api';

export const fetchAdminStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/admin-stats`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw error;
    }
};

export const fetchSuperAdminStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/superadmin-stats`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching superadmin stats:", error);
        throw error;
    }
};

export const fetchUserStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/user-stats`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user stats:", error);
        throw error;
    }
};
