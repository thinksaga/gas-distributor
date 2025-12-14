import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import Card from '../Components/Card';
import Badge from '../Components/Badge';
import './DeliveryTracking.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const DeliveryTracking = ({ requestId: propRequestId }) => {
    const { requestId: paramRequestId } = useParams();
    const requestId = propRequestId || paramRequestId;
    
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (requestId) {
            loadDeliveryTracking();
        }
    }, [requestId]);

    const loadDeliveryTracking = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/delivery/track/${requestId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeliveryInfo(response.data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Unable to load delivery information');
            console.error('Error loading delivery tracking:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status) => {
        const statusMap = {
            pending: {
                label: 'Pending',
                icon: <FaClock />,
                variant: 'warning',
                description: 'Your order is being prepared'
            },
            assigned: {
                label: 'Assigned',
                icon: <FaUser />,
                variant: 'info',
                description: 'Delivery person assigned'
            },
            out_for_delivery: {
                label: 'Out for Delivery',
                icon: <FaTruck />,
                variant: 'primary',
                description: 'Your order is on the way'
            },
            delivered: {
                label: 'Delivered',
                icon: <FaCheckCircle />,
                variant: 'success',
                description: 'Order delivered successfully'
            }
        };
        return statusMap[status] || statusMap.pending;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getProgressPercentage = (status) => {
        const progressMap = {
            pending: 25,
            assigned: 50,
            out_for_delivery: 75,
            delivered: 100
        };
        return progressMap[status] || 0;
    };

    if (loading) {
        return (
            <div className="delivery-tracking-page">
                <Card padding="xl">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading delivery information...</p>
                    </div>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="delivery-tracking-page">
                <Card padding="xl">
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                </Card>
            </div>
        );
    }

    if (!deliveryInfo) {
        return (
            <div className="delivery-tracking-page">
                <Card padding="xl">
                    <div className="error-container">
                        <p>No delivery information available</p>
                    </div>
                </Card>
            </div>
        );
    }

    const statusInfo = getStatusInfo(deliveryInfo.status);
    const progress = getProgressPercentage(deliveryInfo.status);

    return (
        <div className="delivery-tracking-page">
            <div className="tracking-header">
                <h1 className="page-title">
                    <FaTruck /> Track Your Delivery
                </h1>
            </div>

            {/* Current Status Card */}
            <Card className="status-card" padding="xl">
                <div className="status-header">
                    <div className="status-icon-large" style={{ 
                        background: `var(--color-${statusInfo.variant})` 
                    }}>
                        {statusInfo.icon}
                    </div>
                    <div className="status-info">
                        <Badge variant={statusInfo.variant} size="lg">
                            {statusInfo.label}
                        </Badge>
                        <p className="status-description">{statusInfo.description}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="progress-steps">
                        <div className={`step ${progress >= 25 ? 'active' : ''}`}>
                            <div className="step-marker"></div>
                            <div className="step-label">Pending</div>
                        </div>
                        <div className={`step ${progress >= 50 ? 'active' : ''}`}>
                            <div className="step-marker"></div>
                            <div className="step-label">Assigned</div>
                        </div>
                        <div className={`step ${progress >= 75 ? 'active' : ''}`}>
                            <div className="step-marker"></div>
                            <div className="step-label">In Transit</div>
                        </div>
                        <div className={`step ${progress >= 100 ? 'active' : ''}`}>
                            <div className="step-marker"></div>
                            <div className="step-label">Delivered</div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="info-grid">
                {/* Delivery Details */}
                <Card padding="lg">
                    <h3 className="card-title">Delivery Details</h3>
                    <div className="info-list">
                        {deliveryInfo.estimatedDeliveryDate && (
                            <div className="info-item">
                                <FaClock className="info-icon" />
                                <div>
                                    <div className="info-label">Estimated Delivery</div>
                                    <div className="info-value">
                                        {formatDate(deliveryInfo.estimatedDeliveryDate)}
                                    </div>
                                </div>
                            </div>
                        )}
                        {deliveryInfo.actualDeliveryDate && (
                            <div className="info-item">
                                <FaCheckCircle className="info-icon success" />
                                <div>
                                    <div className="info-label">Delivered On</div>
                                    <div className="info-value">
                                        {formatDate(deliveryInfo.actualDeliveryDate)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Delivery Person Info */}
                {deliveryInfo.deliveryPerson && (
                    <Card padding="lg">
                        <h3 className="card-title">Delivery Person</h3>
                        <div className="info-list">
                            <div className="info-item">
                                <FaUser className="info-icon" />
                                <div>
                                    <div className="info-label">Name</div>
                                    <div className="info-value">
                                        {deliveryInfo.deliveryPerson.firstname} {deliveryInfo.deliveryPerson.lastname}
                                    </div>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaPhone className="info-icon" />
                                <div>
                                    <div className="info-label">Contact</div>
                                    <div className="info-value">
                                        {deliveryInfo.deliveryPerson.contactNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Outlet Info */}
                {deliveryInfo.outlet && (
                    <Card padding="lg">
                        <h3 className="card-title">Outlet Information</h3>
                        <div className="info-list">
                            <div className="info-item">
                                <FaMapMarkerAlt className="info-icon" />
                                <div>
                                    <div className="info-label">{deliveryInfo.outlet.name}</div>
                                    <div className="info-value">
                                        {deliveryInfo.outlet.location}, {deliveryInfo.outlet.city}
                                    </div>
                                </div>
                            </div>
                            {deliveryInfo.outlet.contactNumber && (
                                <div className="info-item">
                                    <FaPhone className="info-icon" />
                                    <div>
                                        <div className="info-label">Contact</div>
                                        <div className="info-value">
                                            {deliveryInfo.outlet.contactNumber}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            {/* Tracking History */}
            {deliveryInfo.trackingNotes && deliveryInfo.trackingNotes.length > 0 && (
                <Card padding="lg">
                    <h3 className="card-title">Tracking History</h3>
                    <div className="tracking-timeline">
                        {deliveryInfo.trackingNotes.map((note, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-note">{note.note}</div>
                                    <div className="timeline-time">{formatDate(note.timestamp)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DeliveryTracking;
