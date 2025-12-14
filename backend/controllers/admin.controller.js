import Consumer from '../models/consumer.model.js';
import Outlet from '../models/outlet.model.js';

// Promote or demote a user. Only superadmin is allowed to set roles (for safety).
export const promoteUser = async (req, res) => {
    try {
        const requester = req.user; // set by authorize middleware
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const { username, role } = req.body;
        if (!username || !role) return res.status(400).json({ message: 'username and role are required' });

        const allowed = ['user', 'admin', 'superadmin'];
        if (!allowed.includes(role)) return res.status(400).json({ message: 'Invalid role' });

        const user = await Consumer.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = role;
        await user.save();

        res.status(200).json({ success: true, message: `User ${username} role updated to ${role}`, data: { username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (for superadmin to manage)
export const getAllUsers = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const users = await Consumer.find({}, '-password'); // Exclude password
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new outlet
export const createOutlet = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const { name, location, city, password, adminId } = req.body;
        if (!name || !location || !city || !password) return res.status(400).json({ message: 'name, location, city, and password are required' });

        const outlet = await Outlet.create({ name, location, city, password, adminId });
        res.status(201).json({ success: true, message: 'Outlet created', data: outlet });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all outlets
export const getAllOutlets = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const outlets = await Outlet.find().populate('adminId', 'username firstname lastname');
        res.status(200).json({ success: true, data: outlets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an outlet
export const updateOutlet = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const { id } = req.params;
        const updates = req.body;
        const outlet = await Outlet.findByIdAndUpdate(id, updates, { new: true });
        if (!outlet) return res.status(404).json({ message: 'Outlet not found' });

        res.status(200).json({ success: true, message: 'Outlet updated', data: outlet });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an outlet
export const deleteOutlet = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester || requester.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: superadmin only' });
        }

        const { id } = req.params;
        const outlet = await Outlet.findByIdAndDelete(id);
        if (!outlet) return res.status(404).json({ message: 'Outlet not found' });

        res.status(200).json({ success: true, message: 'Outlet deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { promoteUser, getAllUsers, createOutlet, getAllOutlets, updateOutlet, deleteOutlet };
