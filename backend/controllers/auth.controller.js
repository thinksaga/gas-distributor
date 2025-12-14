import Consumer from "../models/consumer.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {JWT_EXPIRE, JWT_SECRET} from "../config/env.js";
import Joi from 'joi';

// Validation schemas
const signUpSchema = Joi.object({
    formData: Joi.object({
        firstname: Joi.string().min(2).max(50).required(),
        lastname: Joi.string().min(2).max(50).required(),
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().allow(''),
        contactNumber: Joi.string().pattern(/^[0-9]{10,12}$/).required(),
        streetLine1: Joi.string().min(5).required(),
        streetLine2: Joi.string().allow(''),
        city: Joi.string().min(2).required()
    }).required()
});

const signInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const signUp = async (req, res) => {
    try {
        // Validate input
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {
            firstname,
            lastname,
            username,
            email,
            password,
            contactNumber,
            streetLine1,
            streetLine2,
            city
        } = req.body.formData;

    // Determine role - default to 'user'. For production, role assignment should be controlled server-side.
    const role = 'user';

        const existingUser = await Consumer.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(409).json({message: "User already exists"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await Consumer.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            contactNumber,
            street: streetLine1 + ' ' + streetLine2,
            city,
            role
        })

        const token = jwt.sign({
            email: newUser.email,
            id: newUser._id,
            username: username
        }, JWT_SECRET, {expiresIn: JWT_EXPIRE})

        res.status(201).json({success: true, message: "New user created", data: {user: newUser, token}})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const signIn = async (req, res) => {
    try {
        // Validate input
        const { error } = signInSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const {username, password} = req.body
        const user = await Consumer.findOne({username: username})

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: user.email, id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE})
        res.status(200).json({success: true, data: user, token: token})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}