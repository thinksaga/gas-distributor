import {Router} from "express";
import {getOutlets, updateStatus, getOutletStock, updateStock, getPendingRequests, validateToken, fulfillRequest} from "../controllers/outlet.controller.js";
import authorize from "../middleware/auth.middleware.js";

const outletRoute = Router();

outletRoute.get('/', authorize, getOutlets);
outletRoute.patch('/:id', authorize, updateStatus);
outletRoute.get('/stock', authorize, getOutletStock);
outletRoute.post('/stock', authorize, updateStock);
outletRoute.get('/requests', authorize, getPendingRequests);
outletRoute.post('/validate-token', authorize, validateToken);
outletRoute.post('/fulfill', authorize, fulfillRequest);

export default outletRoute