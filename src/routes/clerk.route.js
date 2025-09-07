import { Router } from "express";
import { clerkWebhook } from "../controllers/clerkWebhook.controller.js";

const router = Router()

router.route('/').get(clerkWebhook);


export default router