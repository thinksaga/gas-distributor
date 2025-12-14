import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Badge from "../Components/Badge";
import { FaBell, FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import {
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
} from "../services/notificationService";
import "./UserNotify.css";

const UserNotify = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const [notificationsData, countData] = await Promise.all([
        getUserNotifications(),
        getUnreadCount()
      ]);
      setNotifications(notificationsData);
      setUnreadCount(countData);
    } catch (error) {
      toast.error('Failed to load notifications');
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "request_status":
        return <FaCheckCircle className="notif-icon success" />;
      case "payment":
        return <FaCheckCircle className="notif-icon success" />;
      case "delivery":
        return <FaInfoCircle className="notif-icon info" />;
      case "system":
        return <FaExclamationTriangle className="notif-icon warning" />;
      default:
        return <FaBell className="notif-icon" />;
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(notifications.map(n =>
        n._id === id ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
      toast.success('Notification marked as read');
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="usernotify-page">
        <div className="notify-header">
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="usernotify-page">
      <div className="notify-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay updated with your orders and offers</p>
        </div>
        <div className="notify-actions">
          {unreadCount > 0 && (
            <Badge variant="primary" size="lg">{unreadCount} New</Badge>
          )}
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="mark-all-read-btn"
            >
              Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="notifications-container">
        {notifications.length === 0 ? (
          <Card padding="xl" className="empty-state">
            <FaBell className="empty-icon" />
            <h3>No notifications yet</h3>
            <p>You'll see updates about your orders here</p>
          </Card>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                padding="lg"
                className={`notification-card ${!notification.isRead ? 'unread' : ''}`}
                hover
              >
                <div className="notification-content">
                  {getIcon(notification.type)}
                  <div className="notification-text">
                    <h4 className="notification-title">{notification.title}</h4>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-date">
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
                <div className="notification-actions">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="action-btn read-btn"
                      title="Mark as read"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="action-btn delete-btn"
                    title="Delete notification"
                  >
                    <FaTrash />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotify;
