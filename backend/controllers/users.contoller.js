import Consumer from "../models/consumer.model.js";
import RequestModel from "../models/request.model.js";

export const getProfile = async (req, res) => {
    try {
        const user = req.user; // From authorize middleware
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserRequests = async (req, res) => {
    try {
        const consumerId = req.user._id;
        const requests = await RequestModel.find({ consumerId })
            .populate('outletId', 'name location city')
            .populate({
                path: 'tokenId',
                select: 'token status'
            });
        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = (req, res) => {
    res.send('Hello from user route');
}