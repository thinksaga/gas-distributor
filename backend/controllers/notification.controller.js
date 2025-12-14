import Notification from '../models/notification.model.js';
import logger from '../utils/logger.js';

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId })
            .populate('relatedRequestId', 'status tokenNumber')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        logger.error('Error fetching user notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }
};

// Get unread notification count for a user
export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const count = await Notification.countDocuments({ userId, isRead: false });

        res.status(200).json({
            success: true,
            data: { count }
        });
    } catch (error) {
        logger.error('Error fetching unread count:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch unread count'
        });
    }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, userId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        logger.error('Error marking notification as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark notification as read'
        });
    }
};

// Mark all notifications as read for a user
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await Notification.updateMany(
            { userId, isRead: false },
            { isRead: true }
        );

        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        logger.error('Error marking all notifications as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark all notifications as read'
        });
    }
};

// Create a new notification (internal function for other controllers to use)
export const createNotification = async (userId, title, message, type, relatedRequestId = null) => {
    try {
        const notification = new Notification({
            userId,
            title,
            message,
            type,
            relatedRequestId
        });

        await notification.save();
        logger.info(`Notification created for user ${userId}: ${title}`);
        return notification;
    } catch (error) {
        logger.error('Error creating notification:', error);
        throw error;
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const notification = await Notification.findOneAndDelete({ _id: id, userId });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting notification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete notification'
        });
    }
};