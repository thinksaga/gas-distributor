import mongoose from "mongoose";
import Outlet from "../models/outlet.model.js";
import gasstockModel from "../models/gasstock.model.js";
import RequestModel from "../models/request.model.js";
import Token from "../models/token.model.js";
import Delivery from "../models/dilivary.model.js";
import Fullfill from "../models/fullfill.model.js";

export const getOutlets = async (req, res) => {
    try {
        let query = {};
        // If user is admin, only show their outlets
        if (req.user.role === 'admin') {
            query.adminId = req.user._id;
        }

        const outlets = await Outlet.find(query).select('-password').lean();

        if (outlets) {
            for (let i = 0; i < outlets.length; i++) {
                const stock = await gasstockModel.findById(outlets[i].stockId).lean();
                if (stock) {
                    outlets[i].stock = stock
                }
            }
        }

        res.status(200).json({ success: true, data: outlets })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createOutlet = async (req, res) => {
    const outlet = req.body;
    // Assign adminId from logged in user if admin, otherwise require it in body (for superadmin)
    // For simplicity, assuming only admins create outlets for themselves for now
    const newOutlet = new Outlet({ ...outlet, adminId: req.user._id, createdAt: new Date().toISOString() });
    try {
        await newOutlet.save();
        res.status(201).json(newOutlet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Verify ownership if admin
        const outlet = await Outlet.findById(id);
        if (!outlet) return res.status(404).send(`No outlet with id: ${id}`);

        if (req.user.role === 'admin' && outlet.adminId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this outlet" });
        }

        if (outlet.stockId) {
            const stock = await gasstockModel.findById(outlet.stockId);
            if (stock) {
                stock.status = status;
                await stock.save();
            }
        }

        res.status(200).json({ success: true, message: "Outlet status updated" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get stock for the outlet (admin's outlet)
export const getOutletStock = async (req, res) => {
    try {
        const adminId = req.user._id;
        const outlets = await Outlet.find({ adminId });

        let stocks = [];
        for (const outlet of outlets) {
            if (outlet.stockId) {
                const stock = await gasstockModel.findById(outlet.stockId).populate('productId');
                if (stock) stocks.push({ outlet: outlet.name, ...stock.toObject() });
            }
        }

        res.status(200).json({ success: true, data: stocks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update stock (add/remove quantity)
export const updateStock = async (req, res) => {
    try {
        const { outletId, productId, quantity } = req.body; // quantity can be positive (add) or negative (remove)
        const adminId = req.user._id;

        const outlet = await Outlet.findOne({ _id: outletId, adminId });
        if (!outlet) return res.status(403).json({ message: "Unauthorized or outlet not found" });

        let stock = outlet.stockId ? await gasstockModel.findById(outlet.stockId) : null;
        if (!stock) {
            // Create new stock
            stock = await gasstockModel.create({
                quantity: Math.max(0, quantity),
                status: 'available',
                productId,
                adminId
            });
            outlet.stockId = stock._id;
            await outlet.save();
        } else {
            stock.quantity = Math.max(0, stock.quantity + quantity);
            await stock.save();
        }

        res.status(200).json({ success: true, message: "Stock updated", data: stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get pending requests for the outlet
export const getPendingRequests = async (req, res) => {
    try {
        const adminId = req.user._id;
        const outlets = await Outlet.find({ adminId }).select('_id');

        const outletIds = outlets.map(o => o._id);
        const requests = await RequestModel.find({ outletId: { $in: outletIds }, status: 'pending' }).populate('consumerId', 'firstname lastname username');

        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Validate token and fulfill request
export const validateToken = async (req, res) => {
    try {
        const { token } = req.body;
        const adminId = req.user._id;

        const tokenDoc = await Token.findOne({ token }).populate('requestId');
        if (!tokenDoc) return res.status(404).json({ message: "Token not found" });

        const request = tokenDoc.requestId;
        if (!request) return res.status(404).json({ message: "Request not found" });

        // Check if request is for this admin's outlet
        const outlet = await Outlet.findOne({ _id: request.outletId, adminId });
        if (!outlet) return res.status(403).json({ message: "Unauthorized to fulfill this request" });

        // Mark as fulfilled
        request.status = 'approved';
        await request.save();

        tokenDoc.status = 'approved';
        await tokenDoc.save();

        res.status(200).json({ success: true, message: "Token validated and request approved", data: { token: tokenDoc, request } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fulfill a request (create delivery and fulfillment)
export const fulfillRequest = async (req, res) => {
    try {
        const { requestId, location } = req.body;
        const adminId = req.user._id;

        const request = await RequestModel.findById(requestId).populate('consumerId');
        if (!request) return res.status(404).json({ message: "Request not found" });

        // Check if request is for this admin's outlet
        const outlet = await Outlet.findOne({ _id: request.outletId, adminId });
        if (!outlet) return res.status(403).json({ message: "Unauthorized to fulfill this request" });

        // Check stock availability
        if (outlet.stockId) {
            const stock = await gasstockModel.findById(outlet.stockId);
            if (stock && stock.quantity < request.quantity) {
                return res.status(400).json({ message: "Insufficient stock" });
            }
            // Deduct stock
            stock.quantity -= request.quantity;
            await stock.save();
        }

        // Create delivery
        const delivery = new Delivery({
            dilivaryDate: new Date(),
            status: 'approved',
            location: location || request.consumerId.address || 'Default Location',
            requestId: request._id,
            outletId: outlet._id
        });
        await delivery.save();

        // Create fulfillment
        const fulfillment = new Fullfill({
            requestId: request._id,
            diliveyId: delivery._id,
            date: new Date()
        });
        await fulfillment.save();

        // Update request status
        request.status = 'approved';
        await request.save();

        res.status(200).json({ success: true, message: "Request fulfilled successfully", data: { request, delivery, fulfillment } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};