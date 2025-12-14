import { Router } from 'express';
import { getAdminStats, getSuperAdminStats, getUserStats } from '../controllers/dashboard.controller.js';
import authorize from '../middleware/auth.middleware.js';

const dashboardRoute = Router();

dashboardRoute.get('/admin-stats', authorize, getAdminStats);
dashboardRoute.get('/superadmin-stats', authorize, getSuperAdminStats);
dashboardRoute.get('/user-stats', authorize, getUserStats);

export default dashboardRoute;
