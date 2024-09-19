import expres, { Router } from "express";
import { newSellerHandler } from "../controllers/sellers.controllers.ts";

const router: Router = expres.Router();

router.route("/").post(newSellerHandler);

export default router;
