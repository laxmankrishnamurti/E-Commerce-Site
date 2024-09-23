import expres, { Router } from "express";
import {
  createNewSellerAccount,
  signinSeller,
  getAccountDetails,
  updateAccountDetails,
  deleteAccount,
} from "../controllers/sellers/index.sellerController.ts";
import fileHandler from "../utils/fileHandler.utils.ts";

const router: Router = expres.Router();

router.route("/").post(fileHandler.single("panPhoto"), createNewSellerAccount);
router.route("/signin").post(signinSeller);
router
  .route("/:sellerId")
  .get(getAccountDetails)
  .patch(updateAccountDetails)
  .delete(deleteAccount);

export default router;
