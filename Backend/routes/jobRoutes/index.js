import express from "express";
import isAuthenticated from "../../middleware/auth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateApplicationStatus } from "../../controllers/job/jobController.js";
const router = express.Router();
router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/getAdminJobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.put("/update-application-status", isAuthenticated, updateApplicationStatus);

export default router;
