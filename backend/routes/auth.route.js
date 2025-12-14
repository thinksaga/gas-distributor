import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';
import { authLimiter, signupLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply rate limiting to auth routes
router.post('/sign-in', authLimiter, signIn);
router.post('/sign-up', signupLimiter, signUp);

export default router;