import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "sonner";

function JobDescription() {

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();


  const { user } = useSelector((store: any) => store.auth);
  const { singleJob } = useSelector((store: any) => store.job);

  const applications = singleJob?.applications;
  const isInitiallyApplied =
    applications?.some(
      (application: any) =>
        (typeof application.applicant === "string"
          ? application.applicant
          : application.applicant?._id) === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = { ...singleJob, application: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success("applied successfully")
      }
    } catch (error: any) {
      console.log("error in apply job", error);
      toast.error(error.response?.data?.message || "Failed to apply for job");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          res.data.job.applications.some(
            (application: any) =>
              (typeof application.applicant === "string"
                ? application.applicant
                : application.applicant?._id) === user?._id
          )
        }
      } catch (error) {
        console.log("error in get single job", error);
      }
    };
    fetchSingleJob();
  }, [dispatch, jobId, user?._id]);

  return (
    <div className="my-10 max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Top Section: Role & Apply Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {singleJob?.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{singleJob?.location}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="text-white font-medium bg-blue-600">
              Experience: {singleJob?.experience}
            </Badge>
            <Badge className="text-white font-medium bg-purple-600">
              {singleJob?.salary}
            </Badge>
            <Badge className="text-white font-medium bg-green-600">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`mt-2 sm:mt-0 bgMain-gradient text-white cursor-pointer font-semibold px-6 ${isApplied ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Meta Info */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Total Applicants: </span>
          {singleJob?.applications?.length}
        </div>
        <div>
          <span className="font-medium">Posted Date:</span>{" "}
          {singleJob?.createdAt.split("T")[0]}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Description
        </h2>
        <hr className="mb-4 border-gray-300" />
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {singleJob?.description}
        </p>

        <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1 text-sm sm:text-base">
          <li>
            Collaborate with designers to translate Figma mockups into working
            UI
          </li>
          <li>
            Write clean, maintainable, and efficient code using React and
            TailwindCSS
          </li>
          <li>
            Ensure application responsiveness and performance across devices
          </li>
          <li>Participate in regular code reviews and agile team activities</li>
          <li>Good understanding of Git and deployment workflows</li>
        </ul>
      </div>
    </div>
  );
}

export default JobDescription;
