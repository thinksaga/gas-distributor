import Delivery from '../models/dilivary.model.js';
import Fulfillment from '../models/fullfill.model.js';
import Request from '../models/request.model.js';
import Consumer from '../models/consumer.model.js';
import Outlet from '../models/outlet.model.js';

/**
 * Create a new delivery from an approved request
 * POST /api/v1/delivery/create
 */
export const createDelivery = async (req, res) => {
    try {
        const { requestId, estimatedDeliveryDate, priority } = req.body;
        const adminId = req.user._id;

        // Validate request exists and is approved
        const request = await Request.findById(requestId)
            .populate('consumerId', 'street city state contactNumber')
            .populate('outletId');

        if (!request) {
            return res.status(404).json({ 
                success: false, 
                message: "Request not found" 
            });
        }

        if (request.status !== 'approved') {
            return res.status(400).json({ 
                success: false, 
                message: "Only approved requests can be processed for delivery" 
            });
        }

        // Check if delivery already exists
        const existingDelivery = await Delivery.findOne({ requestId });
        if (existingDelivery) {
            return res.status(400).json({ 
                success: false, 
                message: "Delivery already created for this request" 
            });
        }

        // Create delivery
        const delivery = await Delivery.create({
            requestId,
            outletId: request.outletId._id,
            estimatedDeliveryDate: estimatedDeliveryDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days default
            deliveryAddress: {
                street: request.consumerId.street,
                city: request.consumerId.city,
                state: request.consumerId.state || 'Unknown'
            },
            status: 'pending',
            priority: priority || 'normal',
            trackingNotes: [{
                status: 'pending',
                note: 'Delivery created and awaiting assignment',
                timestamp: new Date()
            }]
        });

        // Update request status
        request.status = 'processing';
        await request.save();

        const populatedDelivery = await Delivery.findById(delivery._id)
            .populate('requestId')
            .populate('outletId', 'name location city');

        return res.status(201).json({
            success: true,
            message: "Delivery created successfully",
            data: populatedDelivery
        });
    } catch (error) {
        console.error("Create delivery error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Assign delivery to a delivery person
 * PUT /api/v1/delivery/:id/assign
 */
export const assignDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const { deliveryPersonId } = req.body;

        // Validate delivery person exists and has appropriate role
        const deliveryPerson = await Consumer.findById(deliveryPersonId);
        if (!deliveryPerson) {
            return res.status(404).json({ 
                success: false, 
                message: "Delivery person not found" 
            });
        }

        // Update delivery
        const delivery = await Delivery.findByIdAndUpdate(
            id,
            {
                deliveryPersonId,
                status: 'assigned',
                $push: {
                    trackingNotes: {
                        status: 'assigned',
                        note: `Assigned to ${deliveryPerson.firstname} ${deliveryPerson.lastname}`,
                        timestamp: new Date()
                    }
                }
            },
            { new: true }
        )
        .populate('requestId')
        .populate('deliveryPersonId', 'firstname lastname contactNumber')
        .populate('outletId', 'name location city');

        if (!delivery) {
            return res.status(404).json({ 
                success: false, 
                message: "Delivery not found" 
            });
        }

        return res.status(200).json({
            success: true,
            message: "Delivery assigned successfully",
            data: delivery
        });
    } catch (error) {
        console.error("Assign delivery error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Update delivery status
 * PUT /api/v1/delivery/:id/status
 */
export const updateDeliveryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note, deliveryProof } = req.body;

        const validStatuses = ['pending', 'assigned', 'out_for_delivery', 'delivered', 'cancelled', 'failed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status" 
            });
        }

        const updateData = {
            status,
            $push: {
                trackingNotes: {
                    status,
                    note: note || `Status updated to ${status}`,
                    timestamp: new Date()
                }
            }
        };

        // If delivered, add actual delivery date and proof
        if (status === 'delivered') {
            updateData.actualDeliveryDate = new Date();
            if (deliveryProof) {
                updateData.deliveryProof = deliveryProof;
            }
        }

        const delivery = await Delivery.findByIdAndUpdate(id, updateData, { new: true })
            .populate('requestId')
            .populate('deliveryPersonId', 'firstname lastname contactNumber')
            .populate('outletId', 'name location city');

        if (!delivery) {
            return res.status(404).json({ 
                success: false, 
                message: "Delivery not found" 
            });
        }

        // Update request status based on delivery status
        if (status === 'delivered') {
            await Request.findByIdAndUpdate(delivery.requestId._id, { 
                status: 'delivered' 
            });

            // Create fulfillment record
            await Fulfillment.create({
                requestId: delivery.requestId._id,
                deliveryId: delivery._id,
                tokenId: delivery.requestId.tokenId,
                fulfillmentDate: new Date(),
                status: 'fulfilled',
                quantityFulfilled: delivery.requestId.quantity,
                verifiedBy: req.user._id
            });
        } else if (status === 'cancelled' || status === 'failed') {
            await Request.findByIdAndUpdate(delivery.requestId._id, { 
                status: 'cancelled' 
            });
        }

        return res.status(200).json({
            success: true,
            message: `Delivery status updated to ${status}`,
            data: delivery
        });
    } catch (error) {
        console.error("Update delivery status error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Get all deliveries with filters
 * GET /api/v1/delivery
 */
export const getDeliveries = async (req, res) => {
    try {
        const { status, deliveryPersonId, outletId, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (deliveryPersonId) filter.deliveryPersonId = deliveryPersonId;
        if (outletId) filter.outletId = outletId;

        const deliveries = await Delivery.find(filter)
            .populate('requestId')
            .populate('deliveryPersonId', 'firstname lastname contactNumber')
            .populate('outletId', 'name location city')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Delivery.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: deliveries,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error("Get deliveries error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Get delivery by ID with full details
 * GET /api/v1/delivery/:id
 */
export const getDeliveryById = async (req, res) => {
    try {
        const { id } = req.params;

        const delivery = await Delivery.findById(id)
            .populate({
                path: 'requestId',
                populate: [
                    { path: 'productId', select: 'name price weight type' },
                    { path: 'consumerId', select: 'firstname lastname contactNumber email street city state' },
                    { path: 'tokenId' }
                ]
            })
            .populate('deliveryPersonId', 'firstname lastname contactNumber email')
            .populate('outletId', 'name location city state contactNumber');

        if (!delivery) {
            return res.status(404).json({ 
                success: false, 
                message: "Delivery not found" 
            });
        }

        // Get fulfillment if exists
        const fulfillment = await Fulfillment.findOne({ deliveryId: id })
            .populate('verifiedBy', 'firstname lastname');

        return res.status(200).json({
            success: true,
            data: {
                delivery,
                fulfillment
            }
        });
    } catch (error) {
        console.error("Get delivery error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Get delivery tracking for consumer
 * GET /api/v1/delivery/track/:requestId
 */
export const trackDelivery = async (req, res) => {
    try {
        const { requestId } = req.params;

        const delivery = await Delivery.findOne({ requestId })
            .populate('deliveryPersonId', 'firstname lastname contactNumber')
            .populate('outletId', 'name location city contactNumber')
            .select('-deliveryProof'); // Don't expose delivery proof to consumers

        if (!delivery) {
            return res.status(404).json({ 
                success: false, 
                message: "Delivery not found for this request" 
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                status: delivery.status,
                estimatedDeliveryDate: delivery.estimatedDeliveryDate,
                actualDeliveryDate: delivery.actualDeliveryDate,
                trackingNotes: delivery.trackingNotes,
                deliveryPerson: delivery.deliveryPersonId,
                outlet: delivery.outletId
            }
        });
    } catch (error) {
        console.error("Track delivery error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Get deliveries assigned to logged-in delivery person
 * GET /api/v1/delivery/my-deliveries
 */
export const getMyDeliveries = async (req, res) => {
    try {
        const deliveryPersonId = req.user._id;
        const { status } = req.query;

        const filter = { deliveryPersonId };
        if (status) filter.status = status;

        const deliveries = await Delivery.find(filter)
            .populate({
                path: 'requestId',
                populate: [
                    { path: 'productId', select: 'name price weight' },
                    { path: 'consumerId', select: 'firstname lastname contactNumber street city state' }
                ]
            })
            .populate('outletId', 'name location city')
            .sort({ estimatedDeliveryDate: 1 });

        return res.status(200).json({
            success: true,
            data: deliveries
        });
    } catch (error) {
        console.error("Get my deliveries error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

/**
 * Get delivery statistics
 * GET /api/v1/delivery/stats
 */
export const getDeliveryStats = async (req, res) => {
    try {
        const { outletId, startDate, endDate } = req.query;

        const filter = {};
        if (outletId) filter.outletId = outletId;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const stats = await Delivery.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Delivery.countDocuments(filter);

        const statsObject = {
            total,
            pending: 0,
            assigned: 0,
            out_for_delivery: 0,
            delivered: 0,
            cancelled: 0,
            failed: 0
        };

        stats.forEach(stat => {
            statsObject[stat._id] = stat.count;
        });

        return res.status(200).json({
            success: true,
            data: statsObject
        });
    } catch (error) {
        console.error("Get delivery stats error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};
