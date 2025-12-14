import RequestModel from "../models/request.model.js";
import Token from "../models/token.model.js";
import Outlet from "../models/outlet.model.js";
import generatePassword from "generate-password";

export const getToken = (req, res) => {
    res.send('Hello from token route');
}

export const verifyToken = async (req, res) => {
    try {
        const token = req.params.id;

        const tokenData = await Token.findOne({token: token}).populate('requestId');

        if (!tokenData) {
            return res.status(404).json({message: "Token not found"})
        }

        res.status(200).json({success: true, data: tokenData})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const requestToken = async (req, res) => {
    try {
        const { productId, quantity, outletId } = req.body;
        const consumerId = req.user._id;

        // Validate required fields
        if (!productId || !quantity || !outletId) {
            return res.status(400).json({ message: "Missing required fields: productId, quantity, and outletId are required" });
        }

        // Validate outlet exists
        const outlet = await Outlet.findById(outletId);
        if (!outlet) {
            return res.status(400).json({ message: "Invalid outlet" });
        }

        // Validate quantity
        if (quantity < 1 || quantity > 10) {
            return res.status(400).json({ message: "Quantity must be between 1 and 10" });
        }

        // Create request
        const newRequest = await RequestModel.create({
            productId,
            quantity,
            requestDate: new Date(),
            status: "pending",
            approval: "pending",
            consumerId,
            outletId
        });

        // Generate unique token
        const tokenString = generatePassword.generate({
            length: 8,
            numbers: true,
            symbols: false,
            uppercase: true,
            excludeSimilarCharacters: true
        });

        // Create token
        const newToken = await Token.create({
            token: tokenString,
            requestId: newRequest._id,
            consumerId,
            requestDate: new Date(),
            status: "active",
            expireDate: new Date(Date.now() + 86400000), // 1 day (24 hours)
            pickUpDate: null,
        });

        // Update request with tokenId
        newRequest.tokenId = newToken._id;
        await newRequest.save();

        // Populate request details for response
        const populatedRequest = await RequestModel.findById(newRequest._id)
            .populate('productId', 'name price weight')
            .populate('outletId', 'name location city')
            .populate('tokenId');

        return res.status(201).json({
            success: true,
            message: "Gas request submitted successfully! Token generated.",
            data: {
                token: newToken,
                request: populatedRequest
            }
        });
    }
    catch (error) {
        console.error("Token request error:", error);
        res.status(500).json({ message: error.message });
    }
}