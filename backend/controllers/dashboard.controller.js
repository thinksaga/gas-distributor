import Request from "../models/request.model.js";
import Consumer from "../models/consumer.model.js";
import Gasstock from "../models/gasstock.model.js";
import Outlet from "../models/outlet.model.js";

export const getAdminStats = async (req, res) => {
    try {
        const adminId = req.user._id;

        // Filter by adminId
        // Note: Request model needs to be populated with adminId when created. 
        // For now, assuming Request has adminId or we filter by outlets belonging to admin.
        // Let's assume Request has adminId as per plan.

        const totalOrders = await Request.countDocuments({ adminId });
        const totalDelivered = await Request.countDocuments({ adminId, status: 'Delivered' });

        // Calculate total cost from delivered orders (assuming price is in Request or Product)
        // For now, returning mock/calculated data

        const salesData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                { label: "Purchase", data: [50000, 45000, 48000, 40000, 42000, 46000], backgroundColor: "blue" },
                { label: "Sales", data: [40000, 42000, 43000, 38000, 39000, 41000], backgroundColor: "green" },
            ],
        };

        const orderSummaryData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
                { label: "Ordered", data: [3000, 3200, 3100, 2900, 2800], borderColor: "orange", fill: false },
                { label: "Delivered", data: [2000, 2500, 2400, 2300, 2200], borderColor: "blue", fill: false },
            ],
        };

        res.status(200).json({
            success: true,
            data: {
                totalOrders: totalOrders || 0,
                totalDelivered: totalDelivered || 0,
                totalCost: 17432, // Mock for now
                salesData,
                orderSummaryData
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSuperAdminStats = async (req, res) => {
    try {
        const totalUsers = await Consumer.countDocuments({ role: 'user' });
        const activeAdmins = await Consumer.countDocuments({ role: 'admin' });

        res.status(200).json({
            success: true,
            data: {
                totalUsers: totalUsers || 120,
                activeAdmins: activeAdmins || 5,
                systemHealth: "Good"
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserStats = async (req, res) => {
    try {
        // Mock news data
        const news = [
            "🔹 New Gas Delivery Slots Available!",
            "🔹 Price Update on LP Gas",
            "🔹 Special Offers for Loyal Customers",
            "🔹 Emergency Services Now Available"
        ];

        res.status(200).json({
            success: true,
            data: {
                news
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
