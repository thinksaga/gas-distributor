import axios from 'axios';
import API_BASE_URL from '../api';

export const createAdmin = async (adminData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/organization/create-admin`, adminData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw error;
    }
};

export const getAdmins = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/organization/admins`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

export const promoteUser = async (username, role) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/promote`, { username, role }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error promoting user:", error);
        throw error;
    }
};

export const createOutlet = async (outletData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/outlets`, outletData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating outlet:", error);
        throw error;
    }
};

export const getAllOutlets = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/outlets`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching outlets:", error);
        throw error;
    }
};
