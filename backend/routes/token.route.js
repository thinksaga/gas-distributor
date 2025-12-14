import {Router} from "express";
import {verifyToken, requestToken} from "../controllers/token.controller.js";
import authorize from "../middleware/auth.middleware.js";

const tokenRoute = Router();

tokenRoute.post('/request', authorize, requestToken);
tokenRoute.get('/:id', authorize, verifyToken);

export default tokenRoute