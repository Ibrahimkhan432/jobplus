import express from "express";
import isAuthenticated from "../../middleware/auth.js";
import { getAllJobs, getJobById, postJob } from "../../controllers/job/jobController.js";
const router = express.Router();
router.post("/postJob", isAuthenticated, postJob);
router.post("/get", isAuthenticated, getAllJobs);
router.post("/get/:id", isAuthenticated, getJobById);
router.post("/update/:id", isAuthenticated, updateCompany);

export default router;
