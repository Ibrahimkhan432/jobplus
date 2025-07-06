import express from "express";
import isAuthenticated from "../../middleware/auth.js";
import {profileAndResumeUpload} from "../../middleware/multer.js"
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../../controllers/company/companyController.js";
const router = express.Router();
router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById);
router.put("/update/:id",profileAndResumeUpload, isAuthenticated, updateCompany);

export default router;
