import Job from "../../models/job/jobSchema.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      requirement,
      position,
      jobType,
      company,
      experience,
    } = req.body;
    const userId = req.id;

    if (
      (!title,
        !description,
        !salary,
        !location,
        !requirement,
        !position,
        !jobType,
        !company,
        !experience)
    ) {
      res.status(404).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      salary,
      requirement: requirement.split(","),
      location,
      requirement,
      position,
      jobType,
      company,
      experience,
      created_by: userId,
    });
    return res.status(201).json({
      message: "job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log("error while creating jobpost", error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });
    if (!jobs) {
      res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("error in get all jobs", error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });
    if (!job) {
      return res.status(404).json({
        mssage: "job not found",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("error in gettingjob", error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1
    });
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(201).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("error in getting admin jobs", error);
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicantId, status } = req.body;

    if (!jobId || !applicantId || !status) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const application = job.applications.find(
      (app) => app._id.toString() === applicantId
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status;
    await job.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
