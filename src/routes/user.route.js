import { Router } from "express";
import { clerkWebhook } from "../controllers/users.controller.js";

const router = Router()

router.route('/register').get(clerkWebhook);

export default router