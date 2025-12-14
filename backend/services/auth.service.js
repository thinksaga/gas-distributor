import Consumer from '../models/consumer.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';

class AuthService {
    // Generate JWT token
    generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE }
        );
    }

    // Register new user
    async register(userData) {
        const { firstname, lastname, username, email, password, contactNumber, streetLine1, streetLine2, city } = userData;

        // Check if user exists
        const existingUser = await Consumer.findOne({
            $or: [{ email }, { username }]
        }).lean();

        if (existingUser) {
            throw new AppError('User already exists', 409);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await Consumer.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            contactNumber,
            street: streetLine1 + (streetLine2 ? ' ' + streetLine2 : ''),
            city,
            role: 'user'
        });

        // Generate token
        const token = this.generateToken(newUser);

        // Return user without password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return { user: userResponse, token };
    }

    // Login user
    async login(username, password) {
        // Find user
        const user = await Consumer.findOne({ username }).select('+password');

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generate token
        const token = this.generateToken(user);

        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;

        return { user: userResponse, token };
    }

    // Verify token
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await Consumer.findById(decoded.id)
                .select('-password')
                .lean();

            if (!user) {
                throw new AppError('User not found', 404);
            }

            return user;
        } catch (error) {
            throw new AppError('Invalid token', 401);
        }
    }
}

export default new AuthService();
