import expres, { Router } from "express";
import {
  createNewSellerAccount,
  signinSeller,
  getAccountDetails,
  updateAccountDetails,
  deleteAccount,
  handleLogout,
} from "../controllers/sellers/index.sellerController.ts";
import fileHandler from "../utils/fileHandler.utils.ts";
import authRequest from "../middlewares/authRequest.middleware.ts";

const router: Router = expres.Router();

router.route("/").post(fileHandler.single("panPhoto"), createNewSellerAccount);
router.route("/signin").post(signinSeller);
router
  .route("/:sellerId")
  .get(authRequest, getAccountDetails)
  .patch(authRequest, updateAccountDetails)
  .delete(authRequest, deleteAccount);

router.route("/:sellerId/logout").delete(authRequest, handleLogout);

export default router;
