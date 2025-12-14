import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { promoteUser, getAllUsers, createOutlet, getAllOutlets, updateOutlet, deleteOutlet } from '../controllers/admin.controller.js';

const adminRoute = Router();

// POST /api/v1/admin/promote
adminRoute.post('/promote', authorize, promoteUser);

// GET /api/v1/admin/users
adminRoute.get('/users', authorize, getAllUsers);

// POST /api/v1/admin/outlets
adminRoute.post('/outlets', authorize, createOutlet);

// GET /api/v1/admin/outlets
adminRoute.get('/outlets', authorize, getAllOutlets);

// PUT /api/v1/admin/outlets/:id
adminRoute.put('/outlets/:id', authorize, updateOutlet);

// DELETE /api/v1/admin/outlets/:id
adminRoute.delete('/outlets/:id', authorize, deleteOutlet);

export default adminRoute;
