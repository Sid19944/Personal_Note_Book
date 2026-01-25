import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  updatePassword,
  getAllUserForAdmin,
  getSingleUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/update").put(verifyJwt, updateUser);
router.route("/update/password").put(verifyJwt, updatePassword);
router.route("/getSingleUser").get(verifyJwt, getSingleUser);

router.route("/admin/getalluser").get(verifyJwt, getAllUserForAdmin);
router.route("/update/role/:id").put(verifyJwt, updateUserRole);

export default router;
