import Job from "../../models/job/jobSchema";

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
      companyId,
      experienceLevel,
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
      !companyId,
      !experienceLevel)
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
      company: companyId,
      experienceLevel: experience,
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
    const jobs = await job.find(query);
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
    const job = await job.findById(jobId);
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
