import {Router} from "express";
import {getUsers, getProfile, getUserRequests} from "../controllers/users.contoller.js";
import authorize from "../middleware/auth.middleware.js";

const usersRoute = Router();

usersRoute.get('/profile',authorize, getProfile);
usersRoute.get('/requests',authorize, getUserRequests);
usersRoute.get('/',authorize, getUsers);

export default usersRoute