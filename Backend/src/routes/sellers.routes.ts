import expres, { Router } from "express";
import {
  createNewSellerAccount,
  signinSeller,
  getAccountDetails,
  updateAccountDetails,
  deleteAccount
} from "../controllers/sellers/index.sellerController.ts";

const router: Router = expres.Router();

router.route("/").post(createNewSellerAccount);
router.route("/signin").post(signinSeller);
router.route("/:sellerId").get(getAccountDetails).patch(updateAccountDetails).delete(deleteAccount);

export default router;
