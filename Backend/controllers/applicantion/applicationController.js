import Application from "../../models/application/applicationSchema.js";
import Job from "../../models/job/jobSchema.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    // if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (!existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job!",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "successfully applied for job",
      success: true,
    });
  } catch (error) {}
};

export const getAppliedJobs = async (req, res) => {
  const userId = jobId;
  const application = await Application.find({
    applicant: userId,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });
  if (!application) {
    return res.status(400).json({
      message: "Job not found",
      success: false,
    });
  }
};

// admin see all applications
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("error in get applicants", error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        succes: false,
      });
    }

    // find by id
    const application = await Application.findOne({
      _id: applicationId,
    });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        succes: false,
      });
    }
    // update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in update status", error);
  }
};
