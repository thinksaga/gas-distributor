import Consumer from "../models/consumer.model.js";
import bcrypt from 'bcryptjs';

export const createAdmin = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, contactNumber, street, city } = req.body;

        const existingUser = await Consumer.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Consumer({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            contactNumber,
            street,
            city,
            role: 'admin'
        });

        await newAdmin.save();

        res.status(201).json({ success: true, message: "Admin created successfully", data: newAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdmins = async (req, res) => {
    try {
        const admins = await Consumer.find({ role: 'admin' }).select('-password');
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
