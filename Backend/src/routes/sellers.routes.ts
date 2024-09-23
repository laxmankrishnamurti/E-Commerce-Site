import expres, { Router } from "express";
import {
  createNewSellerAccount,
  signinSeller,
} from "../controllers/sellers/index.sellerController.ts";

const router: Router = expres.Router();

router.route("/").post(createNewSellerAccount);

router.route("/signin").post(signinSeller);

export default router;
