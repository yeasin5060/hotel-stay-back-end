import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { registerHotel } from "../controllers/hotel.controller.js";

const router = Router();

router.route('/' , protect).post(registerHotel)

export default router