import express from "express";
import isAuthenticated from "../../middleware/auth.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../../controllers/company/companyController.js";
const router = express.Router();
router.post("/register", isAuthenticated, registerCompany);
router.post("/get", isAuthenticated, getCompany);
router.post("/get/:id", isAuthenticated, getCompanyById);
router.post("/update/:id", isAuthenticated, updateCompany);

export default router;
