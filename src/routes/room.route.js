import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { protect } from "../middlewares/auth.middlewares.js";
import { createRoom } from "../controllers/room.controller.js";

const router = Router()

router.route('/').post(upload.array("images" , 4) , protect , createRoom)

export default router