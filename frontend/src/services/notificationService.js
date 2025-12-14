import api from '../api.js';

export const getUserNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const getUnreadCount = async () => {
    try {
        const response = await api.get('/notifications/unread-count');
        return response.data.data.count;
    } catch (error) {
        console.error('Error fetching unread count:', error);
        throw error;
    }
};

export const markAsRead = async (notificationId) => {
    try {
        const response = await api.put(`/notifications/${notificationId}/read`);
        return response.data.data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

export const markAllAsRead = async () => {
    try {
        const response = await api.put('/notifications/mark-all-read');
        return response.data;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
    }
};

export const deleteNotification = async (notificationId) => {
    try {
        const response = await api.delete(`/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};