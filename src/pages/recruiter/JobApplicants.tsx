import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/global/Navbar";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../../redux/applicationSlice";
import axiosInstance from "@/utils/axios";
import ApplicantsTable from "@/components/recruiter/ApplicantsTable";

const JobApplicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const applicants = useSelector((state: any) => state.application.applicants);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/application/${params.id}/applicants`, {
          withCredentials: true,
        });
        // console.log("response to fetchAll APplicants", res);

        dispatch(setAllApplicants(res.data.job));
        setJobTitle(res.data.job.title || "");
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Failed to fetch applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="bgMain-gradient">
          <Navbar />
        </div>
        <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/recruiter/dashboard")}
          />
          <h1 className="text-2xl font-bold text-black">
            Applicants for {jobTitle}
            <span className="ml-2 text-blue-800">( {applicants?.applications?.length} )</span>
          </h1>
        </div>

        <ApplicantsTable />
      </div>
    </div>
  );
};

export default JobApplicants; 