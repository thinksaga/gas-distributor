import express from 'express';
import {PORT} from "./config/env.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";
import statusRoute from "./routes/status.route.js";
import tokenRoute from "./routes/token.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import connectToDatabase from "./database/mongodb.js";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import outletRoute from "./routes/outlet.route.js";
import adminRoute from "./routes/admin.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import organizationRoute from "./routes/organization.route.js";
import productRoute from "./routes/product.route.js";
import notificationRoute from "./routes/notification.route.js";
import deliveryRoute from "./routes/delivery.route.js";
import logger from './utils/logger.js';

const app = express();

// Security middlewares
app.use(helmet()); // Set security headers

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', { ip: req.ip, url: req.url });
        res.status(429).json({ message: 'Too many requests from this IP, please try again later.' });
    }
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next();
});

// '/api/v1/' Middleware
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/token', tokenRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/status', statusRoute)
app.use('/api/v1/outlet', outletRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/dashboard', dashboardRoute)
app.use('/api/v1/organization', organizationRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/notifications', notificationRoute)
app.use('/api/v1/delivery', deliveryRoute)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();
});
