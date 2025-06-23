import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { getUserData } from "../controllers/users.controller.js";

const router = Router();

router.route('/' , protect).get(getUserData);

export default router