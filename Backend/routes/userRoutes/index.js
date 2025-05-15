import express from "express"
import { login, logout, register, updateProfile } from "../../controllers/user/userController.js";
import  isAuthenticated  from "../../middleware/auth.js";
const router = express.Router();
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile/update/:id").post(isAuthenticated, updateProfile)


export default router;