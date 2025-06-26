import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { getUserData, storeRecentSearchedCities } from "../controllers/users.controller.js";

const router = Router();

router.route('/').get(protect,getUserData);
router.route('./store-recent-search').post(storeRecentSearchedCities);

export default router