import rateLimit from 'express-rate-limit';

// Rate limiter for authentication routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for general API routes
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiter for signup
export const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 signups per hour
    message: 'Too many accounts created from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
});
