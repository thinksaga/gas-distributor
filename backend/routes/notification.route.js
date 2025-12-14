import express from 'express';
import authorize from '../middleware/auth.middleware.js';
import {
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
} from '../controllers/notification.controller.js';

const router = express.Router();

// All notification routes require authentication
router.use(authorize);

// Get all notifications for the authenticated user
router.get('/', getUserNotifications);

// Get unread notification count for the authenticated user
router.get('/unread-count', getUnreadCount);

// Mark a specific notification as read
router.put('/:id/read', markAsRead);

// Mark all notifications as read for the authenticated user
router.put('/mark-all-read', markAllAsRead);

// Delete a notification
router.delete('/:id', deleteNotification);

export default router;