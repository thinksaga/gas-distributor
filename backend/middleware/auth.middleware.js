import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import Consumer from "../models/consumer.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const consumer = await Consumer.findById(decoded.id);

        if (!consumer) {
            console.log("Consumer not found for token");
            return res.status(404).json({ message: "Consumer not found" });
        }
        req.user = consumer; // Changed from req.consumer to req.user to match controllers
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        res.status(401).json({ message: "Unauthorized", error: error });
    }
}

export default authorize;