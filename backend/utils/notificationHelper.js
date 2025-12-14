import { createNotification } from '../controllers/notification.controller.js';

/**
 * Notification helper functions to be used across the application
 */

// Request status change notifications
export const notifyRequestStatusChange = async (userId, requestId, oldStatus, newStatus) => {
    const statusMessages = {
        pending: 'Your gas request has been submitted and is awaiting approval',
        approved: 'Great news! Your gas request has been approved',
        rejected: 'Your gas request has been rejected. Please contact support for details',
        processing: 'Your order is being processed for delivery',
        delivered: 'Your gas cylinder has been delivered successfully!',
        cancelled: 'Your gas request has been cancelled'
    };

    const title = `Request Status: ${newStatus.toUpperCase()}`;
    const message = statusMessages[newStatus] || `Your request status has been updated to ${newStatus}`;

    await createNotification(userId, title, message, 'request_status', requestId);
};

// Token generation notification
export const notifyTokenGenerated = async (userId, requestId, tokenCode, expiryDate) => {
    const title = 'Token Generated Successfully';
    const message = `Your collection token ${tokenCode} has been generated. Valid until ${new Date(expiryDate).toLocaleDateString('en-IN')}. Show this at the outlet to collect your gas cylinder.`;

    await createNotification(userId, title, message, 'request_status', requestId);
};

// Delivery status notifications
export const notifyDeliveryStatusChange = async (userId, requestId, status) => {
    const deliveryMessages = {
        pending: 'Your delivery is being scheduled',
        assigned: 'A delivery person has been assigned to your order',
        out_for_delivery: 'Your gas cylinder is out for delivery and will arrive soon!',
        delivered: 'Your delivery has been completed. Thank you for your order!',
        cancelled: 'Your delivery has been cancelled. Please contact support',
        failed: 'Delivery attempt failed. We will contact you shortly'
    };

    const title = `Delivery Update: ${status.replace('_', ' ').toUpperCase()}`;
    const message = deliveryMessages[status] || `Your delivery status: ${status}`;

    await createNotification(userId, title, message, 'delivery', requestId);
};

// Payment notifications
export const notifyPaymentStatus = async (userId, requestId, status, amount) => {
    const paymentMessages = {
        pending: `Payment of ₹${amount} is pending`,
        success: `Payment of ₹${amount} completed successfully`,
        failed: `Payment of ₹${amount} failed. Please retry`,
        refunded: `Refund of ₹${amount} has been processed`
    };

    const title = `Payment ${status.toUpperCase()}`;
    const message = paymentMessages[status] || `Payment status: ${status}`;

    await createNotification(userId, title, message, 'payment', requestId);
};

// System notifications
export const notifySystemMessage = async (userId, title, message) => {
    await createNotification(userId, title, message, 'system', null);
};

// Bulk notification to multiple users
export const notifyMultipleUsers = async (userIds, title, message, type) => {
    const promises = userIds.map(userId => 
        createNotification(userId, title, message, type, null)
    );
    await Promise.all(promises);
};

// Welcome notification for new users
export const notifyNewUser = async (userId, username) => {
    const title = 'Welcome to VayuGas!';
    const message = `Hello ${username}! Welcome to VayuGas LPG Management System. Start by requesting your first gas cylinder.`;
    
    await createNotification(userId, title, message, 'system', null);
};

// Outlet assignment notification for admins
export const notifyOutletAssignment = async (adminId, outletName) => {
    const title = 'New Outlet Assigned';
    const message = `You have been assigned as admin for ${outletName}. You can now manage this outlet.`;
    
    await createNotification(adminId, title, message, 'system', null);
};

// Token expiry reminder
export const notifyTokenExpiring = async (userId, requestId, tokenCode, hoursRemaining) => {
    const title = 'Token Expiring Soon';
    const message = `Your token ${tokenCode} will expire in ${hoursRemaining} hours. Please collect your gas cylinder soon.`;
    
    await createNotification(userId, title, message, 'request_status', requestId);
};

// Stock alert for admins
export const notifyLowStock = async (adminId, outletName, productName, quantity) => {
    const title = 'Low Stock Alert';
    const message = `${outletName}: ${productName} stock is low (${quantity} units remaining). Please restock soon.`;
    
    await createNotification(adminId, title, message, 'system', null);
};

export default {
    notifyRequestStatusChange,
    notifyTokenGenerated,
    notifyDeliveryStatusChange,
    notifyPaymentStatus,
    notifySystemMessage,
    notifyMultipleUsers,
    notifyNewUser,
    notifyOutletAssignment,
    notifyTokenExpiring,
    notifyLowStock
};
