import axios from 'axios';
import API_BASE_URL from '../api';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
