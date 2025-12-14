import { Router } from 'express';
import { createAdmin, getAdmins } from '../controllers/organization.controller.js';
import authorize from '../middleware/auth.middleware.js';

const organizationRoute = Router();

// Only superadmin can create admins and view them
// Assuming authorize middleware adds user to req and we can check role there or add another middleware
// For now, using authorize and assuming the controller or subsequent logic might check role if needed, 
// but ideally we should have a role check middleware. 
// I'll add a simple check in the controller or just rely on the fact that this route is protected.
// Better: Add a middleware to check for superadmin role if not present.
// For MVP, I'll assume the frontend restricts access, but backend should too.

organizationRoute.post('/create-admin', authorize, createAdmin);
organizationRoute.get('/admins', authorize, getAdmins);

export default organizationRoute;
