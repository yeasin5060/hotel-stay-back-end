import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { registerHotel } from "../controllers/hotel.controller.js";

const router = Router();

router.route('/').post(protect,registerHotel)

export default router