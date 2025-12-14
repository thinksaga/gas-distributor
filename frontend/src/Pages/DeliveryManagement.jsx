import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTruck, FaCheckCircle, FaClock, FaTimes, FaUser, FaMapMarkerAlt, FaBox } from 'react-icons/fa';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import Badge from '../Components/Badge';
import './DeliveryManagement.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const DeliveryManagement = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [deliveryPersons, setDeliveryPersons] = useState([]);
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');

    useEffect(() => {
        loadDeliveries();
        loadStats();
        loadDeliveryPersons();
    }, [filter]);

    const loadDeliveries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const statusFilter = filter !== 'all' ? `?status=${filter}` : '';
            const response = await axios.get(`${API_URL}/delivery${statusFilter}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeliveries(response.data.data);
        } catch (error) {
            console.error('Error loading deliveries:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/delivery/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data.data);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const loadDeliveryPersons = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Filter users who can be delivery persons (you might have a specific role)
            setDeliveryPersons(response.data.data || []);
        } catch (error) {
            console.error('Error loading delivery persons:', error);
        }
    };

    const handleAssignDelivery = async () => {
        if (!selectedDeliveryPerson) {
            alert('Please select a delivery person');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${API_URL}/delivery/${selectedDelivery._id}/assign`,
                { deliveryPersonId: selectedDeliveryPerson },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Delivery assigned successfully!');
            setShowAssignModal(false);
            loadDeliveries();
        } catch (error) {
            alert('Error assigning delivery: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleUpdateStatus = async (deliveryId, newStatus, note = '') => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${API_URL}/delivery/${deliveryId}/status`,
                { status: newStatus, note },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Delivery status updated to ${newStatus}`);
            loadDeliveries();
            loadStats();
        } catch (error) {
            alert('Error updating status: ' + (error.response?.data?.message || error.message));
        }
    };

    const viewDeliveryDetails = async (delivery) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/delivery/${delivery._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedDelivery(response.data.data.delivery);
            setShowModal(true);
        } catch (error) {
            console.error('Error loading delivery details:', error);
        }
    };

    const getStatusVariant = (status) => {
        const variants = {
            pending: 'warning',
            assigned: 'info',
            out_for_delivery: 'primary',
            delivered: 'success',
            cancelled: 'danger',
            failed: 'danger'
        };
        return variants[status] || 'default';
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: <FaClock />,
            assigned: <FaUser />,
            out_for_delivery: <FaTruck />,
            delivered: <FaCheckCircle />,
            cancelled: <FaTimes />,
            failed: <FaTimes />
        };
        return icons[status] || <FaClock />;
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

    const columns = [
        {
            header: 'Delivery ID',
            accessor: '_id',
            cell: (row) => (
                <span className="delivery-id">{row._id.slice(-8).toUpperCase()}</span>
            )
        },
        {
            header: 'Customer',
            accessor: 'requestId',
            cell: (row) => row.requestId?.consumerId ? (
                <div>
                    <div className="customer-name">
                        {row.requestId.consumerId.firstname} {row.requestId.consumerId.lastname}
                    </div>
                    <div className="customer-contact">{row.requestId.consumerId.contactNumber}</div>
                </div>
            ) : 'N/A'
        },
        {
            header: 'Product',
            accessor: 'requestId.productId',
            cell: (row) => row.requestId?.productId ? (
                <div>
                    <div className="product-name">{row.requestId.productId.name}</div>
                    <div className="product-qty">Qty: {row.requestId.quantity}</div>
                </div>
            ) : 'N/A'
        },
        {
            header: 'Address',
            accessor: 'deliveryAddress',
            cell: (row) => (
                <div className="delivery-address">
                    <FaMapMarkerAlt /> {row.deliveryAddress?.city || 'N/A'}
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => (
                <Badge variant={getStatusVariant(row.status)}>
                    {getStatusIcon(row.status)} {row.status.replace('_', ' ')}
                </Badge>
            )
        },
        {
            header: 'Delivery Person',
            accessor: 'deliveryPersonId',
            cell: (row) => row.deliveryPersonId ? (
                <div>
                    {row.deliveryPersonId.firstname} {row.deliveryPersonId.lastname}
                </div>
            ) : (
                <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                        setSelectedDelivery(row);
                        setShowAssignModal(true);
                    }}
                >
                    Assign
                </Button>
            )
        },
        {
            header: 'Est. Delivery',
            accessor: 'estimatedDeliveryDate',
            cell: (row) => row.estimatedDeliveryDate ? formatDate(row.estimatedDeliveryDate) : 'N/A'
        },
        {
            header: 'Actions',
            accessor: 'actions',
            cell: (row) => (
                <div className="action-buttons">
                    <Button size="sm" variant="primary" onClick={() => viewDeliveryDetails(row)}>
                        View
                    </Button>
                    {row.status === 'assigned' && (
                        <Button 
                            size="sm" 
                            variant="success"
                            onClick={() => handleUpdateStatus(row._id, 'out_for_delivery', 'Package picked up for delivery')}
                        >
                            Out for Delivery
                        </Button>
                    )}
                    {row.status === 'out_for_delivery' && (
                        <Button 
                            size="sm" 
                            variant="success"
                            onClick={() => handleUpdateStatus(row._id, 'delivered', 'Package delivered successfully')}
                        >
                            Mark Delivered
                        </Button>
                    )}
                </div>
            )
        }
    ];

    const filteredDeliveries = filter === 'all' 
        ? deliveries 
        : deliveries.filter(d => d.status === filter);

    return (
        <div className="delivery-management-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        <FaTruck /> Delivery Management
                    </h1>
                    <p className="page-subtitle">Manage and track all deliveries</p>
                </div>
                <Button variant="primary" onClick={loadDeliveries}>
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="stats-grid">
                    <Card className="stat-card">
                        <div className="stat-icon total"><FaBox /></div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">Total Deliveries</div>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon pending"><FaClock /></div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.pending}</div>
                            <div className="stat-label">Pending</div>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon transit"><FaTruck /></div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.out_for_delivery}</div>
                            <div className="stat-label">In Transit</div>
                        </div>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon delivered"><FaCheckCircle /></div>
                        <div className="stat-content">
                            <div className="stat-value">{stats.delivered}</div>
                            <div className="stat-label">Delivered</div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Filter Buttons */}
            <Card padding="lg">
                <div className="filter-section">
                    <div className="filter-label">Filter by Status:</div>
                    <div className="filter-buttons">
                        {['all', 'pending', 'assigned', 'out_for_delivery', 'delivered', 'cancelled'].map(status => (
                            <Button
                                key={status}
                                variant={filter === status ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(status)}
                            >
                                {status === 'all' ? 'All' : status.replace('_', ' ')}
                                {stats && status !== 'all' && ` (${stats[status] || 0})`}
                            </Button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading deliveries...</p>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={filteredDeliveries}
                        emptyMessage="No deliveries found"
                    />
                )}
            </Card>

            {/* Delivery Details Modal */}
            {showModal && selectedDelivery && (
                <Modal 
                    title="Delivery Details" 
                    onClose={() => setShowModal(false)}
                    size="lg"
                >
                    <div className="delivery-details-modal">
                        <div className="detail-section">
                            <h3>Delivery Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Delivery ID:</label>
                                    <span>{selectedDelivery._id}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Status:</label>
                                    <Badge variant={getStatusVariant(selectedDelivery.status)}>
                                        {getStatusIcon(selectedDelivery.status)} {selectedDelivery.status}
                                    </Badge>
                                </div>
                                <div className="detail-item">
                                    <label>Priority:</label>
                                    <Badge variant={selectedDelivery.priority === 'urgent' ? 'danger' : 'default'}>
                                        {selectedDelivery.priority}
                                    </Badge>
                                </div>
                                <div className="detail-item">
                                    <label>Estimated Delivery:</label>
                                    <span>{formatDate(selectedDelivery.estimatedDeliveryDate)}</span>
                                </div>
                                {selectedDelivery.actualDeliveryDate && (
                                    <div className="detail-item">
                                        <label>Actual Delivery:</label>
                                        <span>{formatDate(selectedDelivery.actualDeliveryDate)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3>Delivery Address</h3>
                            <div className="address-display">
                                <FaMapMarkerAlt />
                                <div>
                                    <p>{selectedDelivery.deliveryAddress?.street}</p>
                                    <p>{selectedDelivery.deliveryAddress?.city}, {selectedDelivery.deliveryAddress?.state}</p>
                                    {selectedDelivery.deliveryAddress?.pincode && (
                                        <p>PIN: {selectedDelivery.deliveryAddress.pincode}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedDelivery.trackingNotes && selectedDelivery.trackingNotes.length > 0 && (
                            <div className="detail-section">
                                <h3>Tracking History</h3>
                                <div className="tracking-timeline">
                                    {selectedDelivery.trackingNotes.map((note, index) => (
                                        <div key={index} className="timeline-item">
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-status">
                                                    <Badge variant={getStatusVariant(note.status)}>
                                                        {note.status}
                                                    </Badge>
                                                </div>
                                                <div className="timeline-note">{note.note}</div>
                                                <div className="timeline-time">{formatDate(note.timestamp)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="modal-actions">
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Assign Delivery Person Modal */}
            {showAssignModal && selectedDelivery && (
                <Modal 
                    title="Assign Delivery Person" 
                    onClose={() => setShowAssignModal(false)}
                >
                    <div className="assign-modal">
                        <div className="form-group">
                            <label>Select Delivery Person:</label>
                            <select 
                                className="form-select"
                                value={selectedDeliveryPerson}
                                onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                {deliveryPersons.map(person => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname} ({person.contactNumber})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-actions">
                            <Button variant="outline" onClick={() => setShowAssignModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleAssignDelivery}>
                                Assign
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DeliveryManagement;
