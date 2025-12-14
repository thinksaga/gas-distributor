import express from 'express';
import {
    createDelivery,
    assignDelivery,
    updateDeliveryStatus,
    getDeliveries,
    getDeliveryById,
    trackDelivery,
    getMyDeliveries,
    getDeliveryStats
} from '../controllers/delivery.controller.js';
import authorize from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin routes
router.post('/create', authorize, createDelivery);
router.put('/:id/assign', authorize, assignDelivery);
router.put('/:id/status', authorize, updateDeliveryStatus);
router.get('/stats', authorize, getDeliveryStats);
router.get('/', authorize, getDeliveries);
router.get('/:id', authorize, getDeliveryById);

// Delivery person routes
router.get('/my-deliveries', authorize, getMyDeliveries);

// Consumer routes (public tracking)
router.get('/track/:requestId', authorize, trackDelivery);

export default router;
