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
        const {gasType, quantity, outletId } = req.body;
        const consumerId = req.user._id;

        // Validate outlet exists
        const outlet = await Outlet.findById(outletId);
        if (!outlet) {
            return res.status(400).json({ message: "Invalid outlet" });
        }

        const newRequest = await RequestModel.create({
            gasType,
            quantity,
            requestDate: new Date(),
            status: "pending",
            approval: "pending",
            consumerId,
            outletId
        });

        const tokenString = generatePassword.generate({
            length: 6,
            numbers: true,
            symbols: false,
            uppercase: false,
            excludeSimilarCharacters: true
        });

        const newToken = await Token.create({
            token: tokenString,
            requestId: newRequest._id,
            requestDate: new Date(),
            status: "pending",
            expireDate: new Date(Date.now() + 86400000), // 1 day
            pickUpDate: new Date(Date.now() + 86400000),
        });

        // Update request with tokenId
        newRequest.tokenId = newToken._id;
        await newRequest.save();

        return res.status(201).json({success: true, message: "New token created", data: {token: newToken, request: newRequest}})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}