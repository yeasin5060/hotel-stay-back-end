import { Router } from "express";
import { checkAvailabilityAPI, createBooking, getHotelBooking, getUserBokkings } from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route('/check-availability').post(checkAvailabilityAPI);
router.route('/book').post(protect , createBooking);
router.route('/user').get(protect , getUserBokkings);
router.route('/hotel').get(protect , getHotelBooking);

export default router;