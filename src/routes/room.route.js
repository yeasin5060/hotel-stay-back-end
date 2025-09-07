import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middlewares.js";
import { createRoom, getOwnerRoom, getRoom, toggleRoomAvailability } from "../controllers/room.controller.js";

const router = Router()

router.route('/create').post(upload.array("images" , 4),protect , createRoom)
router.route('/get').get(getRoom);
router.route('/owner').get(protect , getOwnerRoom);
router.route('/togol-availability').post(protect , toggleRoomAvailability)
export default router